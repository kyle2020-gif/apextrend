(function () {
  const DEFAULT_EXECUTION_CONFIG = {
    deploymentConfidence: 82,
    duration: 5,
    durationUnit: "m",
    basis: "stake",
    currencyFallback: "USD",
    contractType: "ONETOUCH",
    defaultBarrier: 0.6,
    barrierDivisor: 6,
  };

  const executionEvents = new EventTarget();

  function emitExecutionEvent(name, detail = {}) {
    executionEvents.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function addExecutionListener(name, callback) {
    executionEvents.addEventListener(name, callback);
  }

  function roundForBarrier(value) {
    return Number(value).toFixed(2).replace(/\.?0+$/, "");
  }

  class ExecutionManager {
    constructor(config = {}) {
      this.config = { ...DEFAULT_EXECUTION_CONFIG, ...config };
      this.brokerManager = this.config.brokerManager || null;
      this.derivRequest = this.config.derivRequest || null;
      this.activeExecution = null;
    }

    setBrokerManager(brokerManager) {
      this.brokerManager = brokerManager;
    }

    setDerivRequest(derivRequest) {
      // Compatibility fallback for older development tests. Live Phase 8C execution uses BrokerManager.
      this.derivRequest = derivRequest;
    }

    // Final preflight check before any proposal or buy request is allowed.
    prepareExecution(context) {
      const blockReason = this.getPreconditionBlockReason(context);
      if (blockReason) {
        const blocked = {
          ok: false,
          reason: blockReason,
        };
        emitExecutionEvent("blocked", blocked);
        return blocked;
      }

      const stake = Number(context.riskDecision.stake);
      const parameters = context.contractParameters || context.strategy.contractParameters || {};
      const barrier = parameters.barrier || this.calculateBarrier(context.strategy, context.currentPrice);

      this.activeExecution = {
        id: `execution-${Date.now()}`,
        status: "Ready",
        contractId: null,
        proposalId: null,
        proposal: null,
        purchaseTime: null,
        market: context.strategy.market,
        symbol: context.strategy.symbol,
        strategy: parameters.botName || context.strategy.botName || context.strategy.botType,
        strategyType: parameters.strategyType || context.strategy.strategyType || "",
        recommendation: context.strategy.recommendation,
        barrier,
        barrierDirection: parameters.barrierDirection || (String(barrier).startsWith("-") ? "lower" : "upper"),
        stake: Number(parameters.amount || stake),
        duration: parameters.duration || this.config.duration,
        durationUnit: parameters.durationUnit || this.config.durationUnit,
        currency: context.currency || this.config.currencyFallback,
        contractType: parameters.contractType || this.config.contractType,
        basis: parameters.basis || this.config.basis,
        timeRemaining: "-",
        profitLoss: 0,
        subscriptionId: null,
        isFinished: false,
      };

      emitExecutionEvent("prepared", { execution: this.getActiveExecution() });
      return {
        ok: true,
        execution: this.getActiveExecution(),
      };
    }

    // Requests a Deriv Touch proposal. This does not buy the contract.
    async requestProposal() {
      this.assertReadyForRequest();
      this.activeExecution.status = "Proposal Requested";
      emitExecutionEvent("proposalRequested", { execution: this.getActiveExecution() });

      const payload = {
        proposal: 1,
        amount: this.activeExecution.stake,
        basis: this.activeExecution.basis,
        contract_type: this.activeExecution.contractType,
        currency: this.activeExecution.currency,
        duration: this.activeExecution.duration,
        duration_unit: this.activeExecution.durationUnit,
        symbol: this.activeExecution.symbol,
        barrier: this.activeExecution.barrier,
      };

      try {
        const response = await this.getBrokerManager().requestProposal(payload);
        this.activeExecution.proposal = response.proposal;
        this.activeExecution.proposalId = response.proposal?.id || null;
        this.activeExecution.status = "Proposal Received";
        emitExecutionEvent("proposalReceived", {
          execution: this.getActiveExecution(),
          proposal: response.proposal,
        });
        return response.proposal;
      } catch (error) {
        this.activeExecution.status = "Proposal Rejected";
        this.activeExecution.isFinished = true;
        emitExecutionEvent("error", { message: `Proposal rejected: ${error.message}`, execution: this.getActiveExecution() });
        throw error;
      }
    }

    // Buys only after a proposal succeeds and the active account has passed demo checks.
    async buyContract() {
      this.assertReadyForRequest();
      if (!this.activeExecution.proposalId) {
        throw new Error("No proposal is available to buy.");
      }

      const price = Number(this.activeExecution.proposal?.ask_price || this.activeExecution.stake);

      try {
        emitExecutionEvent("buyRequested", { execution: this.getActiveExecution() });
        const response = await this.getBrokerManager().buyContract({
          proposalId: this.activeExecution.proposalId,
          price,
        });

        this.activeExecution.contractId = response.buy?.contract_id || null;
        this.activeExecution.purchaseTime = new Date();
        this.activeExecution.status = "Bought";
        emitExecutionEvent("contractPurchased", {
          execution: this.getActiveExecution(),
          buy: response.buy,
        });
        return response.buy;
      } catch (error) {
        this.activeExecution.status = "Buy Failed";
        this.activeExecution.isFinished = true;
        emitExecutionEvent("error", { message: `Buy failed: ${error.message}`, execution: this.getActiveExecution() });
        throw error;
      }
    }

    // Subscribes to open contract updates for the single active contract.
    async monitorContract() {
      this.assertReadyForRequest();
      if (!this.activeExecution.contractId) {
        throw new Error("No contract is available to monitor.");
      }

      try {
        const response = await this.getBrokerManager().monitorContract(this.activeExecution.contractId);

        this.activeExecution.subscriptionId = response.subscription?.id || this.activeExecution.subscriptionId;
        this.activeExecution.status = "Running";
        emitExecutionEvent("contractRunning", {
          execution: this.getActiveExecution(),
          contract: response.proposal_open_contract,
        });

        if (response.proposal_open_contract) {
          this.applyContractUpdate(response.proposal_open_contract, response.subscription?.id);
        }

        return response.proposal_open_contract;
      } catch (error) {
        this.activeExecution.status = "Subscription Failed";
        emitExecutionEvent("error", { message: `Contract subscription failed: ${error.message}`, execution: this.getActiveExecution() });
        throw error;
      }
    }

    cancelExecution(reason = "Execution cancelled.") {
      if (!this.activeExecution) {
        return null;
      }

      this.forgetContractSubscription();
      if (this.activeExecution.contractId && !this.activeExecution.isFinished) {
        this.activeExecution.status = "Monitoring Cancelled";
      } else {
        this.activeExecution.status = "Cancelled";
        this.activeExecution.isFinished = true;
      }
      emitExecutionEvent("cancelled", { reason, execution: this.getActiveExecution() });
      return this.getActiveExecution();
    }

    finishExecution(result = {}) {
      if (!this.activeExecution) {
        return null;
      }

      this.forgetContractSubscription();
      this.activeExecution.status = result.status || this.activeExecution.status || "Settled";
      this.activeExecution.profitLoss = Number(result.profitLoss || this.activeExecution.profitLoss || 0);
      this.activeExecution.timeRemaining = "0s";
      this.activeExecution.isFinished = true;
      emitExecutionEvent("finished", {
        outcome: result.outcome || this.activeExecution.status,
        execution: this.getActiveExecution(),
      });
      return this.getActiveExecution();
    }

    applyContractUpdate(contract, subscriptionId) {
      if (!this.activeExecution || Number(contract.contract_id) !== Number(this.activeExecution.contractId)) {
        return;
      }

      this.activeExecution.subscriptionId = subscriptionId || this.activeExecution.subscriptionId;
      this.activeExecution.profitLoss = Number(contract.profit || contract.profit_loss || 0);
      this.activeExecution.timeRemaining = this.getTimeRemaining(contract);

      if (Number(contract.is_sold) === 1) {
        const outcome = Number(this.activeExecution.profitLoss) >= 0 ? "Won" : "Lost";
        this.finishExecution({
          status: outcome,
          outcome,
          profitLoss: this.activeExecution.profitLoss,
        });
        return;
      }

      this.activeExecution.status = contract.status === "open" ? "Running" : (contract.status || "Running");
      emitExecutionEvent("contractUpdate", {
        execution: this.getActiveExecution(),
        contract,
      });
    }

    runDemoSimulation(kind) {
      if (kind === "proposal-failure") {
        emitExecutionEvent("error", { message: "Proposal rejected: simulated proposal failure.", execution: this.getActiveExecution() });
        return null;
      }

      if (!this.activeExecution) {
        this.activeExecution = {
          id: `simulation-${Date.now()}`,
          status: "Ready",
          contractId: null,
          proposalId: null,
          purchaseTime: null,
          market: "Volatility 100",
          symbol: "R_100",
          strategy: "Uptrend Touch Bot",
          recommendation: "DEPLOY UPTREND",
          barrier: "+0.1",
          stake: 3,
          duration: this.config.duration,
          durationUnit: this.config.durationUnit,
          currency: this.config.currencyFallback,
          timeRemaining: "5m",
          profitLoss: 0,
          subscriptionId: null,
          isFinished: false,
        };
      }

      if (kind === "proposal-success") {
        this.activeExecution.status = "Proposal Received";
        this.activeExecution.proposalId = `sim-proposal-${Date.now()}`;
        emitExecutionEvent("proposalReceived", { execution: this.getActiveExecution(), proposal: { id: this.activeExecution.proposalId } });
        return this.getActiveExecution();
      }

      if (kind === "timeout") {
        this.activeExecution.status = "Running";
        this.activeExecution.timeRemaining = "0s";
        emitExecutionEvent("contractUpdate", { execution: this.getActiveExecution(), contract: { status: "open" } });
        return this.getActiveExecution();
      }

      const isWin = kind === "win";
      this.activeExecution.contractId = this.activeExecution.contractId || Math.floor(Date.now() / 1000);
      this.activeExecution.purchaseTime = this.activeExecution.purchaseTime || new Date();
      return this.finishExecution({
        status: isWin ? "Won" : "Lost",
        outcome: isWin ? "Won" : "Lost",
        profitLoss: isWin ? this.activeExecution.stake * 0.85 : -this.activeExecution.stake,
      });
    }

    getPreconditionBlockReason(context) {
      if (this.activeExecution && !this.activeExecution.isFinished) {
        return "Execution blocked: another execution is already in progress.";
      }
      if (this.hasOpenContract()) {
        return "Execution blocked: an open contract is already running.";
      }
      if (!context.accountConnected) {
        return "Execution blocked: Deriv account is not connected.";
      }
      if (String(context.accountType || "").toLowerCase() !== "demo") {
        return "Execution blocked: real account execution is disabled.";
      }
      if (!context.latestAnalysis || !context.latestAnalysis.ready || context.latestAnalysis.confidence < this.config.deploymentConfidence) {
        return "Execution blocked: scanner confidence is no longer valid.";
      }
      if (!context.strategy || !["Armed", "Monitoring", "READY FOR EXECUTION"].includes(context.strategy.status)) {
        return "Execution blocked: strategy is not armed.";
      }
      if (!context.riskDecision || context.riskDecision.result !== "ALLOW") {
        return `Execution blocked: ${context.riskDecision?.reason || "risk manager did not allow execution."}`;
      }
      if (!Number(context.currentPrice)) {
        return "Execution blocked: latest market price is not available.";
      }
      return "";
    }

    calculateBarrier(strategy, currentPrice) {
      const movement = Number(this.config.defaultBarrier) / Number(this.config.barrierDivisor);
      const sign = strategy.recommendation === "DEPLOY DOWNTREND" ? "-" : "+";
      const absoluteBarrier = Math.max(movement, Number(currentPrice || 0) * 0);
      return `${sign}${roundForBarrier(absoluteBarrier)}`;
    }

    getTimeRemaining(contract) {
      const expiry = Number(contract.date_expiry || contract.expiry_time || 0);
      if (!expiry) {
        return "-";
      }
      const seconds = Math.max(0, expiry - Math.floor(Date.now() / 1000));
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      return minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`;
    }

    hasOpenContract() {
      return Boolean(this.activeExecution && !this.activeExecution.isFinished && this.activeExecution.contractId);
    }

    assertReadyForRequest() {
      if (!this.brokerManager && !this.derivRequest) {
        throw new Error("Broker execution gateway is not configured.");
      }
      if (!this.activeExecution || this.activeExecution.isFinished) {
        throw new Error("No prepared execution is available.");
      }
    }

    getBrokerManager() {
      if (this.brokerManager) {
        return this.brokerManager;
      }

      if (this.derivRequest) {
        return {
          requestProposal: (payload) => this.derivRequest(payload),
          buyContract: (params) => this.derivRequest({
            buy: params.proposalId || params.buy,
            price: params.price,
          }),
          monitorContract: (contractId) => this.derivRequest({
            proposal_open_contract: 1,
            contract_id: contractId,
            subscribe: 1,
          }),
        };
      }

      throw new Error("Broker execution gateway is not configured.");
    }

    forgetContractSubscription() {
      if (this.activeExecution?.subscriptionId && this.derivRequest) {
        this.derivRequest({ forget: this.activeExecution.subscriptionId }).catch(() => {});
      }
    }

    getActiveExecution() {
      return this.activeExecution ? { ...this.activeExecution } : null;
    }
  }

  window.ApexExecution = {
    DEFAULT_EXECUTION_CONFIG,
    ExecutionManager,
    addExecutionListener,
  };
}());
