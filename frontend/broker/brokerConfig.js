(function () {
  const BROKER_CONFIG = {
    defaultBroker: "deriv",
    supportedBrokers: {
      deriv: {
        id: "deriv",
        name: "Deriv",
        enabled: true,
        readOnlyConnector: true,
        oauth: {
          client_id: "YOUR_DERIV_CLIENT_ID",
          redirect_uri: "http://127.0.0.1:8787/api/deriv/oauth/callback",
          scope: "trade",
          auth_url: "https://auth.deriv.com/oauth2/auth",
          token_url: "https://auth.deriv.com/oauth2/token",
          pkce_enabled: true,
        },
        security: {
          productionTokenStorage: "server-side-only",
          developerModeTokenStorage: "local browser storage for local testing only",
        },
      },
    },
    futureBrokers: {
      mt5: {
        id: "mt5",
        name: "MetaTrader 5",
        enabled: false,
        reason: "Future broker placeholder.",
      },
      cTrader: {
        id: "ctrader",
        name: "cTrader",
        enabled: false,
        reason: "Future broker placeholder.",
      },
    },
  };

  // Production broker tokens must eventually live server-side only.
  // The frontend must never store production access or refresh tokens.
  // Developer Mode token storage remains a local-testing bridge until OAuth PKCE is completed.
  window.ApexBrokerConfig = BROKER_CONFIG;
}());
