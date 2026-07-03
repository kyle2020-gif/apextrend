(function () {
  const DEFAULT_DEPLOYMENT_CONFIG = {
    deploymentConfidence: 82,
    allowedRecommendations: ["DEPLOY UPTREND", "DEPLOY DOWNTREND"],
  };

  class DeploymentManager {
    constructor(config = DEFAULT_DEPLOYMENT_CONFIG) {
      this.config = { ...DEFAULT_DEPLOYMENT_CONFIG, ...config };
      this.activeStrategy = null;
    }

    armStrategy(signal) {
      if (!this.config.allowedRecommendations.includes(signal.recommendation) && signal.botKey !== "CONSOLIDATION_BOUNCE") {
        throw new Error("Only deploy recommendations can be armed.");
      }

      const bot = window.ApexBots?.createBotForSignal(signal, this.config);
      if (!bot) {
        throw new Error("No bot is available for this signal.");
      }

      this.activeStrategy = {
        id: `${signal.symbol}-${Date.now()}`,
        market: signal.market,
        symbol: signal.symbol,
        botType: bot.name,
        botName: bot.name,
        strategyType: bot.strategyType,
        botKey: signal.botKey || signal.recommendation,
        direction: this.getDirection(signal),
        botVerificationStatus: "Pending",
        barrierDirection: "-",
        duration: window.ApexBots?.DEFAULT_BOT_CONFIG?.duration || 5,
        stake: 0,
        status: "Armed",
        recommendation: signal.recommendation,
        confidence: signal.confidence,
        trendStrength: signal.trendStrength,
        momentumStrength: signal.momentumStrength,
        armedAt: new Date(),
        stoppedAt: null,
        stopReason: "",
      };

      return this.activeStrategy;
    }

    verifyBotSetup(latestAnalysis, marketData = {}, riskDecision = {}) {
      if (!this.activeStrategy) {
        return {
          ok: false,
          reason: "No active strategy is armed.",
        };
      }

      const bot = window.ApexBots?.createBotForSignal(this.activeStrategy, this.config);
      if (!bot) {
        this.activeStrategy.botVerificationStatus = "Rejected";
        return {
          ok: false,
          reason: "Bot rejected setup: conditions no longer valid.",
        };
      }

      const confirmation = bot.confirmSetup(marketData, latestAnalysis);
      this.activeStrategy.botVerificationStatus = confirmation.approved ? "Approved" : "Rejected";

      if (!confirmation.approved) {
        this.activeStrategy.status = "Cancelled";
        this.activeStrategy.stopReason = "Bot rejected setup: conditions no longer valid.";
        return {
          ok: false,
          reason: "Bot rejected setup: conditions no longer valid.",
          detail: confirmation.reason,
        };
      }

      const parameters = bot.getContractParameters(marketData, latestAnalysis, riskDecision);
      this.activeStrategy.contractParameters = parameters;
      this.activeStrategy.barrierDirection = parameters.barrierDirection;
      this.activeStrategy.duration = parameters.duration;
      this.activeStrategy.stake = parameters.amount;

      return {
        ok: true,
        bot,
        strategy: this.activeStrategy,
        parameters,
        detail: confirmation.reason,
      };
    }

    validateBeforeExecution(latestAnalysis) {
      if (!this.activeStrategy) {
        return {
          ok: false,
          reason: "No active strategy is armed.",
        };
      }

      if (!latestAnalysis || !latestAnalysis.ready) {
        return {
          ok: false,
          reason: "Deployment cancelled: setup no longer valid.",
        };
      }

      const sameDirection = latestAnalysis.recommendation === this.activeStrategy.recommendation;
      const confidenceValid = latestAnalysis.confidence >= this.config.deploymentConfidence;
      const stillDeployable = sameDirection && confidenceValid;

      if (!stillDeployable) {
        this.activeStrategy.status = "Cancelled";
        this.activeStrategy.stopReason = "Deployment cancelled: setup no longer valid.";
        return {
          ok: false,
          reason: "Deployment cancelled: setup no longer valid.",
        };
      }

      this.activeStrategy.status = "Monitoring";
      this.activeStrategy.confidence = latestAnalysis.confidence;
      this.activeStrategy.trendStrength = latestAnalysis.trendStrength;
      this.activeStrategy.momentumStrength = latestAnalysis.momentumStrength;

      return {
        ok: true,
        strategy: this.activeStrategy,
      };
    }

    validateRiskBeforeExecution(riskManager, context) {
      if (!this.activeStrategy) {
        return {
          ok: false,
          reason: "No active strategy is armed.",
        };
      }

      const riskDecision = riskManager.preExecutionCheck({
        ...context,
        strategyArmed: ["Armed", "Monitoring", "READY FOR EXECUTION"].includes(this.activeStrategy.status),
      });

      if (riskDecision.result === "BLOCK") {
        this.activeStrategy.status = "Cancelled";
        this.activeStrategy.stopReason = riskDecision.reason;
        return {
          ok: false,
          reason: riskDecision.reason,
          decision: riskDecision,
        };
      }

      this.activeStrategy.status = "READY FOR EXECUTION";
      return {
        ok: true,
        strategy: this.activeStrategy,
        decision: riskDecision,
      };
    }

    stopStrategy(reason = "Stopped manually.") {
      if (!this.activeStrategy) {
        return null;
      }

      this.activeStrategy.status = "Stopped";
      this.activeStrategy.stopReason = reason;
      this.activeStrategy.stoppedAt = new Date();
      return this.activeStrategy;
    }

    getActiveStrategy() {
      return this.activeStrategy;
    }

    getBotType(recommendation) {
      if (recommendation === "DEPLOY UPTREND") {
        return "Uptrend Touch Bot";
      }
      if (recommendation === "DEPLOY DOWNTREND") {
        return "Downtrend Touch Bot";
      }
      if (recommendation === "CONSOLIDATION BOUNCE") {
        return "Consolidation Bounce Bot";
      }
      return "Touch Bot";
    }

    getDirection(signal) {
      if (signal.botKey === "CONSOLIDATION_BOUNCE") {
        return signal.bounceDirection === "down" ? "Bounce Down" : "Bounce Up";
      }
      if (signal.recommendation === "DEPLOY DOWNTREND" || signal.bounceDirection === "down") {
        return "Downtrend";
      }
      return "Uptrend";
    }

    // Deployment remains separate from Deriv execution. The ExecutionManager
    // owns demo proposal and buy requests.
    executeTradePlaceholder() {
      return {
        ok: false,
        reason: "Trade execution is disabled in this phase.",
      };
    }
  }

  window.ApexDeployment = {
    DEFAULT_DEPLOYMENT_CONFIG,
    DeploymentManager,
  };
}());
