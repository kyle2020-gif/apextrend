(function () {
  const DEFAULT_SCANNER_CONFIG = {
    historyLimit: 140,
    minSamples: 35,
    shortWindow: 8,
    mediumWindow: 21,
    longWindow: 55,
    trendStrengthScale: 180,
    momentumStrengthScale: 140,
    matureTrendMinSamples: 44,
    establishedTrendMinSamples: 28,
    developingTrendMinSamples: 14,
    highConfidence: 82,
    watchConfidence: 70,
    stopConfidence: 76,
    weakMomentumMax: 42,
    strongTrendMin: 68,
    strongMomentumMin: 64,
    consolidationTrendMax: 28,
    consolidationMomentumMax: 35,
    impulseSpikeRatio: 2.35,
    impulseFollowThroughMin: 0.28,
    extremeNearEdgeRatio: 0.12,
    lateEntryTrendAge: "Mature",
    eventCooldownMs: 90000,
  };

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function average(values) {
    if (!values.length) {
      return 0;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function priceChanges(prices) {
    const changes = [];
    for (let index = 1; index < prices.length; index += 1) {
      changes.push(prices[index] - prices[index - 1]);
    }
    return changes;
  }

  function directionFromValue(value) {
    if (value > 0) {
      return "up";
    }
    if (value < 0) {
      return "down";
    }
    return "flat";
  }

  class TrendAnalyzer {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = config;
    }

    analyze(ticks) {
      const prices = ticks.map((tick) => tick.price);
      const longPrices = prices.slice(-this.config.longWindow);
      const netMove = longPrices[longPrices.length - 1] - longPrices[0];
      const changes = priceChanges(longPrices);
      const averageMove = average(changes.map(Math.abs)) || 1;
      const directionalEfficiency = Math.abs(netMove) / (changes.reduce((sum, change) => sum + Math.abs(change), 0) || 1);
      const normalizedMove = Math.abs(netMove) / averageMove;
      const trendStrength = clamp((normalizedMove * this.config.trendStrengthScale * directionalEfficiency) / longPrices.length);
      const direction = directionFromValue(netMove);
      const trendAge = this.getTrendAge(changes, direction);

      return {
        direction,
        trendAge,
        trendStrength: Math.round(trendStrength),
      };
    }

    getTrendAge(changes, direction) {
      if (direction === "flat") {
        return "New";
      }

      let alignedMoves = 0;
      for (let index = changes.length - 1; index >= 0; index -= 1) {
        if (directionFromValue(changes[index]) !== direction) {
          break;
        }
        alignedMoves += 1;
      }

      if (alignedMoves >= this.config.matureTrendMinSamples) {
        return "Mature";
      }
      if (alignedMoves >= this.config.establishedTrendMinSamples) {
        return "Established";
      }
      if (alignedMoves >= this.config.developingTrendMinSamples) {
        return "Developing";
      }
      return "New";
    }
  }

  class MomentumAnalyzer {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = config;
    }

    analyze(ticks, trendDirection) {
      const prices = ticks.map((tick) => tick.price);
      const shortPrices = prices.slice(-this.config.shortWindow);
      const mediumPrices = prices.slice(-this.config.mediumWindow);
      const shortMove = shortPrices[shortPrices.length - 1] - shortPrices[0];
      const mediumChanges = priceChanges(mediumPrices);
      const averageMove = average(mediumChanges.map(Math.abs)) || 1;
      const directionMultiplier = trendDirection === "down" ? -1 : 1;
      const alignedMove = shortMove * directionMultiplier;
      const rawMomentum = (alignedMove / averageMove) * this.config.momentumStrengthScale;
      const momentumStrength = clamp(rawMomentum);

      return {
        momentumDirection: directionFromValue(shortMove),
        momentumStrength: Math.round(momentumStrength),
      };
    }
  }

  class RiskAnalyzer {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = config;
    }

    analyze(ticks, trendDirection) {
      const prices = ticks.map((tick) => tick.price);
      return {
        dummyImpulseRisk: this.getDummyImpulseRisk(prices, trendDirection),
        extremePointRisk: this.getExtremePointRisk(prices, trendDirection),
      };
    }

    getDummyImpulseRisk(prices, trendDirection) {
      const changes = priceChanges(prices.slice(-this.config.mediumWindow));
      const latestMove = Math.abs(changes[changes.length - 1] || 0);
      const priorMoves = changes.slice(0, -1).map(Math.abs);
      const averagePriorMove = average(priorMoves) || 1;
      const latestDirection = directionFromValue(changes[changes.length - 1] || 0);
      const followsTrend = latestDirection === trendDirection;
      const followThrough = Math.abs(average(changes.slice(-4, -1))) / averagePriorMove;

      if (latestMove > averagePriorMove * this.config.impulseSpikeRatio && (!followsTrend || followThrough < this.config.impulseFollowThroughMin)) {
        return "HIGH";
      }
      if (latestMove > averagePriorMove * (this.config.impulseSpikeRatio * 0.72)) {
        return "MEDIUM";
      }
      return "LOW";
    }

    getExtremePointRisk(prices, trendDirection) {
      const longPrices = prices.slice(-this.config.longWindow);
      const latestPrice = longPrices[longPrices.length - 1];
      const high = Math.max(...longPrices);
      const low = Math.min(...longPrices);
      const range = high - low || 1;
      const position = (latestPrice - low) / range;

      if (trendDirection === "up" && position > 1 - this.config.extremeNearEdgeRatio) {
        return "HIGH";
      }
      if (trendDirection === "down" && position < this.config.extremeNearEdgeRatio) {
        return "HIGH";
      }
      if (position > 0.82 || position < 0.18) {
        return "MEDIUM";
      }
      return "LOW";
    }
  }

  class ConfidenceEngine {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = config;
    }

    score(analysis) {
      const trendAgeBonus = {
        New: -18,
        Developing: 6,
        Established: 14,
        Mature: 18,
      }[analysis.trendAge];

      const dummyRiskPenalty = {
        LOW: 0,
        MEDIUM: 14,
        HIGH: 32,
      }[analysis.dummyImpulseRisk];

      const extremeRiskPenalty = {
        LOW: 0,
        MEDIUM: 12,
        HIGH: 28,
      }[analysis.extremePointRisk];

      const baseScore = (analysis.trendStrength * 0.44) + (analysis.momentumStrength * 0.46) + trendAgeBonus;
      return Math.round(clamp(baseScore - dummyRiskPenalty - extremeRiskPenalty));
    }
  }

  class SignalEngine {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = config;
    }

    classify(analysis) {
      if (
        analysis.trendStrength <= this.config.consolidationTrendMax &&
        analysis.momentumStrength <= this.config.consolidationMomentumMax
      ) {
        return "Consolidation";
      }

      if (analysis.momentumStrength <= this.config.weakMomentumMax || analysis.trendStrength < this.config.strongTrendMin) {
        return "Weak Trend";
      }

      if (analysis.trendDirection === "up") {
        return "Strong Uptrend";
      }
      if (analysis.trendDirection === "down") {
        return "Strong Downtrend";
      }
      return "No Trade";
    }

    recommend(analysis) {
      if (
        analysis.confidence >= this.config.stopConfidence &&
        (analysis.dummyImpulseRisk === "HIGH" || analysis.extremePointRisk === "HIGH")
      ) {
        return "STOP";
      }

      if (analysis.confidence >= this.config.highConfidence && analysis.state === "Strong Uptrend") {
        return "DEPLOY UPTREND";
      }

      if (analysis.confidence >= this.config.highConfidence && analysis.state === "Strong Downtrend") {
        return "DEPLOY DOWNTREND";
      }

      if (analysis.confidence >= this.config.watchConfidence && analysis.state !== "No Trade") {
        return "WATCH";
      }

      return "WAIT";
    }

    shouldAlert(analysis) {
      return ["DEPLOY UPTREND", "DEPLOY DOWNTREND", "WATCH", "STOP"].includes(analysis.recommendation);
    }
  }

  class ScannerEngine {
    constructor(config = DEFAULT_SCANNER_CONFIG) {
      this.config = { ...DEFAULT_SCANNER_CONFIG, ...config };
      this.trendAnalyzer = new TrendAnalyzer(this.config);
      this.momentumAnalyzer = new MomentumAnalyzer(this.config);
      this.riskAnalyzer = new RiskAnalyzer(this.config);
      this.confidenceEngine = new ConfidenceEngine(this.config);
      this.signalEngine = new SignalEngine(this.config);
      this.marketHistory = new Map();
      this.lastEvents = new Map();
      this.lastValidationRecords = new Map();
    }

    reset() {
      this.marketHistory.clear();
      this.lastEvents.clear();
      this.lastValidationRecords.clear();
    }

    addTick(symbol, price, epoch = Date.now() / 1000) {
      const history = this.marketHistory.get(symbol) || [];
      history.push({ price: Number(price), epoch });

      if (history.length > this.config.historyLimit) {
        history.splice(0, history.length - this.config.historyLimit);
      }

      this.marketHistory.set(symbol, history);
      if (history.length < this.config.minSamples) {
        return {
          symbol,
          state: "No Trade",
          recommendation: "WAIT",
          confidence: 0,
          ready: false,
        };
      }

      return this.analyzeMarket(symbol);
    }

    analyzeMarket(symbol) {
      const ticks = this.marketHistory.get(symbol) || [];
      const trend = this.trendAnalyzer.analyze(ticks);
      const momentum = this.momentumAnalyzer.analyze(ticks, trend.direction);
      const risk = this.riskAnalyzer.analyze(ticks, trend.direction);
      const draft = {
        symbol,
        trendDirection: trend.direction,
        trendStrength: trend.trendStrength,
        momentumStrength: momentum.momentumStrength,
        trendAge: trend.trendAge,
        dummyImpulseRisk: risk.dummyImpulseRisk,
        extremePointRisk: risk.extremePointRisk,
      };
      const confidence = this.confidenceEngine.score(draft);
      const state = this.signalEngine.classify({ ...draft, confidence });
      const recommendation = this.signalEngine.recommend({ ...draft, confidence, state });

      return {
        ...draft,
        confidence,
        state,
        recommendation,
        ready: true,
        shouldAlert: this.signalEngine.shouldAlert({ recommendation }),
      };
    }

    getMeaningfulEvent(analysis, marketName) {
      if (!analysis.ready || !analysis.shouldAlert) {
        return null;
      }

      const eventKey = `${analysis.symbol}:${analysis.recommendation}`;
      const now = Date.now();
      const lastEventAt = this.lastEvents.get(eventKey) || 0;
      if (now - lastEventAt < this.config.eventCooldownMs) {
        return null;
      }

      this.lastEvents.set(eventKey, now);
      return {
        time: new Date(),
        market: marketName || analysis.symbol,
        trend: analysis.state,
        confidence: analysis.confidence,
        recommendation: analysis.recommendation,
        analysis,
      };
    }

    getValidationRecord(analysis, marketName) {
      if (!analysis.ready) {
        return null;
      }

      const rules = this.getRuleSummary(analysis);
      const category = this.getValidationCategory(analysis.recommendation);
      const rejectionKey = rules.preventedDeployment.join("|") || "none";
      const recordKey = `${analysis.symbol}:${category}:${analysis.state}:${analysis.recommendation}:${rejectionKey}`;
      const now = Date.now();
      const lastRecordAt = this.lastValidationRecords.get(recordKey) || 0;

      if (now - lastRecordAt < this.config.eventCooldownMs) {
        return null;
      }

      this.lastValidationRecords.set(recordKey, now);
      return {
        timestamp: new Date(),
        symbol: analysis.symbol,
        market: marketName || analysis.symbol,
        trendClassification: analysis.state,
        trendStrength: analysis.trendStrength,
        momentumStrength: analysis.momentumStrength,
        trendAge: analysis.trendAge,
        dummyImpulseRisk: analysis.dummyImpulseRisk,
        extremePointRisk: analysis.extremePointRisk,
        confidence: analysis.confidence,
        recommendation: analysis.recommendation,
        category,
        rulesSatisfied: rules.satisfied,
        preventedDeployment: rules.preventedDeployment,
      };
    }

    getValidationCategory(recommendation) {
      if (recommendation.startsWith("DEPLOY")) {
        return "deploy";
      }
      if (recommendation === "WATCH") {
        return "watch";
      }
      if (recommendation === "STOP") {
        return "stop";
      }
      return "rejected";
    }

    getRuleSummary(analysis) {
      const satisfied = [];
      const preventedDeployment = [];
      const isStrongTrend = analysis.state === "Strong Uptrend" || analysis.state === "Strong Downtrend";

      if (isStrongTrend) {
        satisfied.push("Strong trend classification");
      } else {
        preventedDeployment.push(`Trend classification is ${analysis.state}`);
      }

      if (analysis.trendStrength >= this.config.strongTrendMin) {
        satisfied.push("Trend strength meets threshold");
      } else {
        preventedDeployment.push("Trend strength below deployment threshold");
      }

      if (analysis.momentumStrength >= this.config.strongMomentumMin) {
        satisfied.push("Momentum meets threshold");
      } else {
        preventedDeployment.push("Weak momentum");
      }

      if (analysis.trendAge === "Established" || analysis.trendAge === "Mature") {
        satisfied.push(`${analysis.trendAge} trend age`);
      } else {
        preventedDeployment.push("Immature trend");
      }

      if (analysis.dummyImpulseRisk === "LOW") {
        satisfied.push("Low dummy impulse risk");
      } else {
        preventedDeployment.push(`${analysis.dummyImpulseRisk.toLowerCase()} dummy impulse risk`);
      }

      if (analysis.extremePointRisk === "LOW") {
        satisfied.push("Low extreme point risk");
      } else {
        preventedDeployment.push(`${analysis.extremePointRisk.toLowerCase()} extreme-point risk`);
      }

      if (analysis.confidence >= this.config.highConfidence) {
        satisfied.push("Confidence meets deployment threshold");
      } else {
        preventedDeployment.push("Confidence below deployment threshold");
      }

      return {
        satisfied,
        preventedDeployment,
      };
    }
  }

  window.ApexScanner = {
    DEFAULT_SCANNER_CONFIG,
    ScannerEngine,
    TrendAnalyzer,
    MomentumAnalyzer,
    RiskAnalyzer,
    ConfidenceEngine,
    SignalEngine,
  };
}());
