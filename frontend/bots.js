(function () {
  const DEFAULT_BOT_CONFIG = {
    deploymentConfidence: 82,
    strongTrendMin: 68,
    strongMomentumMin: 64,
    allowedTrendAges: ["Established", "Mature"],
    duration: 5,
    durationUnit: "m",
    contractType: "ONETOUCH",
    defaultBarrier: 0.6,
    barrierDivisor: 6,
    basis: "stake",
    consolidationBounceMomentumMin: 54,
    consolidationTrendMax: 36,
  };

  function roundForBarrier(value) {
    return Number(value).toFixed(2).replace(/\.?0+$/, "");
  }

  function getBarrierDistance(config) {
    const distance = Number(config.defaultBarrier) / Number(config.barrierDivisor);
    return roundForBarrier(Math.max(distance, 0.01));
  }

  function buildContractParameters(bot, marketData, riskState, config, barrierSign) {
    return {
      contractType: config.contractType,
      basis: config.basis,
      amount: Number(riskState.stake || 0),
      currency: marketData.currency || "USD",
      duration: config.duration,
      durationUnit: config.durationUnit,
      symbol: marketData.symbol,
      barrier: `${barrierSign}${getBarrierDistance(config)}`,
      barrierDirection: barrierSign === "-" ? "lower" : "upper",
      botName: bot.name,
      strategyType: bot.strategyType,
    };
  }

  class BaseTouchBot {
    constructor(config = {}) {
      this.config = { ...DEFAULT_BOT_CONFIG, ...config };
    }

    getFailure(reason) {
      return {
        approved: false,
        reason,
      };
    }

    getApproval(reason = "Bot approved setup.") {
      return {
        approved: true,
        reason,
      };
    }
  }

  class UptrendTouchBot extends BaseTouchBot {
    constructor(config = {}) {
      super(config);
      this.name = "Uptrend Touch Bot";
      this.strategyType = "UPTREND_TOUCH";
    }

    confirmSetup(marketData, scannerSignal, config = this.config) {
      if (!scannerSignal || scannerSignal.recommendation !== "DEPLOY UPTREND") {
        return this.getFailure("Uptrend bot requires a deploy uptrend signal.");
      }
      if (scannerSignal.state !== "Strong Uptrend" || scannerSignal.trendDirection !== "up") {
        return this.getFailure("Uptrend bot requires a strong uptrend.");
      }
      if (!config.allowedTrendAges.includes(scannerSignal.trendAge)) {
        return this.getFailure("Uptrend bot requires an established or mature trend.");
      }
      if (scannerSignal.trendStrength < config.strongTrendMin || scannerSignal.momentumStrength < config.strongMomentumMin) {
        return this.getFailure("Uptrend bot rejected weak trend or momentum.");
      }
      if (scannerSignal.dummyImpulseRisk !== "LOW") {
        return this.getFailure("Uptrend bot rejected dummy impulse risk.");
      }
      if (scannerSignal.extremePointRisk === "HIGH") {
        return this.getFailure("Uptrend bot rejected overextended recent highs.");
      }
      if (scannerSignal.confidence < config.deploymentConfidence) {
        return this.getFailure("Uptrend bot rejected low confidence.");
      }
      return this.getApproval();
    }

    getContractParameters(marketData, scannerSignal, riskState, config = this.config) {
      return buildContractParameters(this, marketData, riskState, config, "+");
    }
  }

  class DowntrendTouchBot extends BaseTouchBot {
    constructor(config = {}) {
      super(config);
      this.name = "Downtrend Touch Bot";
      this.strategyType = "DOWNTREND_TOUCH";
    }

    confirmSetup(marketData, scannerSignal, config = this.config) {
      if (!scannerSignal || scannerSignal.recommendation !== "DEPLOY DOWNTREND") {
        return this.getFailure("Downtrend bot requires a deploy downtrend signal.");
      }
      if (scannerSignal.state !== "Strong Downtrend" || scannerSignal.trendDirection !== "down") {
        return this.getFailure("Downtrend bot requires a strong downtrend.");
      }
      if (!config.allowedTrendAges.includes(scannerSignal.trendAge)) {
        return this.getFailure("Downtrend bot requires an established or mature trend.");
      }
      if (scannerSignal.trendStrength < config.strongTrendMin || scannerSignal.momentumStrength < config.strongMomentumMin) {
        return this.getFailure("Downtrend bot rejected weak trend or momentum.");
      }
      if (scannerSignal.dummyImpulseRisk !== "LOW") {
        return this.getFailure("Downtrend bot rejected dummy impulse risk.");
      }
      if (scannerSignal.extremePointRisk === "HIGH") {
        return this.getFailure("Downtrend bot rejected overextended recent lows.");
      }
      if (scannerSignal.confidence < config.deploymentConfidence) {
        return this.getFailure("Downtrend bot rejected low confidence.");
      }
      return this.getApproval();
    }

    getContractParameters(marketData, scannerSignal, riskState, config = this.config) {
      return buildContractParameters(this, marketData, riskState, config, "-");
    }
  }

  class ConsolidationBounceBot extends BaseTouchBot {
    constructor(config = {}) {
      super(config);
      this.name = "Consolidation Bounce Bot";
      this.strategyType = "CONSOLIDATION_BOUNCE";
    }

    confirmSetup(marketData, scannerSignal, config = this.config) {
      if (!scannerSignal || scannerSignal.state !== "Consolidation") {
        return this.getFailure("Consolidation bot requires a consolidation setup.");
      }
      if (!["up", "down"].includes(scannerSignal.bounceDirection || scannerSignal.trendDirection)) {
        return this.getFailure("Consolidation bot requires a clear bounce direction.");
      }
      if (scannerSignal.trendStrength > config.consolidationTrendMax) {
        return this.getFailure("Consolidation bot rejected active trend conditions.");
      }
      if (scannerSignal.momentumStrength < config.consolidationBounceMomentumMin) {
        return this.getFailure("Consolidation bot rejected weak bounce momentum.");
      }
      if (scannerSignal.dummyImpulseRisk === "HIGH") {
        return this.getFailure("Consolidation bot rejected dummy impulse risk.");
      }
      return this.getApproval("Consolidation bounce confirmed.");
    }

    getContractParameters(marketData, scannerSignal, riskState, config = this.config) {
      const direction = scannerSignal.bounceDirection || scannerSignal.trendDirection;
      return buildContractParameters(this, marketData, riskState, config, direction === "down" ? "-" : "+");
    }
  }

  const registry = {
    "DEPLOY UPTREND": UptrendTouchBot,
    "DEPLOY DOWNTREND": DowntrendTouchBot,
    CONSOLIDATION_BOUNCE: ConsolidationBounceBot,
  };

  function createBotForSignal(signal, config = {}) {
    const key = signal?.botKey || signal?.recommendation;
    const BotClass = registry[key];
    return BotClass ? new BotClass(config) : null;
  }

  window.ApexBots = {
    DEFAULT_BOT_CONFIG,
    UptrendTouchBot,
    DowntrendTouchBot,
    ConsolidationBounceBot,
    createBotForSignal,
  };
}());
