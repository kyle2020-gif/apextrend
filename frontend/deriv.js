const DERIV_ENDPOINT = "wss://ws.derivws.com/websockets/v3?app_id=1089";

let derivSocket = null;
let requestId = 1;
let manualDisconnect = false;
let reconnectTimer = null;
let currentToken = "";
let authorizedAccount = null;
const pendingRequests = new Map();
const tickSubscriptions = new Map();
const subscribedSymbols = new Set();
const derivListeners = new EventTarget();

function emitDerivEvent(name, detail = {}) {
  derivListeners.dispatchEvent(new CustomEvent(name, { detail }));
}

function addDerivListener(name, callback) {
  derivListeners.addEventListener(name, callback);
}

function getDerivReadyState() {
  return derivSocket ? derivSocket.readyState : WebSocket.CLOSED;
}

function sendDerivRequest(payload) {
  if (!derivSocket || derivSocket.readyState !== WebSocket.OPEN) {
    return Promise.reject(new Error("Deriv WebSocket is not connected."));
  }

  const reqId = requestId++;
  derivSocket.send(JSON.stringify({ ...payload, req_id: reqId }));

  return new Promise((resolve, reject) => {
    pendingRequests.set(reqId, { resolve, reject });
  });
}

function settlePendingRequests(error) {
  pendingRequests.forEach(({ reject }) => reject(error));
  pendingRequests.clear();
}

function handleDerivMessage(message) {
  const data = JSON.parse(message.data);

  if (data.error) {
    const error = new Error(data.error.message || "Deriv API request failed.");
    if (data.req_id && pendingRequests.has(data.req_id)) {
      pendingRequests.get(data.req_id).reject(error);
      pendingRequests.delete(data.req_id);
      return;
    }
    emitDerivEvent("error", { message: error.message });
    return;
  }

  if (data.req_id && pendingRequests.has(data.req_id)) {
    pendingRequests.get(data.req_id).resolve(data);
    pendingRequests.delete(data.req_id);
  }

  if (data.msg_type === "balance" && data.balance) {
    emitDerivEvent("balance", { balance: data.balance });
  }

  if (data.msg_type === "tick" && data.tick) {
    emitDerivEvent("tick", {
      symbol: data.tick.symbol,
      price: data.tick.quote,
      epoch: data.tick.epoch,
    });
  }

  if (data.msg_type === "proposal_open_contract" && data.proposal_open_contract) {
    emitDerivEvent("contract", {
      contract: data.proposal_open_contract,
      subscriptionId: data.subscription?.id,
    });
  }
}

function scheduleReconnect() {
  if (manualDisconnect || !currentToken || reconnectTimer) {
    return;
  }

  emitDerivEvent("status", { status: "Reconnecting" });
  reconnectTimer = window.setTimeout(async () => {
    reconnectTimer = null;
    try {
      await connectDeriv();
      await authorizeDeriv(currentToken);
      await getBalance();
      for (const symbol of subscribedSymbols) {
        await subscribeTicks(symbol);
      }
    } catch (error) {
      emitDerivEvent("error", { message: error.message });
      scheduleReconnect();
    }
  }, 2500);
}

function clearReconnectTimer() {
  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function closeTickSubscriptions() {
  tickSubscriptions.forEach((subscriptionId) => {
    if (derivSocket && derivSocket.readyState === WebSocket.OPEN) {
      derivSocket.send(JSON.stringify({ forget: subscriptionId }));
    }
  });
  tickSubscriptions.clear();
}

// Opens the Deriv WebSocket and wires status, message, and reconnect events.
function connectDeriv() {
  if (derivSocket && derivSocket.readyState === WebSocket.OPEN) {
    return Promise.resolve(derivSocket);
  }

  manualDisconnect = false;
  clearReconnectTimer();
  emitDerivEvent("status", { status: "Connecting" });

  return new Promise((resolve, reject) => {
    derivSocket = new WebSocket(DERIV_ENDPOINT);

    derivSocket.addEventListener("open", () => {
      emitDerivEvent("status", { status: "Connected" });
      resolve(derivSocket);
    });

    derivSocket.addEventListener("message", handleDerivMessage);

    derivSocket.addEventListener("error", () => {
      const error = new Error("Unable to connect to Deriv.");
      emitDerivEvent("error", { message: error.message });
      reject(error);
    }, { once: true });

    derivSocket.addEventListener("close", () => {
      settlePendingRequests(new Error("Deriv WebSocket disconnected."));
      tickSubscriptions.clear();
      emitDerivEvent("status", { status: manualDisconnect ? "Disconnected" : "Disconnected. Reconnect pending." });
      scheduleReconnect();
    });
  });
}

// Authorizes account access with a user-provided API token.
async function authorizeDeriv(token) {
  currentToken = token;
  const response = await sendDerivRequest({ authorize: token });
  authorizedAccount = response.authorize;
  emitDerivEvent("authorized", { account: authorizedAccount });
  return authorizedAccount;
}

// Reads the authorized account balance without placing trades.
async function getBalance() {
  const response = await sendDerivRequest({ balance: 1, subscribe: 1 });
  emitDerivEvent("balance", { balance: response.balance });
  return response.balance;
}

// Fetches all active symbols available from Deriv.
async function getActiveSymbols() {
  const response = await sendDerivRequest({
    active_symbols: "brief",
    product_type: "basic",
  });
  return response.active_symbols || [];
}

// Keeps only synthetic Volatility Indices and excludes Boom and Crash markets.
function filterVolatilityIndices(symbols) {
  return symbols.filter((symbol) => {
    const marketName = `${symbol.display_name || ""} ${symbol.symbol || ""}`.toLowerCase();
    const isVolatility = marketName.includes("volatility");
    const isBoomOrCrash = marketName.includes("boom") || marketName.includes("crash");
    return isVolatility && !isBoomOrCrash;
  });
}

// Subscribes to live ticks for a selected index symbol.
async function subscribeTicks(symbol) {
  if (tickSubscriptions.has(symbol)) {
    return tickSubscriptions.get(symbol);
  }

  subscribedSymbols.add(symbol);
  const response = await sendDerivRequest({ ticks: symbol, subscribe: 1 });
  const subscriptionId = response.subscription?.id;
  if (subscriptionId) {
    tickSubscriptions.set(symbol, subscriptionId);
    emitDerivEvent("subscription", { symbol, subscriptionId });
  }
  return subscriptionId;
}

function unsubscribeTicks(symbol) {
  subscribedSymbols.delete(symbol);
  const subscriptionId = tickSubscriptions.get(symbol);
  if (!subscriptionId) {
    return;
  }

  if (derivSocket && derivSocket.readyState === WebSocket.OPEN) {
    derivSocket.send(JSON.stringify({ forget: subscriptionId }));
  }
  tickSubscriptions.delete(symbol);
  emitDerivEvent("unsubscription", { symbol });
}

// Closes subscriptions and disconnects from Deriv without scheduling reconnect.
function disconnectDeriv() {
  manualDisconnect = true;
  clearReconnectTimer();
  closeTickSubscriptions();
  subscribedSymbols.clear();
  authorizedAccount = null;
  currentToken = "";

  if (derivSocket) {
    derivSocket.close();
  }
}

window.ApexDeriv = {
  addDerivListener,
  authorizeDeriv,
  connectDeriv,
  disconnectDeriv,
  filterVolatilityIndices,
  getActiveSymbols,
  getBalance,
  getDerivReadyState,
  sendDerivRequest,
  subscribeTicks,
  unsubscribeTicks,
};
