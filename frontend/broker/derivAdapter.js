(function () {
  const { BrokerAdapter } = window.ApexBrokerAdapter;

  class DerivAdapter extends BrokerAdapter {
    constructor(config = {}, derivConnector = window.ApexDeriv) {
      super(config);
      this.deriv = derivConnector;
      this.mode = "Offline";
      this.lastStatus = "Offline";
      this.gatewayStatus = "Offline";
      this.authorizedAccount = null;
      this.balance = null;
      this.connectionSource = "";
      this.mode = "Offline";
      this.otpSocket = null;

      this.deriv?.addDerivListener?.("status", (event) => {
        this.lastStatus = event.detail.status || "Offline";
        this.gatewayStatus = this.mapDerivStatus(this.lastStatus);
        this.mode = this.getModeFromStatus(this.lastStatus);
      });

      this.deriv?.addDerivListener?.("authorized", (event) => {
        this.authorizedAccount = event.detail.account || null;
        this.gatewayStatus = "Authorized";
        this.mode = this.connectionSource === "oauth" ? "OAuth pending" : "Developer mode";
        this.lastStatus = "Connected";
      });

      this.deriv?.addDerivListener?.("balance", (event) => {
        this.balance = event.detail.balance || null;
      });
    }

    ensureConnector(methodName) {
      if (!this.deriv || typeof this.deriv[methodName] !== "function") {
        throw new Error(`Deriv connector method unavailable: ${methodName}.`);
      }
    }

    getModeFromStatus(status) {
      if (status === "Connected" && this.authorizedAccount) {
        return this.connectionSource === "oauth" ? "OAuth pending" : "Developer mode";
      }
      if (status === "Connected") {
        return "OAuth pending";
      }
      if (status === "Connecting" || status === "Reconnecting") {
        return status;
      }
      if (String(status).startsWith("Disconnected") && this.authorizedAccount) {
        return "Connection lost";
      }
      return "Offline";
    }

    mapDerivStatus(status) {
      if (status === "Connecting" || status === "Reconnecting") {
        return status;
      }
      if (status === "Connected") {
        return this.authorizedAccount ? "Connected" : "OAuth pending";
      }
      if (String(status).startsWith("Disconnected") && this.authorizedAccount) {
        return "Connection lost";
      }
      return "Offline";
    }

    setGatewayStatus(status, options = {}) {
      this.gatewayStatus = status || this.gatewayStatus;
      if (options.source) {
        this.connectionSource = options.source;
      }
      if (status === "Offline") {
        this.mode = "Offline";
      }
      return this.getConnectionStatus();
    }

    connect() {
      this.ensureConnector("connectDeriv");
      this.gatewayStatus = "Connecting";
      return this.deriv.connectDeriv();
    }

    authorize(token, options = {}) {
      this.ensureConnector("authorizeDeriv");
      this.connectionSource = options.source || this.connectionSource || "developer";
      return this.deriv.authorizeDeriv(token);
    }

    disconnect() {
      this.ensureConnector("disconnectDeriv");
      this.authorizedAccount = null;
      this.balance = null;
      this.mode = "Offline";
      this.lastStatus = "Offline";
      this.gatewayStatus = "Offline";
      this.connectionSource = "";
      if (this.otpSocket) {
        this.otpSocket.close();
        this.otpSocket = null;
      }
      return this.deriv.disconnectDeriv();
    }

    connectWithOtpWebSocket(wsUrl) {
      if (!wsUrl || !/^wss:\/\//i.test(wsUrl)) {
        return Promise.reject(new Error("Invalid Deriv OTP WebSocket URL."));
      }

      if (this.otpSocket) {
        this.otpSocket.close();
        this.otpSocket = null;
      }

      this.connectionSource = "oauth";
      this.mode = "modernOAuthOtp";
      this.gatewayStatus = "Connecting";

      return new Promise((resolve, reject) => {
        const socket = new WebSocket(wsUrl);
        this.otpSocket = socket;

        socket.addEventListener("open", () => {
          // Modern OTP WebSocket is already scoped by Deriv. Do not send legacy authorize messages here.
          this.gatewayStatus = "Connected";
          this.mode = "modernOAuthOtp";
          resolve(socket);
        }, { once: true });

        socket.addEventListener("error", () => {
          reject(new Error("Unable to connect Deriv Demo OTP WebSocket."));
        }, { once: true });

        socket.addEventListener("close", () => {
          if (this.otpSocket === socket) {
            this.gatewayStatus = "Connection lost";
          }
        });
      });
    }

    getConnectionStatus() {
      const readyState = this.deriv?.getDerivReadyState?.();
      const otpConnected = this.otpSocket?.readyState === WebSocket.OPEN;
      const connected = otpConnected || readyState === WebSocket.OPEN;
      const status = connected ? "Connected" : this.lastStatus;
      const mode = this.getModeFromStatus(status);
      return {
        brokerId: this.id,
        brokerName: this.name,
        connected,
        mode: otpConnected ? "modernOAuthOtp" : mode,
        status: connected ? this.gatewayStatus : this.mapDerivStatus(status),
        loginId: this.authorizedAccount?.loginid || "",
        accountType: this.authorizedAccount?.is_virtual ? "Demo" : (this.authorizedAccount ? "Real" : ""),
        currency: this.authorizedAccount?.currency || this.balance?.currency || "",
      };
    }

    getBalance() {
      this.ensureConnector("getBalance");
      this.gatewayStatus = "Authorized";
      return this.deriv.getBalance();
    }

    getSymbols() {
      this.ensureConnector("getActiveSymbols");
      this.gatewayStatus = "Loading markets";
      return this.deriv.getActiveSymbols();
    }

    subscribeTicks(symbol) {
      this.ensureConnector("subscribeTicks");
      this.gatewayStatus = "Subscribing";
      return this.deriv.subscribeTicks(symbol);
    }

    unsubscribeTicks(symbol) {
      this.ensureConnector("unsubscribeTicks");
      return this.deriv.unsubscribeTicks(symbol);
    }

    requestProposal(params) {
      this.ensureConnector("sendDerivRequest");
      return this.deriv.sendDerivRequest({
        proposal: 1,
        amount: params.amount,
        basis: params.basis,
        contract_type: params.contract_type,
        currency: params.currency,
        duration: params.duration,
        duration_unit: params.duration_unit,
        symbol: params.symbol,
        barrier: params.barrier,
      });
    }

    buyContract(params) {
      this.ensureConnector("sendDerivRequest");
      const proposalId = params.proposalId || params.proposal_id || params.buy;
      if (!proposalId) {
        throw new Error("Broker buy failed: proposal id is missing.");
      }
      return this.deriv.sendDerivRequest({
        buy: proposalId,
        price: params.price,
      });
    }

    monitorContract(contractId) {
      this.ensureConnector("sendDerivRequest");
      return this.deriv.sendDerivRequest({
        proposal_open_contract: 1,
        contract_id: contractId,
        subscribe: 1,
      });
    }

    getOpenContracts() {
      this.ensureConnector("sendDerivRequest");
      return this.deriv.sendDerivRequest({ portfolio: 1 });
    }
  }

  window.ApexDerivAdapter = {
    DerivAdapter,
  };
}());
