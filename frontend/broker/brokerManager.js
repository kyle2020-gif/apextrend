(function () {
  class BrokerManager {
    constructor(config = window.ApexBrokerConfig) {
      this.config = config || {};
      this.adapters = new Map();
      this.activeBrokerId = this.config.defaultBroker || "";
    }

    registerBroker(adapter) {
      if (!adapter?.id) {
        throw new Error("Broker adapter must provide an id.");
      }

      this.adapters.set(adapter.id, adapter);
      if (!this.activeBrokerId) {
        this.activeBrokerId = adapter.id;
      }
      return adapter;
    }

    selectBroker(brokerId) {
      if (!this.adapters.has(brokerId)) {
        throw new Error(`Broker is not registered: ${brokerId}.`);
      }
      this.activeBrokerId = brokerId;
      return this.getActiveBroker();
    }

    getActiveBroker() {
      const adapter = this.adapters.get(this.activeBrokerId);
      if (!adapter) {
        throw new Error("No broker is selected. Select Deriv before connecting.");
      }
      return adapter;
    }

    getActiveBrokerId() {
      return this.activeBrokerId;
    }

    getRegisteredBrokers() {
      return Array.from(this.adapters.values()).map((adapter) => ({
        id: adapter.id,
        name: adapter.name,
        active: adapter.id === this.activeBrokerId,
      }));
    }

    getConnectionStatus() {
      try {
        return this.getActiveBroker().getConnectionStatus();
      } catch (error) {
        return {
          brokerId: this.activeBrokerId || "",
          brokerName: "No broker",
          connected: false,
          mode: "Offline",
          status: "Offline",
          error: error.message,
        };
      }
    }

    ensureConnected() {
      const status = this.getConnectionStatus();
      if (!status.connected) {
        throw new Error("Broker is offline. Connect Deriv before continuing.");
      }
      return status;
    }

    ensureDemoAccount() {
      const status = this.ensureConnected();
      if (String(status.accountType || "").toLowerCase() !== "demo") {
        throw new Error("Broker execution blocked: real account execution is disabled.");
      }
      return status;
    }

    route(methodName, args = [], options = {}) {
      const adapter = this.getActiveBroker();
      const method = adapter[methodName];
      if (typeof method !== "function") {
        throw new Error(`The selected broker does not support ${methodName} yet.`);
      }

      if (options.requiresConnection) {
        this.ensureConnected();
      }

      if (options.requiresDemo) {
        this.ensureDemoAccount();
      }

      return method.apply(adapter, args);
    }

    setGatewayStatus(status, options = {}) {
      const adapter = this.getActiveBroker();
      if (typeof adapter.setGatewayStatus !== "function") {
        return this.getConnectionStatus();
      }
      return adapter.setGatewayStatus(status, options);
    }

    connect(...args) {
      return this.route("connect", args);
    }

    authorize(...args) {
      return this.route("authorize", args, { requiresConnection: true });
    }

    disconnect(...args) {
      return this.route("disconnect", args);
    }

    getBalance(...args) {
      return this.route("getBalance", args, { requiresConnection: true });
    }

    getSymbols(...args) {
      return this.route("getSymbols", args, { requiresConnection: true });
    }

    subscribeTicks(...args) {
      return this.route("subscribeTicks", args, { requiresConnection: true });
    }

    unsubscribeTicks(...args) {
      return this.route("unsubscribeTicks", args);
    }

    requestProposal(...args) {
      return this.route("requestProposal", args, { requiresConnection: true, requiresDemo: true });
    }

    buyContract(...args) {
      return this.route("buyContract", args, { requiresConnection: true, requiresDemo: true });
    }

    monitorContract(...args) {
      return this.route("monitorContract", args, { requiresConnection: true, requiresDemo: true });
    }

    getOpenContracts(...args) {
      return this.route("getOpenContracts", args, { requiresConnection: true });
    }
  }

  const manager = new BrokerManager(window.ApexBrokerConfig);
  const derivConfig = window.ApexBrokerConfig?.supportedBrokers?.deriv;

  if (derivConfig?.enabled && window.ApexDerivAdapter?.DerivAdapter) {
    manager.registerBroker(new window.ApexDerivAdapter.DerivAdapter(derivConfig));
    manager.selectBroker(derivConfig.id);
  }

  window.ApexBroker = {
    BrokerManager,
    manager,
  };
}());
