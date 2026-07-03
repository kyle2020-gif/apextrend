(function () {
  class BrokerAdapter {
    constructor(config = {}) {
      this.config = config;
      this.id = config.id || "unknown";
      this.name = config.name || "Unknown Broker";
    }

    connect() {
      throw new Error(`${this.name} does not implement connect().`);
    }

    authorize(_token, _options = {}) {
      throw new Error(`${this.name} does not implement authorize().`);
    }

    disconnect() {
      throw new Error(`${this.name} does not implement disconnect().`);
    }

    getConnectionStatus() {
      return {
        brokerId: this.id,
        brokerName: this.name,
        connected: false,
        mode: "Offline",
        status: "Offline",
      };
    }

    getBalance() {
      throw new Error(`${this.name} does not implement getBalance().`);
    }

    getSymbols() {
      throw new Error(`${this.name} does not implement getSymbols().`);
    }

    subscribeTicks(_symbol) {
      throw new Error(`${this.name} does not implement subscribeTicks().`);
    }

    unsubscribeTicks(_symbol) {
      throw new Error(`${this.name} does not implement unsubscribeTicks().`);
    }

    requestProposal(_params) {
      throw new Error(`${this.name} does not implement requestProposal().`);
    }

    buyContract(_params) {
      throw new Error(`${this.name} does not implement buyContract().`);
    }

    monitorContract(_contractId) {
      throw new Error(`${this.name} does not implement monitorContract().`);
    }

    getOpenContracts() {
      return [];
    }
  }

  window.ApexBrokerAdapter = {
    BrokerAdapter,
  };
}());
