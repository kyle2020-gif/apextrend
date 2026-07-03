(function () {
  const DEFAULT_RISK_SETTINGS = {
    riskPerTradePercent: 3,
    minRiskPercent: 1,
    maxRiskPercent: 6,
    dailyProfitTarget: 25,
    dailyLossLimit: 10,
    maxConsecutiveLosses: 3,
    maxTradesPerDay: 5,
    maxOpenTrades: 1,
    executionMode: "demo",
  };

  class RiskManager {
    constructor(settings = DEFAULT_RISK_SETTINGS) {
      this.settings = { ...DEFAULT_RISK_SETTINGS, ...settings };
      this.state = {
        tradesToday: 0,
        consecutiveLosses: 0,
        dailyProfitLoss: 0,
        openTrades: 0,
      };
    }

    updateSettings(settings) {
      this.settings = {
        ...this.settings,
        ...settings,
      };
      this.settings.riskPerTradePercent = this.clampRiskPercent(this.settings.riskPerTradePercent);
      this.settings.maxOpenTrades = Math.max(1, Number(this.settings.maxOpenTrades) || DEFAULT_RISK_SETTINGS.maxOpenTrades);
      this.settings.maxTradesPerDay = Math.max(1, Number(this.settings.maxTradesPerDay) || DEFAULT_RISK_SETTINGS.maxTradesPerDay);
      this.settings.maxConsecutiveLosses = Math.max(1, Number(this.settings.maxConsecutiveLosses) || DEFAULT_RISK_SETTINGS.maxConsecutiveLosses);
      return this.getSettings();
    }

    updateState(state) {
      this.state = {
        ...this.state,
        ...state,
      };
      return this.getState();
    }

    getSettings() {
      return { ...this.settings };
    }

    getState() {
      return { ...this.state };
    }

    clampRiskPercent(percent) {
      const value = Number(percent) || DEFAULT_RISK_SETTINGS.riskPerTradePercent;
      return Math.min(this.settings.maxRiskPercent, Math.max(this.settings.minRiskPercent, value));
    }

    calculateStake(balance) {
      const numericBalance = Number(balance) || 0;
      const riskPercent = this.clampRiskPercent(this.settings.riskPerTradePercent);
      return Number(((numericBalance * riskPercent) / 100).toFixed(2));
    }

    getRiskStatus(balance = 0) {
      const checklist = this.runProtectionChecks({
        balance,
        accountConnected: true,
        scannerSignalValid: true,
        strategyArmed: true,
        accountType: "Demo",
      });

      if (checklist.result === "BLOCK") {
        return "Blocked";
      }
      if (this.state.dailyProfitLoss < 0 || this.state.consecutiveLosses > 0 || this.state.tradesToday > 0) {
        return "Warning";
      }
      return "Safe";
    }

    preExecutionCheck(context) {
      const checks = [
        [context.accountConnected, "Deriv account is not connected."],
        [context.scannerSignalValid, "Scanner signal is no longer valid."],
        [context.strategyArmed, "Strategy is not armed."],
      ];

      for (const [condition, reason] of checks) {
        if (!condition) {
          return this.block(reason);
        }
      }

      return this.runProtectionChecks(context);
    }

    runProtectionChecks(context) {
      const balance = Number(context.balance) || 0;
      const riskPercent = Number(this.settings.riskPerTradePercent);
      const accountType = String(context.accountType || "").toLowerCase();

      if (riskPercent < this.settings.minRiskPercent || riskPercent > this.settings.maxRiskPercent) {
        return this.block(`Stake risk must stay between ${this.settings.minRiskPercent}% and ${this.settings.maxRiskPercent}%.`);
      }

      if (balance <= 0) {
        return this.block("Account balance is not available.");
      }

      if (Math.abs(Math.min(0, this.state.dailyProfitLoss)) >= Number(this.settings.dailyLossLimit)) {
        return this.block("Daily loss limit reached.");
      }

      if (this.state.consecutiveLosses >= Number(this.settings.maxConsecutiveLosses)) {
        return this.block("Consecutive loss limit reached.");
      }

      if (this.state.tradesToday >= Number(this.settings.maxTradesPerDay)) {
        return this.block("Maximum trades per day reached.");
      }

      if (this.state.openTrades >= Number(this.settings.maxOpenTrades)) {
        return this.block("Maximum open trades exceeded.");
      }

      if (this.settings.executionMode === "demo" && accountType === "real") {
        return this.block("Real trading is disabled in this version.");
      }

      return {
        result: "ALLOW",
        reason: "Risk checks passed.",
        stake: this.calculateStake(balance),
      };
    }

    block(reason) {
      return {
        result: "BLOCK",
        reason,
        stake: 0,
      };
    }
  }

  window.ApexRisk = {
    DEFAULT_RISK_SETTINGS,
    RiskManager,
  };
}());
