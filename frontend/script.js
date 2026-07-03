const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll("[data-screen]"));
const authForm = document.querySelector("#auth-form");
const authFullNameField = document.querySelector("#full-name-field");
const authFullNameInput = document.querySelector("#full-name");
const authEmailInput = document.querySelector("#email");
const authPasswordInput = document.querySelector("#password");
const authConfirmPasswordField = document.querySelector("#confirm-password-field");
const authConfirmPasswordInput = document.querySelector("#confirm-password");
const authTermsCheck = document.querySelector("#terms-check");
const authTermsCheckbox = document.querySelector("#terms-checkbox");
const loginTitle = document.querySelector("#login-title");
const authModeCopy = document.querySelector("#auth-mode-copy");
const authSubmitButton = document.querySelector("#auth-submit-button");
const authMessage = document.querySelector("#auth-message");
const showSignupButton = document.querySelector("#show-signup-button");
const forgotPasswordButton = document.querySelector("#forgot-password-button");
const accountMenu = document.querySelector("#account-menu");
const authUserEmail = document.querySelector("#auth-user-email");
const logoutButton = document.querySelector("#logout-button");
const backendStatus = document.querySelector("#backend-status");
const backendStatusLabel = document.querySelector("#backend-status-label");
const syncStatus = document.querySelector("#sync-status");
const syncStatusLabel = document.querySelector("#sync-status-label");
const brokerStatus = document.querySelector("#broker-status");
const brokerStatusLabel = document.querySelector("#broker-status-label");
const tokenInput = document.querySelector("#deriv-token");
const connectForm = document.querySelector("#deriv-connect-form");
const derivOauthButton = document.querySelector("#deriv-oauth-button");
const derivAccountPanel = document.querySelector("#deriv-account-panel");
const derivOauthStatus = document.querySelector("#deriv-oauth-status");
const derivAccountSelect = document.querySelector("#deriv-account-select");
const derivDemoOtpButton = document.querySelector("#deriv-demo-otp-button");
const connectionDot = document.querySelector("#connection-dot");
const connectionStatus = document.querySelector("#connection-status");
const accountType = document.querySelector("#account-type");
const loginId = document.querySelector("#login-id");
const accountCurrency = document.querySelector("#account-currency");
const accountBalance = document.querySelector("#account-balance");
const connectorMessage = document.querySelector("#connector-message");
const volatilityList = document.querySelector("#volatility-list");
const refreshSymbolsButton = document.querySelector("#refresh-symbols-button");
const subscribeAllButton = document.querySelector("#subscribe-all-button");
const disconnectButton = document.querySelector("#disconnect-button");
const scannerStatus = document.querySelector("#scanner-status");
const opportunityCard = document.querySelector("#opportunity-card");
const opportunityMarket = document.querySelector("#opportunity-market");
const opportunityRecommendation = document.querySelector("#opportunity-recommendation");
const opportunityConfidence = document.querySelector("#opportunity-confidence");
const opportunityTrendStrength = document.querySelector("#opportunity-trend-strength");
const opportunityMomentum = document.querySelector("#opportunity-momentum");
const opportunityBot = document.querySelector("#opportunity-bot");
const deploySignalButton = document.querySelector("#deploy-signal-button");
const ignoreSignalButton = document.querySelector("#ignore-signal-button");
const mockSignalButtons = Array.from(document.querySelectorAll("[data-mock-signal]"));
const executionTestButtons = Array.from(document.querySelectorAll("[data-execution-test]"));
const botTestButtons = Array.from(document.querySelectorAll("[data-bot-test]"));
const dashboardTestButtons = Array.from(document.querySelectorAll("[data-dashboard-test]"));
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const activeBotPanel = document.querySelector("#active-bot-panel");
const activeBotMarket = document.querySelector("#active-bot-market");
const activeBotType = document.querySelector("#active-bot-type");
const activeBotStatus = document.querySelector("#active-bot-status");
const activeBotBalance = document.querySelector("#active-bot-balance");
const activeBotOpenTrades = document.querySelector("#active-bot-open-trades");
const activeBotConfidence = document.querySelector("#active-bot-confidence");
const activeBotDirection = document.querySelector("#active-bot-direction");
const activeBotVerification = document.querySelector("#active-bot-verification");
const activeBotBarrierDirection = document.querySelector("#active-bot-barrier-direction");
const activeBotDuration = document.querySelector("#active-bot-duration");
const activeBotStake = document.querySelector("#active-bot-stake");
const deploymentStatus = document.querySelector("#deployment-status");
const stopBotButton = document.querySelector("#stop-bot-button");
const contractPanel = document.querySelector("#contract-panel");
const contractMarket = document.querySelector("#contract-market");
const contractStrategy = document.querySelector("#contract-strategy");
const contractBarrier = document.querySelector("#contract-barrier");
const contractStake = document.querySelector("#contract-stake");
const contractDuration = document.querySelector("#contract-duration");
const contractStatus = document.querySelector("#contract-status");
const contractTimeRemaining = document.querySelector("#contract-time-remaining");
const contractProfitLoss = document.querySelector("#contract-profit-loss");
const cancelExecutionButton = document.querySelector("#cancel-execution-button");
const activityList = document.querySelector("#activity-list");
const validationList = document.querySelector("#validation-list");
const validationFilterButtons = Array.from(document.querySelectorAll("[data-validation-filter]"));
const riskSettingsForm = document.querySelector("#risk-settings-form");
const riskPerTradeInput = document.querySelector("#risk-per-trade");
const dailyProfitTargetInput = document.querySelector("#daily-profit-target");
const dailyLossLimitInput = document.querySelector("#daily-loss-limit");
const maxConsecutiveLossesInput = document.querySelector("#max-consecutive-losses");
const maxTradesDayInput = document.querySelector("#max-trades-day");
const maxOpenTradesInput = document.querySelector("#max-open-trades");
const executionModeInput = document.querySelector("#execution-mode");
const scannerSensitivityInput = document.querySelector("#scanner-sensitivity");
const riskSettingsMessage = document.querySelector("#risk-settings-message");
const realAccountWarning = document.querySelector("#real-account-warning");
const riskBalance = document.querySelector("#risk-balance");
const riskStake = document.querySelector("#risk-stake");
const riskTradesToday = document.querySelector("#risk-trades-today");
const riskConsecutiveLosses = document.querySelector("#risk-consecutive-losses");
const riskDailyPl = document.querySelector("#risk-daily-pl");
const riskCurrentStatus = document.querySelector("#risk-current-status");
const dashboardVersion = document.querySelector("#dashboard-version");
const dashboardAccount = document.querySelector("#dashboard-account");
const dashboardBackendStatus = document.querySelector("#dashboard-backend-status");
const dashboardCloudStatus = document.querySelector("#dashboard-cloud-status");
const dashboardBrokerStatus = document.querySelector("#dashboard-broker-status");
const dashboardBrokerConnection = document.querySelector("#dashboard-broker-connection");
const welcomeGreeting = document.querySelector("#welcome-greeting");
const welcomeName = document.querySelector("#welcome-name");
const dashScannerState = document.querySelector("#dash-scanner-state");
const dashMarketsScanned = document.querySelector("#dash-markets-scanned");
const dashMarketsConnected = document.querySelector("#dash-markets-connected");
const dashScannerUptime = document.querySelector("#dash-scanner-uptime");
const dashLastScan = document.querySelector("#dash-last-scan");
const dashSignalsToday = document.querySelector("#dash-signals-today");
const dashDeploymentsApproved = document.querySelector("#dash-deployments-approved");
const dashBotApprovals = document.querySelector("#dash-bot-approvals");
const dashBotRejections = document.querySelector("#dash-bot-rejections");
const dashContractsCompleted = document.querySelector("#dash-contracts-completed");
const dashWinLoss = document.querySelector("#dash-win-loss");
const dashActiveBot = document.querySelector("#dash-active-bot");
const dashActiveMarket = document.querySelector("#dash-active-market");
const dashActiveConfidence = document.querySelector("#dash-active-confidence");
const dashContractState = document.querySelector("#dash-contract-state");
const dashActiveBarrier = document.querySelector("#dash-active-barrier");
const dashActiveDuration = document.querySelector("#dash-active-duration");
const dashActiveStake = document.querySelector("#dash-active-stake");
const dashRiskPercent = document.querySelector("#dash-risk-percent");
const dashDailyTrades = document.querySelector("#dash-daily-trades");
const dashOpenContracts = document.querySelector("#dash-open-contracts");
const dashProfitTarget = document.querySelector("#dash-profit-target");
const dashLossLimit = document.querySelector("#dash-loss-limit");
const dashRiskStatus = document.querySelector("#dash-risk-status");
const dashMarketsMonitored = document.querySelector("#dash-markets-monitored");
const dashAnalyticsSignals = document.querySelector("#dash-analytics-signals");
const dashAverageConfidence = document.querySelector("#dash-average-confidence");
const dashAverageResponse = document.querySelector("#dash-average-response");
const dashScannerAvailability = document.querySelector("#dash-scanner-availability");
const quickConnectButton = document.querySelector("#quick-connect-button");
const quickStartScannerButton = document.querySelector("#quick-start-scanner-button");
const quickStopScannerButton = document.querySelector("#quick-stop-scanner-button");
const quickRiskButton = document.querySelector("#quick-risk-button");
const quickActivityButton = document.querySelector("#quick-activity-button");
const dashboardTimeline = document.querySelector("#dashboard-timeline");
const dashboardEmptyState = document.querySelector("#dashboard-empty-state");

const APEXTREND_VERSION = "Developer Preview 7D";
const BACKEND_HEALTH_URL = "http://127.0.0.1:8787/api/health";
const DERIV_OAUTH_START_URL = "http://127.0.0.1:8787/api/deriv/oauth/start";
const DERIV_ACCOUNTS_URL = "http://127.0.0.1:8787/api/deriv/accounts";
const DERIV_CONNECTION_STATUS_URL = "http://127.0.0.1:8787/api/deriv/connection-status";
const DERIV_OTP_BASE_URL = "http://127.0.0.1:8787/api/deriv/options/accounts";
const PROTECTED_SCREENS = new Set(["connect", "dashboard", "risk", "validation", "activity"]);

let volatilitySymbols = [];
let latestTicks = new Map();
let uiSubscribedSymbols = new Set();
let scannerEngine = new window.ApexScanner.ScannerEngine();
let deploymentManager = new window.ApexDeployment.DeploymentManager({
  deploymentConfidence: window.ApexScanner.DEFAULT_SCANNER_CONFIG.highConfidence,
});
let riskManager = new window.ApexRisk.RiskManager();
let executionManager = new window.ApexExecution.ExecutionManager({
  deploymentConfidence: window.ApexScanner.DEFAULT_SCANNER_CONFIG.highConfidence,
});
let marketNames = new Map();
let validationRecords = [];
let activeValidationFilter = "all";
let latestAnalyses = new Map();
let latestDeploySignal = null;
let currentBalanceValue = 0;
let authMode = "login";
let cloudSyncUserId = "";
let scannerStartedAt = null;
let lastScanAt = null;
let dashboardActivityEvents = [];
let dashboardActiveBotSample = null;
let dashboardStats = {
  signalsToday: 0,
  deploymentsApproved: 0,
  botApprovals: 0,
  botRejections: 0,
  contractsCompleted: 0,
  wins: 0,
  losses: 0,
  confidenceTotal: 0,
  responseTotalMs: 0,
  responseSamples: 0,
};
let derivConnectionAttemptId = 0;
let activeDerivConnection = {
  id: 0,
  source: "",
  phase: "idle",
  completed: false,
};

function applyTheme(theme, options = {}) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = safeTheme;
  window.localStorage.setItem("apextrend_theme", safeTheme);
  themeToggleLabel.textContent = safeTheme === "dark" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-label", `Switch to ${safeTheme === "dark" ? "light" : "dark"} mode`);

  if (options.persist && window.ApexAuth?.isAuthenticated?.()) {
    window.ApexSettings?.saveTheme(safeTheme);
    addSimpleActivity(`Theme changed to ${safeTheme}.`, {
      eventType: "theme_change",
      theme: safeTheme,
    });
  }
}

async function checkBackendHealth() {
  if (!backendStatus || !backendStatusLabel) {
    return;
  }

  backendStatus.dataset.status = "checking";
  backendStatusLabel.textContent = "Checking...";

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(BACKEND_HEALTH_URL, {
      signal: controller.signal,
      cache: "no-store",
    });
    window.clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Backend health returned ${response.status}`);
    }

    const payload = await response.json();
    if (payload?.status !== "ok" || payload?.app !== "ApexTrend") {
      throw new Error("Backend health payload was not recognized.");
    }

    backendStatus.dataset.status = "connected";
    backendStatusLabel.textContent = "Connected";
    renderPersonalDashboard();
  } catch (error) {
    window.clearTimeout(timer);
    backendStatus.dataset.status = "offline";
    backendStatusLabel.textContent = "Offline";
    console.info("[ApexTrend Backend]", "Health check unavailable:", error.message);
    renderPersonalDashboard();
  }
}

function updateCloudSyncStatus(detail = window.ApexSettings?.getSyncState?.()) {
  if (!syncStatus || !syncStatusLabel) {
    return;
  }

  const status = detail?.status || (detail?.available ? "connected" : "offline");
  const message = detail?.message || (detail?.available ? "Cloud sync active" : "Cloud sync unavailable");
  const isSyncing = status === "syncing";
  syncStatus.dataset.status = isSyncing ? "syncing" : (detail?.available ? "connected" : "offline");
  syncStatusLabel.textContent = detail?.available ? "Connected" : (isSyncing ? "Syncing..." : message);
  syncStatus.title = message;
  renderPersonalDashboard();
}

function getBrokerGatewayStatus() {
  const fallback = {
    brokerName: "Deriv",
    connected: false,
    mode: "Offline",
    status: "Offline",
  };

  try {
    return window.ApexBroker?.manager?.getConnectionStatus?.() || fallback;
  } catch (_error) {
    return fallback;
  }
}

function getBrokerStatusKey(status) {
  if (!status?.connected) {
    if (status?.status === "Connection lost") {
      return "offline";
    }
    return "offline";
  }
  if (status.mode === "Developer mode" || status.status === "Developer mode") {
    return "developer";
  }
  if (status.mode === "OAuth pending" || status.status === "OAuth pending") {
    return "pending";
  }
  if (["Connecting", "Reconnecting", "Loading markets", "Subscribing", "Authorized"].includes(status.status) || status.mode === "Connecting" || status.mode === "Reconnecting") {
    return "connecting";
  }
  return "connected";
}

function updateBrokerStatus() {
  if (!brokerStatus || !brokerStatusLabel) {
    return;
  }

  const status = getBrokerGatewayStatus();
  const connectionLabel = status.connected ? status.status || status.mode || "Connected" : status.status || "Offline";
  brokerStatus.dataset.status = getBrokerStatusKey(status);
  brokerStatusLabel.textContent = `${status.brokerName || "Broker"} / ${connectionLabel}`;
  brokerStatus.title = `Broker: ${status.brokerName || "Unknown"}; Connection: ${connectionLabel}`;
  renderPersonalDashboard();
}

function setBrokerGatewayStatus(status, options = {}) {
  try {
    window.ApexBroker?.manager?.setGatewayStatus?.(status, options);
  } catch (_error) {
    // Broker gateway status is best-effort while the legacy Deriv connector remains active.
  }
  updateBrokerStatus();
}

function getBrokerManager() {
  if (!window.ApexBroker?.manager) {
    throw new Error("Broker gateway is unavailable.");
  }
  return window.ApexBroker.manager;
}

async function brokerConnect() {
  return getBrokerManager().connect();
}

async function brokerAuthorize(token, options = {}) {
  try {
    return await getBrokerManager().authorize(token, options);
  } catch (error) {
    throw new Error(`Authorization failed: ${error.message}`);
  }
}

async function brokerGetBalance() {
  try {
    return await getBrokerManager().getBalance();
  } catch (error) {
    throw new Error(`Balance load failed: ${error.message}`);
  }
}

async function brokerGetSymbols() {
  try {
    return await getBrokerManager().getSymbols();
  } catch (error) {
    throw new Error(`Symbol loading failed: ${error.message}`);
  }
}

async function brokerSubscribeTicks(symbol) {
  try {
    return await getBrokerManager().subscribeTicks(symbol);
  } catch (error) {
    throw new Error(`Tick subscription failed for ${symbol}: ${error.message}`);
  }
}

function brokerDisconnect() {
  try {
    return getBrokerManager().disconnect();
  } catch (_error) {
    return window.ApexDeriv.disconnectDeriv();
  }
}

function isSupabaseFetchFailure(value) {
  const message = String(value?.message || value || "");
  const stack = String(value?.stack || "");
  return message.includes("Failed to fetch") && stack.includes("supabase");
}

function handleSupabaseFetchFailure(event, error) {
  if (!isSupabaseFetchFailure(error)) {
    return;
  }

  event.preventDefault();
  window.ApexSettings?.markCloudUnavailable?.("Cloud sync unavailable", error);
  updateCloudSyncStatus({ available: false, status: "offline", message: "Cloud sync unavailable" });
}

function showScreen(screenId) {
  const isAuthenticated = window.ApexAuth?.isAuthenticated() || false;
  const targetScreen = PROTECTED_SCREENS.has(screenId) && !isAuthenticated ? "login" : screenId;
  const safeScreenId = targetScreen === "login" && isAuthenticated ? "dashboard" : targetScreen;

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === safeScreenId);
  });

  navButtons.forEach((button) => {
    const isCurrent = button.dataset.screen === safeScreenId;
    button.classList.toggle("active", isCurrent);
    if (button.closest(".nav")) {
      button.setAttribute("aria-current", isCurrent ? "page" : "false");
    }
  });

  window.location.hash = safeScreenId;
  renderPersonalDashboard();
}

function formatBalance(balance, currency) {
  const amount = Number(balance || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency ? `${amount} ${currency}` : amount;
}

function getCurrentAccountType() {
  return accountType.textContent === "Real" ? "Real" : "Demo";
}

async function startBackendDerivOAuth() {
  const response = await fetch(DERIV_OAUTH_START_URL, { cache: "no-store" });
  const payload = await response.json();
  if (!response.ok || !payload.authorizationUrl) {
    throw new Error(payload.message || "Unable to start Deriv OAuth.");
  }
  return payload.authorizationUrl;
}

async function loadDerivConnectionStatus() {
  const response = await fetch(DERIV_CONNECTION_STATUS_URL, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

async function loadDerivAccounts() {
  const response = await fetch(DERIV_ACCOUNTS_URL, { cache: "no-store" });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || "Unable to load linked Deriv accounts.");
  }
  return payload;
}

async function requestDerivOtpWebSocket(accountId) {
  const response = await fetch(`${DERIV_OTP_BASE_URL}/${encodeURIComponent(accountId)}/otp`, {
    method: "POST",
  });
  const payload = await response.json();
  if (!response.ok || !payload.wsUrl) {
    throw new Error(payload.message || "Unable to prepare Deriv Demo WebSocket.");
  }
  return payload;
}

function collectUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, "");
  const hashParts = hash.split("?");
  const hashQuery = hashParts.length > 1 ? hashParts.slice(1).join("?") : hash;

  if (hashQuery.includes("=")) {
    new URLSearchParams(hashQuery.replace(/^&|\?/, "")).forEach((value, key) => {
      params.set(key, value);
    });
  }

  return params;
}

function getOAuthRedirectResult() {
  const params = collectUrlParams();
  if (params.get("type") === "recovery" || params.get("deriv_oauth")) {
    return null;
  }

  const error = params.get("error") || params.get("error_description");
  if (error) {
    return {
      error: error === "access_denied" ? "OAuth cancelled." : error,
    };
  }

  const hasOAuthShape = Array.from(params.keys()).some((key) => (
    key.startsWith("token") ||
    key.startsWith("acct") ||
    key.startsWith("cur") ||
    false
  ));

  if (hasOAuthShape) {
    return {
      error: "Legacy frontend OAuth callback is no longer supported. Link Deriv through the secure backend flow.",
    };
  }
  return null;
}

function getBackendDerivCallbackResult() {
  const params = collectUrlParams();
  const status = params.get("deriv_oauth");
  if (!status) {
    return null;
  }
  return {
    linked: status === "linked",
    failed: status === "failed",
    reason: params.get("reason") || "",
  };
}

function clearOAuthParamsFromUrl(screenId = "dashboard") {
  window.history.replaceState({}, document.title, `${window.location.pathname}#${screenId}`);
}

function renderDerivAccounts(payload = {}) {
  const accounts = Array.isArray(payload.accounts) ? payload.accounts : [];
  derivAccountPanel?.classList.toggle("hidden", false);
  derivAccountSelect.innerHTML = "";

  if (!accounts.length) {
    derivOauthStatus.textContent = "Deriv linked, but no accounts were returned yet.";
    derivDemoOtpButton.disabled = true;
    return;
  }

  accounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = `${account.label || account.id}${account.isDemo ? " - Demo" : " - Real disabled"}`;
    option.disabled = Boolean(account.disabled);
    option.selected = account.id === payload.selectedAccountId;
    derivAccountSelect.append(option);
  });

  const selectedDemo = accounts.find((account) => account.id === payload.selectedAccountId) || accounts.find((account) => account.isDemo && !account.disabled);
  if (selectedDemo) {
    derivAccountSelect.value = selectedDemo.id;
  }

  derivDemoOtpButton.disabled = !payload.demoAccountAvailable;
  derivOauthStatus.textContent = payload.demoAccountAvailable
    ? "OAuth linked. Demo options account pending."
    : "OAuth linked, but no Demo options account is available.";
  setBrokerGatewayStatus(payload.demoAccountAvailable ? "OAuth pending" : "Offline", { source: "oauth" });
}

async function refreshDerivOAuthPanel() {
  try {
    const status = await loadDerivConnectionStatus();
    if (!status?.oauthLinked) {
      derivAccountPanel?.classList.toggle("hidden", true);
      return;
    }

    derivAccountPanel?.classList.toggle("hidden", false);
    derivOauthStatus.textContent = status.demoAccountAvailable ? "OAuth linked. Demo pending." : "OAuth linked. Loading accounts...";
    const accounts = await loadDerivAccounts();
    renderDerivAccounts(accounts);
  } catch (error) {
    derivAccountPanel?.classList.toggle("hidden", false);
    derivOauthStatus.textContent = error.message;
    setBrokerGatewayStatus("OAuth pending", { source: "oauth" });
  }
}

function getRiskSettingsFromForm() {
  return {
    riskPerTradePercent: Number(riskPerTradeInput.value),
    dailyProfitTarget: Number(dailyProfitTargetInput.value),
    dailyLossLimit: Number(dailyLossLimitInput.value),
    maxConsecutiveLosses: Number(maxConsecutiveLossesInput.value),
    maxTradesPerDay: Number(maxTradesDayInput.value),
    maxOpenTrades: Number(maxOpenTradesInput.value),
    executionMode: executionModeInput.value,
  };
}

function renderRiskStatus() {
  const state = riskManager.getState();
  const settings = riskManager.getSettings();
  const stake = riskManager.calculateStake(currentBalanceValue);
  const status = riskManager.getRiskStatus(currentBalanceValue);
  const isRealBlocked = getCurrentAccountType() === "Real" && settings.executionMode !== "real-enabled";
  const displayStatus = isRealBlocked ? "Blocked" : status;

  riskBalance.textContent = formatBalance(currentBalanceValue, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  riskStake.textContent = formatBalance(stake, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  riskTradesToday.textContent = state.tradesToday;
  riskConsecutiveLosses.textContent = state.consecutiveLosses;
  riskDailyPl.textContent = formatBalance(state.dailyProfitLoss, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  riskCurrentStatus.textContent = displayStatus;
  riskCurrentStatus.dataset.status = displayStatus.toLowerCase();
  realAccountWarning.classList.toggle("hidden", !isRealBlocked);
  renderPersonalDashboard();
}

function syncRiskForm() {
  const settings = riskManager.getSettings();
  riskPerTradeInput.value = settings.riskPerTradePercent;
  dailyProfitTargetInput.value = settings.dailyProfitTarget;
  dailyLossLimitInput.value = settings.dailyLossLimit;
  maxConsecutiveLossesInput.value = settings.maxConsecutiveLosses;
  maxTradesDayInput.value = settings.maxTradesPerDay;
  maxOpenTradesInput.value = settings.maxOpenTrades;
  executionModeInput.value = settings.executionMode;
}

function getEnabledMarketSymbols() {
  const subscribed = Array.from(uiSubscribedSymbols);
  if (subscribed.length) {
    return subscribed;
  }
  return volatilitySymbols.map((symbol) => symbol.symbol);
}

function saveScannerSettingsToCloud() {
  window.ApexSettings?.saveScannerSettings({
    scannerSensitivity: scannerSensitivityInput?.value || window.ApexSettings.getSettings().scanner_sensitivity,
    enabledMarkets: getEnabledMarketSymbols(),
  });
}

function applyCloudSettings(settings) {
  if (!settings) {
    return;
  }

  applyTheme(settings.theme || "light", { persist: false });
  if (scannerSensitivityInput) {
    scannerSensitivityInput.value = settings.scanner_sensitivity || "balanced";
  }
  riskManager.updateSettings({
    ...window.ApexSettings.getRiskSettingsForApp(),
    executionMode: riskManager.getSettings().executionMode,
  });
  syncRiskForm();
  renderRiskStatus();
}

async function initializeCloudSyncForUser(user) {
  if (!user || !window.ApexSettings) {
    updateCloudSyncStatus({ available: false, status: "offline", message: "Cloud sync unavailable" });
    return;
  }

  if (cloudSyncUserId === user.id) {
    return;
  }

  cloudSyncUserId = user.id;
  const result = await window.ApexSettings.initializeForUser(user);
  applyCloudSettings(result.settings);
  updateCloudSyncStatus(window.ApexSettings.getSyncState());
  hydrateDashboardFromCloudActivity();
  addSimpleActivity("ApexTrend login session active.", {
    eventType: "login",
    userId: user.id,
  });
}

function setStatus(status) {
  connectionStatus.textContent = status;
  connectionStatus.dataset.status = status.toLowerCase();
  connectionDot.classList.toggle("inactive", status !== "Connected");
  connectionDot.classList.toggle("warning", status === "Connecting" || status === "Reconnecting");
  updateBrokerStatus();
  renderPersonalDashboard();
}

function setMessage(message) {
  connectorMessage.textContent = message;
}

function debugDerivConnection(message, detail = {}) {
  console.debug("[ApexTrend Deriv]", message, detail);
}

function startDerivConnectionAttempt(source) {
  derivConnectionAttemptId += 1;
  activeDerivConnection = {
    id: derivConnectionAttemptId,
    source,
    phase: "starting",
    completed: false,
  };
  debugDerivConnection("Connection attempt started", activeDerivConnection);
  return activeDerivConnection.id;
}

function isActiveDerivAttempt(attemptId) {
  return attemptId === activeDerivConnection.id;
}

function updateDerivConnectionPhase(attemptId, phase, message) {
  if (!isActiveDerivAttempt(attemptId)) {
    debugDerivConnection("Ignored stale connection phase", { attemptId, phase, active: activeDerivConnection });
    return false;
  }

  activeDerivConnection.phase = phase;
  const brokerPhaseMap = {
    connecting: "Connecting",
    authorizing: activeDerivConnection.source === "oauth" ? "OAuth pending" : "Connecting",
    authorized: "Authorized",
    "loading-markets": "Loading markets",
    "scanner-active": "Connected",
    failed: "Offline",
  };
  if (brokerPhaseMap[phase]) {
    setBrokerGatewayStatus(brokerPhaseMap[phase], { source: activeDerivConnection.source });
  }
  if (message) {
    setStatus(message);
    setMessage(message);
  }
  debugDerivConnection("Connection phase updated", { attemptId, phase, message });
  return true;
}

function setScannerStatus(message) {
  scannerStatus.textContent = message;
  renderPersonalDashboard();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[character]));
}

function getAccountType(account) {
  if (!account) {
    return "-";
  }
  if (account.is_virtual || String(account.loginid || "").startsWith("VRTC")) {
    return "Demo";
  }
  return "Real";
}

function updateAccount(account) {
  accountType.textContent = getAccountType(account);
  accountType.dataset.status = accountType.textContent.toLowerCase();
  loginId.textContent = account?.loginid || "-";
  accountCurrency.textContent = account?.currency || "-";
  renderRiskStatus();
  renderPersonalDashboard();
}

function updateBalance(balance) {
  accountCurrency.textContent = balance?.currency || accountCurrency.textContent || "-";
  currentBalanceValue = Number(balance?.balance || 0);
  accountBalance.textContent = formatBalance(balance?.balance, balance?.currency);
  if (!activeBotPanel.classList.contains("hidden")) {
    activeBotBalance.textContent = accountBalance.textContent;
  }
  renderRiskStatus();
  renderPersonalDashboard();
}

function renderVolatilityList() {
  if (!volatilitySymbols.length) {
    volatilityList.innerHTML = `<p class="empty-state">No volatility indices loaded yet.</p>`;
    return;
  }

  volatilityList.innerHTML = volatilitySymbols.map((symbol) => {
    const price = latestTicks.get(symbol.symbol);
    const isSubscribed = uiSubscribedSymbols.has(symbol.symbol);
    const priceLabel = price === undefined ? "Waiting" : price;
    const actionLabel = isSubscribed ? "Live" : "Subscribe";
    const actionClass = isSubscribed ? "market-action active" : "market-action";

    return `
      <article class="market-row">
        <div>
          <strong>${escapeHtml(symbol.display_name)}</strong>
          <span>${escapeHtml(symbol.symbol)}</span>
        </div>
        <div class="price-cell">
          <span>Latest price</span>
          <strong id="price-${escapeHtml(symbol.symbol)}">${escapeHtml(priceLabel)}</strong>
        </div>
        <button class="${actionClass}" type="button" data-subscribe-symbol="${escapeHtml(symbol.symbol)}">
          ${actionLabel}
        </button>
      </article>
    `;
  }).join("");
  renderPersonalDashboard();
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  }
  if (hour < 18) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

function getUserDisplayName() {
  const user = window.ApexAuth?.getAuthState?.().user;
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || "";
  if (fullName) {
    return fullName.split(" ")[0];
  }
  return (user?.email || window.ApexAuth?.getUserEmail?.() || "Trader").split("@")[0];
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}

function getTimelineType(message, metadata = {}) {
  const eventType = metadata.eventType || "";
  const lower = String(message).toLowerCase();
  if (eventType.includes("risk") || lower.includes("risk")) {
    return "risk";
  }
  if (eventType.includes("scanner") || lower.includes("scanner")) {
    return "watch";
  }
  if (lower.includes("deploy") || lower.includes("approved") || lower.includes("ready")) {
    return "deploy";
  }
  if (lower.includes("contract") || lower.includes("won") || lower.includes("lost")) {
    return "contract";
  }
  if (lower.includes("stop") || lower.includes("cancel") || lower.includes("failed") || lower.includes("blocked") || lower.includes("lost")) {
    return "stop";
  }
  return "safe";
}

function getTimelineIcon(type) {
  const icons = {
    deploy: "D",
    contract: "C",
    risk: "R",
    watch: "S",
    stop: "!",
    error: "!",
    safe: "A",
  };
  return icons[type] || "A";
}

function recordDashboardActivity(message, metadata = {}) {
  const type = getTimelineType(message, metadata);
  dashboardActivityEvents.unshift({
    time: new Date(),
    message,
    metadata,
    type,
  });
  dashboardActivityEvents = dashboardActivityEvents.slice(0, 50);
  renderPersonalDashboard();
}

function resetDashboardStats() {
  dashboardStats = {
    signalsToday: 0,
    deploymentsApproved: 0,
    botApprovals: 0,
    botRejections: 0,
    contractsCompleted: 0,
    wins: 0,
    losses: 0,
    confidenceTotal: 0,
    responseTotalMs: 0,
    responseSamples: 0,
  };
}

function incrementDashboardStats(message, metadata = {}) {
  const eventType = metadata.eventType || "";
  const lower = String(message).toLowerCase();
  if (eventType === "scanner_event") {
    dashboardStats.signalsToday += 1;
    if (Number(metadata.confidence)) {
      dashboardStats.confidenceTotal += Number(metadata.confidence);
    }
    if (lastScanAt) {
      dashboardStats.responseTotalMs += Math.max(0, Date.now() - lastScanAt.getTime());
      dashboardStats.responseSamples += 1;
    }
  }
  if (lower.includes("ready for execution") || lower.includes("deployment approved")) {
    dashboardStats.deploymentsApproved += 1;
  }
  if (lower.includes("bot approved setup")) {
    dashboardStats.botApprovals += 1;
  }
  if (lower.includes("bot rejected setup")) {
    dashboardStats.botRejections += 1;
  }
  if (lower.includes("contract won")) {
    dashboardStats.contractsCompleted += 1;
    dashboardStats.wins += 1;
  }
  if (lower.includes("contract lost")) {
    dashboardStats.contractsCompleted += 1;
    dashboardStats.losses += 1;
  }
}

function renderDashboardTimeline() {
  if (!dashboardTimeline) {
    return;
  }
  if (!dashboardActivityEvents.length) {
    dashboardTimeline.innerHTML = `<li class="timeline-empty">No activity yet.</li>`;
    return;
  }

  dashboardTimeline.innerHTML = dashboardActivityEvents.slice(0, 10).map((event) => `
    <li class="timeline-${escapeHtml(event.type)}">
      <span class="timeline-icon">${escapeHtml(getTimelineIcon(event.type))}</span>
      <span class="timeline-copy">
        <time>${escapeHtml(formatTime(event.time))}</time>
        <span>${escapeHtml(event.message)}</span>
      </span>
    </li>
  `).join("");
}

function renderPersonalDashboard() {
  if (!dashboardVersion) {
    return;
  }
  const settings = riskManager.getSettings();
  const riskState = riskManager.getState();
  const activeStrategy = deploymentManager.getActiveStrategy();
  const activeExecution = executionManager.getActiveExecution();
  const brokerGatewayStatus = getBrokerGatewayStatus();
  const activeBotDisplay = dashboardActiveBotSample || {
    bot: activeStrategy?.botType || "None",
    market: activeStrategy?.market || "-",
    confidence: activeStrategy?.confidence ? `${activeStrategy.confidence}%` : "-",
    state: activeExecution?.status || activeStrategy?.status || "-",
    barrier: activeExecution?.barrier || activeStrategy?.contractParameters?.barrier || "-",
    duration: activeExecution?.duration ? `${activeExecution.duration} minutes` : (activeStrategy?.duration ? `${activeStrategy.duration} minutes` : "-"),
    stake: activeExecution?.stake ? formatBalance(activeExecution.stake, activeExecution.currency) : (activeStrategy?.stake ? formatBalance(activeStrategy.stake, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent) : "-"),
  };
  const scannerActive = scannerStatus.textContent.includes("Active") || scannerStatus.textContent.includes("Scanning");
  const averageConfidence = dashboardStats.signalsToday
    ? Math.round(dashboardStats.confidenceTotal / dashboardStats.signalsToday)
    : 0;
  const averageResponse = dashboardStats.responseSamples
    ? Math.round(dashboardStats.responseTotalMs / dashboardStats.responseSamples)
    : 0;

  welcomeGreeting.textContent = getGreeting();
  welcomeName.textContent = getUserDisplayName();
  dashboardVersion.textContent = APEXTREND_VERSION;
  dashboardAccount.textContent = getCurrentAccountType();
  dashboardBackendStatus.textContent = backendStatusLabel.textContent;
  dashboardCloudStatus.textContent = syncStatusLabel.textContent;
  dashboardBrokerStatus.textContent = brokerGatewayStatus.brokerName || "Deriv";
  dashboardBrokerConnection.textContent = brokerGatewayStatus.connected ? brokerGatewayStatus.status || brokerGatewayStatus.mode || "Connected" : brokerGatewayStatus.status || "Offline";

  dashScannerState.textContent = scannerActive ? "Active" : "Idle";
  dashMarketsScanned.textContent = volatilitySymbols.length;
  dashMarketsConnected.textContent = uiSubscribedSymbols.size;
  dashScannerUptime.textContent = scannerStartedAt ? formatDuration(Date.now() - scannerStartedAt.getTime()) : "0m";
  dashLastScan.textContent = lastScanAt ? formatTime(lastScanAt) : "-";

  dashSignalsToday.textContent = dashboardStats.signalsToday;
  dashDeploymentsApproved.textContent = dashboardStats.deploymentsApproved;
  dashBotApprovals.textContent = dashboardStats.botApprovals;
  dashBotRejections.textContent = dashboardStats.botRejections;
  dashContractsCompleted.textContent = dashboardStats.contractsCompleted;
  dashWinLoss.textContent = `${dashboardStats.wins} / ${dashboardStats.losses}`;

  dashActiveBot.textContent = activeBotDisplay.bot;
  dashActiveMarket.textContent = activeBotDisplay.market;
  dashActiveConfidence.textContent = activeBotDisplay.confidence;
  dashContractState.textContent = activeBotDisplay.state;
  dashActiveBarrier.textContent = activeBotDisplay.barrier;
  dashActiveDuration.textContent = activeBotDisplay.duration;
  dashActiveStake.textContent = activeBotDisplay.stake;

  dashRiskPercent.textContent = `${settings.riskPerTradePercent}%`;
  dashDailyTrades.textContent = riskState.tradesToday;
  dashOpenContracts.textContent = riskState.openTrades;
  dashProfitTarget.textContent = formatBalance(settings.dailyProfitTarget, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  dashLossLimit.textContent = formatBalance(settings.dailyLossLimit, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  dashRiskStatus.textContent = riskCurrentStatus.textContent;

  dashMarketsMonitored.textContent = uiSubscribedSymbols.size || volatilitySymbols.length;
  dashAnalyticsSignals.textContent = dashboardStats.signalsToday;
  dashAverageConfidence.textContent = `${averageConfidence}%`;
  dashAverageResponse.textContent = `${averageResponse}ms`;
  dashScannerAvailability.textContent = scannerActive ? "Available" : "Idle";
  dashboardEmptyState.classList.toggle("hidden", dashboardStats.signalsToday > 0);

  renderDashboardTimeline();
}

function setDashboardActiveBotSample(enabled) {
  dashboardActiveBotSample = enabled ? {
    bot: "Uptrend Touch Bot",
    market: "Volatility 75 (1s)",
    confidence: "94%",
    state: "READY FOR EXECUTION",
    barrier: "+0.16",
    duration: "5 minutes",
    stake: formatBalance(riskManager.calculateStake(currentBalanceValue), accountCurrency.textContent === "-" ? "" : accountCurrency.textContent),
  } : null;

  addSimpleActivity(enabled
    ? "Dashboard active bot sample shown. No execution started."
    : "Dashboard active bot sample cleared.", {
      eventType: "dashboard_test",
      nonExecuting: true,
    });
  renderPersonalDashboard();
}

async function hydrateDashboardFromCloudActivity() {
  if (!window.ApexSettings?.getRecentActivityLogs) {
    return;
  }

  const logs = await window.ApexSettings.getRecentActivityLogs(50);
  if (!logs.length) {
    renderPersonalDashboard();
    return;
  }

  dashboardActivityEvents = logs.map((log) => {
    const metadata = {
      ...(log.metadata || {}),
      eventType: log.event_type,
    };
    return {
      time: new Date(log.created_at),
      message: log.message,
      metadata,
      type: getTimelineType(log.message, metadata),
    };
  });

  resetDashboardStats();
  dashboardActivityEvents.forEach((event) => {
    incrementDashboardStats(event.message, event.metadata);
  });
  renderPersonalDashboard();
}

function addActivityEvent(event) {
  const item = document.createElement("li");
  const time = document.createElement("time");
  const text = document.createElement("span");

  time.textContent = formatTime(event.time);
  text.textContent = `${event.market} | ${event.trend} | ${event.confidence}% | ${event.recommendation}`;
  item.append(time, text);
  activityList.prepend(item);

  while (activityList.children.length > 12) {
    activityList.lastElementChild.remove();
  }

  incrementDashboardStats(text.textContent, {
    eventType: "scanner_event",
    market: event.market,
    trend: event.trend,
    confidence: event.confidence,
    recommendation: event.recommendation,
    symbol: event.analysis?.symbol,
  });
  recordDashboardActivity(text.textContent, {
    eventType: "scanner_event",
    market: event.market,
    confidence: event.confidence,
  });

  window.ApexSettings?.logActivity({
    eventType: "scanner_event",
    message: text.textContent,
    metadata: {
      market: event.market,
      trend: event.trend,
      confidence: event.confidence,
      recommendation: event.recommendation,
      symbol: event.analysis?.symbol,
    },
  });
}

function addSimpleActivity(message, metadata = {}) {
  const item = document.createElement("li");
  const time = document.createElement("time");
  const text = document.createElement("span");

  time.textContent = formatTime(new Date());
  text.textContent = message;
  item.append(time, text);
  activityList.prepend(item);

  while (activityList.children.length > 12) {
    activityList.lastElementChild.remove();
  }

  incrementDashboardStats(message, metadata);
  recordDashboardActivity(message, metadata);

  window.ApexSettings?.logActivity({
    eventType: metadata.eventType || "activity",
    message,
    metadata,
  });
}

function getContractParametersActivityMessage(strategy, parameters = {}) {
  const durationLabel = parameters.durationUnit === "m" ? "minutes" : (parameters.durationUnit || "units");
  const currency = parameters.currency || (accountCurrency.textContent === "-" ? "" : accountCurrency.textContent);
  const stake = formatBalance(parameters.amount || strategy.stake || 0, currency);
  return `${strategy.market} | Contract parameters prepared: ${parameters.botName || strategy.botType}; ${parameters.barrierDirection || strategy.barrierDirection} barrier ${parameters.barrier || "-"}; duration ${parameters.duration || strategy.duration || "-"} ${durationLabel}; stake ${stake}.`;
}

function getRecommendationLabel(recommendation) {
  return recommendation.replace("DEPLOY", "Deploy");
}

function isDeployRecommendation(recommendation) {
  return recommendation === "DEPLOY UPTREND" || recommendation === "DEPLOY DOWNTREND" || recommendation === "CONSOLIDATION BOUNCE";
}

function getRecommendedBot(recommendation) {
  if (recommendation === "DEPLOY UPTREND") {
    return "Uptrend Touch Bot";
  }
  if (recommendation === "DEPLOY DOWNTREND") {
    return "Downtrend Touch Bot";
  }
  if (recommendation === "CONSOLIDATION BOUNCE") {
    return "Consolidation Bounce Bot";
  }
  return "-";
}

function renderActiveStrategy(strategy) {
  if (!strategy) {
    activeBotPanel.classList.add("hidden");
    renderPersonalDashboard();
    return;
  }

  activeBotPanel.classList.remove("hidden");
  activeBotMarket.textContent = strategy.market;
  activeBotType.textContent = strategy.botType;
  activeBotStatus.textContent = strategy.status;
  activeBotStatus.dataset.status = strategy.status.toLowerCase().replace(/\s+/g, "-");
  activeBotBalance.textContent = accountBalance.textContent;
  activeBotOpenTrades.textContent = "0";
  activeBotConfidence.textContent = `${strategy.confidence}%`;
  activeBotDirection.textContent = strategy.direction || "-";
  activeBotVerification.textContent = strategy.botVerificationStatus || "Pending";
  activeBotVerification.dataset.status = String(strategy.botVerificationStatus || "pending").toLowerCase();
  activeBotBarrierDirection.textContent = strategy.barrierDirection || "-";
  activeBotDuration.textContent = strategy.duration ? `${strategy.duration} minutes` : "-";
  activeBotStake.textContent = strategy.stake ? formatBalance(strategy.stake, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent) : "-";
  renderPersonalDashboard();
}

function renderContract(execution) {
  if (!execution) {
    contractPanel.classList.add("hidden");
    renderPersonalDashboard();
    return;
  }

  contractPanel.classList.remove("hidden");
  contractMarket.textContent = execution.market;
  contractStrategy.textContent = execution.strategy;
  contractBarrier.textContent = execution.barrier;
  contractStake.textContent = formatBalance(execution.stake, execution.currency);
  contractDuration.textContent = `${execution.duration} ${execution.durationUnit === "m" ? "minutes" : execution.durationUnit}`;
  contractStatus.textContent = execution.status;
  contractStatus.dataset.status = execution.status.toLowerCase().replace(/\s+/g, "-");
  contractTimeRemaining.textContent = execution.timeRemaining || "-";
  contractProfitLoss.textContent = formatBalance(execution.profitLoss || 0, execution.currency);
  renderPersonalDashboard();
}

function updateDeploymentStatus(message) {
  deploymentStatus.textContent = message;
  renderPersonalDashboard();
}

function resetDeploymentManager() {
  deploymentManager = new window.ApexDeployment.DeploymentManager({
    deploymentConfidence: window.ApexScanner.DEFAULT_SCANNER_CONFIG.highConfidence,
  });
  latestDeploySignal = null;
  renderActiveStrategy(null);
  updateDeploymentStatus("No bot armed.");
}

function logRiskBlock(reason) {
  addSimpleActivity(`Deployment blocked by risk rule: ${reason}`);
  if (reason === "Daily loss limit reached.") {
    addSimpleActivity("Daily loss limit reached.");
  }
  if (reason === "Maximum trades per day reached.") {
    addSimpleActivity("Max trades reached.");
  }
  if (reason === "Real trading is disabled in this version.") {
    addSimpleActivity("Real account blocked by risk manager.");
  }
}

function showOpportunity(event) {
  latestDeploySignal = isDeployRecommendation(event.recommendation)
    ? {
        symbol: event.analysis.symbol,
        market: event.market,
        recommendation: event.recommendation,
        confidence: event.confidence,
        trendStrength: event.analysis.trendStrength,
        momentumStrength: event.analysis.momentumStrength,
        botKey: event.analysis.botKey,
        bounceDirection: event.analysis.bounceDirection,
      }
    : null;

  opportunityMarket.textContent = event.market;
  opportunityRecommendation.textContent = getRecommendationLabel(event.recommendation);
  opportunityConfidence.textContent = `${event.confidence}%`;
  opportunityTrendStrength.textContent = event.analysis.trendStrength;
  opportunityMomentum.textContent = event.analysis.momentumStrength;
  opportunityBot.textContent = getRecommendedBot(event.recommendation);
  deploySignalButton.classList.toggle("hidden", !latestDeploySignal);
  opportunityCard.classList.remove("hidden");
}

function getMockSignalTemplate(recommendation) {
  const activeStrategy = deploymentManager.getActiveStrategy();
  const activeMarket = activeStrategy && activeStrategy.status !== "Stopped" && activeStrategy.status !== "Cancelled"
    ? {
        symbol: activeStrategy.symbol,
        market: activeStrategy.market,
      }
    : null;
  const fallbackMarket = marketNames.size
    ? {
        symbol: Array.from(marketNames.keys())[0],
        market: Array.from(marketNames.values())[0],
      }
    : {
        symbol: "R_100",
        market: "Volatility 100",
      };
  const target = recommendation === "STOP" && activeMarket ? activeMarket : fallbackMarket;

  const templates = {
    "DEPLOY UPTREND": {
      trendDirection: "up",
      state: "Strong Uptrend",
      trendStrength: 91,
      momentumStrength: 88,
      trendAge: "Mature",
      dummyImpulseRisk: "LOW",
      extremePointRisk: "LOW",
      confidence: 94,
    },
    "DEPLOY DOWNTREND": {
      trendDirection: "down",
      state: "Strong Downtrend",
      trendStrength: 89,
      momentumStrength: 86,
      trendAge: "Established",
      dummyImpulseRisk: "LOW",
      extremePointRisk: "LOW",
      confidence: 92,
    },
    WATCH: {
      trendDirection: "up",
      state: "Strong Uptrend",
      trendStrength: 72,
      momentumStrength: 68,
      trendAge: "Developing",
      dummyImpulseRisk: "LOW",
      extremePointRisk: "MEDIUM",
      confidence: 74,
    },
    STOP: {
      trendDirection: "up",
      state: "Strong Uptrend",
      trendStrength: 79,
      momentumStrength: 71,
      trendAge: "Mature",
      dummyImpulseRisk: "HIGH",
      extremePointRisk: "HIGH",
      confidence: 81,
    },
    WAIT: {
      trendDirection: "flat",
      state: "Weak Trend",
      trendStrength: 34,
      momentumStrength: 28,
      trendAge: "New",
      dummyImpulseRisk: "MEDIUM",
      extremePointRisk: "MEDIUM",
      confidence: 38,
    },
    "CONSOLIDATION BOUNCE": {
      trendDirection: "up",
      bounceDirection: "up",
      state: "Consolidation",
      trendStrength: 22,
      momentumStrength: 62,
      trendAge: "New",
      dummyImpulseRisk: "LOW",
      extremePointRisk: "LOW",
      confidence: 86,
      botKey: "CONSOLIDATION_BOUNCE",
    },
  };

  return {
    ...templates[recommendation],
    symbol: target.symbol,
    market: target.market,
    recommendation,
    ready: true,
    shouldAlert: recommendation !== "WAIT",
  };
}

function getBotTestTemplate(kind) {
  const isReject = kind.endsWith("reject");
  if (kind.startsWith("uptrend")) {
    return {
      ...getMockSignalTemplate("DEPLOY UPTREND"),
      dummyImpulseRisk: isReject ? "HIGH" : "LOW",
      extremePointRisk: isReject ? "HIGH" : "LOW",
      confidence: isReject ? 90 : 94,
    };
  }
  if (kind.startsWith("downtrend")) {
    return {
      ...getMockSignalTemplate("DEPLOY DOWNTREND"),
      dummyImpulseRisk: isReject ? "HIGH" : "LOW",
      extremePointRisk: isReject ? "HIGH" : "LOW",
      confidence: isReject ? 90 : 92,
    };
  }
  return {
    ...getMockSignalTemplate("CONSOLIDATION BOUNCE"),
    momentumStrength: isReject ? 28 : 62,
    dummyImpulseRisk: isReject ? "HIGH" : "LOW",
    confidence: isReject ? 84 : 88,
  };
}

function createValidationRecordFromAnalysis(analysis, market) {
  const rules = scannerEngine.getRuleSummary(analysis);
  return {
    timestamp: new Date(),
    symbol: analysis.symbol,
    market,
    trendClassification: analysis.state,
    trendStrength: analysis.trendStrength,
    momentumStrength: analysis.momentumStrength,
    trendAge: analysis.trendAge,
    dummyImpulseRisk: analysis.dummyImpulseRisk,
    extremePointRisk: analysis.extremePointRisk,
    confidence: analysis.confidence,
    recommendation: analysis.recommendation,
    category: scannerEngine.getValidationCategory(analysis.recommendation),
    rulesSatisfied: rules.satisfied,
    preventedDeployment: rules.preventedDeployment,
  };
}

function triggerMockSignal(recommendation) {
  const analysis = getMockSignalTemplate(recommendation);
  triggerAnalysisSignal(analysis, recommendation === "WAIT" ? "Mock rejected signal recorded in validation log." : "Mock opportunity generated for development testing.");
}

function triggerBotTest(kind) {
  const analysis = getBotTestTemplate(kind);
  triggerAnalysisSignal(analysis, `Mock ${kind.replace("-", " ")} generated for bot testing.`);
}

function triggerAnalysisSignal(analysis, scannerMessage) {
  latestTicks.set(analysis.symbol, latestTicks.get(analysis.symbol) || 1000);
  latestAnalyses.set(analysis.symbol, analysis);
  addValidationRecord(createValidationRecordFromAnalysis(analysis, analysis.market));
  handleActiveStrategySignal(analysis.symbol, analysis);

  if (!analysis.shouldAlert) {
    latestDeploySignal = null;
    opportunityCard.classList.add("hidden");
    setScannerStatus(scannerMessage);
    addSimpleActivity(`${analysis.market} | Mock rejected signal recorded for calibration.`);
    showScreen("validation");
    return;
  }

  const event = {
    time: new Date(),
    market: analysis.market,
    trend: analysis.state,
    confidence: analysis.confidence,
    recommendation: analysis.recommendation,
    analysis,
  };

  showOpportunity(event);
  addActivityEvent(event);
  setScannerStatus(scannerMessage);
  showScreen("dashboard");
}

function renderRuleList(rules, fallback) {
  if (!rules.length) {
    return `<li>${escapeHtml(fallback)}</li>`;
  }
  return rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
}

function renderValidationRecords() {
  const filteredRecords = activeValidationFilter === "all"
    ? validationRecords
    : validationRecords.filter((record) => record.category === activeValidationFilter);

  if (!filteredRecords.length) {
    validationList.innerHTML = `<p class="empty-state">No ${activeValidationFilter === "all" ? "" : activeValidationFilter} scanner validation records yet.</p>`;
    return;
  }

  validationList.innerHTML = filteredRecords.map((record) => `
    <article class="validation-card ${record.category}">
      <div class="validation-head">
        <div>
          <strong>${escapeHtml(record.market)}</strong>
          <span>${escapeHtml(record.timestamp.toLocaleString())}</span>
        </div>
        <div class="validation-badge">${escapeHtml(getRecommendationLabel(record.recommendation))}</div>
      </div>

      <div class="validation-scores">
        <div><span>Trend</span><strong>${escapeHtml(record.trendClassification)}</strong></div>
        <div><span>Trend strength</span><strong>${record.trendStrength}</strong></div>
        <div><span>Momentum</span><strong>${record.momentumStrength}</strong></div>
        <div><span>Trend age</span><strong>${escapeHtml(record.trendAge)}</strong></div>
        <div><span>Dummy impulse</span><strong>${escapeHtml(record.dummyImpulseRisk)}</strong></div>
        <div><span>Extreme risk</span><strong>${escapeHtml(record.extremePointRisk)}</strong></div>
        <div><span>Confidence</span><strong>${record.confidence}%</strong></div>
      </div>

      <div class="validation-rules">
        <div>
          <span>Rules satisfied</span>
          <ul>${renderRuleList(record.rulesSatisfied, "No deployment rules satisfied yet")}</ul>
        </div>
        <div>
          <span>Rules preventing deployment</span>
          <ul>${renderRuleList(record.preventedDeployment, "No blockers")}</ul>
        </div>
      </div>
    </article>
  `).join("");
}

function addValidationRecord(record) {
  validationRecords.unshift(record);
  validationRecords = validationRecords.slice(0, 50);
  renderValidationRecords();
}

function scanTick(symbol, price, epoch) {
  lastScanAt = new Date();
  const analysis = scannerEngine.addTick(symbol, price, epoch);
  if (!analysis.ready) {
    setScannerStatus("Scanning markets...");
    return;
  }

  latestAnalyses.set(symbol, analysis);

  const validationRecord = scannerEngine.getValidationRecord(analysis, marketNames.get(symbol));
  if (validationRecord) {
    addValidationRecord(validationRecord);
  }

  handleActiveStrategySignal(symbol, analysis);

  const scannerEvent = scannerEngine.getMeaningfulEvent(analysis, marketNames.get(symbol));
  if (!scannerEvent) {
    setScannerStatus("Scanning markets...");
    return;
  }

  showOpportunity(scannerEvent);
  addActivityEvent(scannerEvent);
  setScannerStatus("Opportunity detected.");
}

function handleActiveStrategySignal(symbol, analysis) {
  const activeStrategy = deploymentManager.getActiveStrategy();
  if (
    !activeStrategy ||
    activeStrategy.symbol !== symbol ||
    activeStrategy.status === "Stopped" ||
    activeStrategy.status === "Cancelled"
  ) {
    return;
  }

  if (analysis.recommendation === "STOP") {
    if (activeStrategy.status === "Exit Recommended") {
      return;
    }
    activeStrategy.status = "Exit Recommended";
    updateDeploymentStatus("Exit recommended. Trend quality weakening.");
    renderActiveStrategy(activeStrategy);
    addSimpleActivity(`${activeStrategy.market} | Exit recommended. Trend quality weakening.`);
  }
}

function updateTick(symbol, price) {
  latestTicks.set(symbol, price);
  const priceElement = document.getElementById(`price-${symbol}`);
  if (priceElement) {
    priceElement.textContent = price;
  }
  renderPersonalDashboard();
}

async function loadVolatilitySymbols() {
  setMessage("Fetching active symbols from Deriv...");
  setBrokerGatewayStatus("Loading markets");
  const symbols = await brokerGetSymbols();
  debugDerivConnection("Active symbols loaded", { count: symbols.length });
  volatilitySymbols = window.ApexDeriv.filterVolatilityIndices(symbols);
  debugDerivConnection("Volatility indices filtered", { count: volatilitySymbols.length });
  marketNames = new Map(volatilitySymbols.map((symbol) => [symbol.symbol, symbol.display_name]));
  renderVolatilityList();
  setMessage(`${volatilitySymbols.length} supported Volatility Indices loaded. Scanner will analyse each market independently.`);
  saveScannerSettingsToCloud();
  return volatilitySymbols;
}

async function subscribeToSymbol(symbol, options = {}) {
  uiSubscribedSymbols.add(symbol);
  renderVolatilityList();
  setBrokerGatewayStatus("Subscribing");
  await brokerSubscribeTicks(symbol);
  if (!options.silent) {
    setMessage(`Subscribed to live ticks for ${symbol}.`);
    saveScannerSettingsToCloud();
  }
}

async function subscribeToAllSymbols(options = {}) {
  if (!volatilitySymbols.length) {
    setMessage("Load Volatility Indices before subscribing.");
    debugDerivConnection("Tick subscriptions blocked: no volatility indices loaded");
    if (options.requireSymbols) {
      throw new Error("No supported Volatility Indices loaded. Tick subscriptions were not started.");
    }
    return false;
  }

  setMessage("Subscribing to live ticks...");
  debugDerivConnection("Tick subscriptions started", { count: volatilitySymbols.length });
  for (const symbol of volatilitySymbols) {
    if (!uiSubscribedSymbols.has(symbol.symbol)) {
      await subscribeToSymbol(symbol.symbol, { silent: true });
    }
  }
  setMessage("Scanner subscriptions are active for all supported Volatility Indices.");
  setBrokerGatewayStatus("Connected");
  scannerStartedAt = scannerStartedAt || new Date();
  setScannerStatus("Scanning markets...");
  saveScannerSettingsToCloud();
  return true;
}

function getMarketDataForStrategy(strategy) {
  return {
    symbol: strategy.symbol,
    market: strategy.market,
    currentPrice: latestTicks.get(strategy.symbol),
    currency: accountCurrency.textContent === "-" ? "USD" : accountCurrency.textContent,
  };
}

async function executeApprovedStrategy() {
  const strategy = deploymentManager.getActiveStrategy();
  if (!strategy) {
    updateDeploymentStatus("Execution blocked: no active strategy is ready.");
    return;
  }

  executionManager.setBrokerManager(window.ApexBroker.manager);
  const latestAnalysis = latestAnalyses.get(strategy.symbol);
  const finalScannerValidation = deploymentManager.validateBeforeExecution(latestAnalysis);
  renderActiveStrategy(deploymentManager.getActiveStrategy());

  if (!finalScannerValidation.ok) {
    updateDeploymentStatus(finalScannerValidation.reason);
    addSimpleActivity(`${strategy.market} | ${finalScannerValidation.reason}`);
    return;
  }

  const finalRiskValidation = deploymentManager.validateRiskBeforeExecution(riskManager, {
    accountConnected: connectionStatus.textContent === "Connected",
    scannerSignalValid: finalScannerValidation.ok,
    balance: currentBalanceValue,
    accountType: getCurrentAccountType(),
  });
  renderActiveStrategy(deploymentManager.getActiveStrategy());
  renderRiskStatus();

  if (!finalRiskValidation.ok) {
    updateDeploymentStatus(`Execution cancelled: ${finalRiskValidation.reason}`);
    addSimpleActivity(`${strategy.market} | Execution blocked by risk rule: ${finalRiskValidation.reason}`);
    logRiskBlock(finalRiskValidation.reason);
    return;
  }

  const finalBotValidation = deploymentManager.verifyBotSetup(
    latestAnalysis,
    getMarketDataForStrategy(strategy),
    finalRiskValidation.decision,
  );
  renderActiveStrategy(deploymentManager.getActiveStrategy());

  if (!finalBotValidation.ok) {
    updateDeploymentStatus(finalBotValidation.reason);
    addSimpleActivity(`${strategy.market} | Bot rejected setup.`);
    if (finalBotValidation.detail) {
      addSimpleActivity(`${strategy.market} | ${finalBotValidation.detail}`);
    }
    return;
  }

  addSimpleActivity(`${strategy.market} | Bot approved setup.`);
  addSimpleActivity(getContractParametersActivityMessage(strategy, finalBotValidation.parameters));

  const prepared = executionManager.prepareExecution({
    accountConnected: connectionStatus.textContent === "Connected",
    accountType: getCurrentAccountType(),
    latestAnalysis,
    strategy: deploymentManager.getActiveStrategy(),
    riskDecision: finalRiskValidation.decision,
    contractParameters: finalBotValidation.parameters,
    currentPrice: latestTicks.get(strategy.symbol),
    currency: accountCurrency.textContent === "-" ? "USD" : accountCurrency.textContent,
  });

  if (!prepared.ok) {
    updateDeploymentStatus(prepared.reason);
    addSimpleActivity(`${strategy.market} | ${prepared.reason}`);
    return;
  }

  renderContract(prepared.execution);

  try {
    addSimpleActivity(`${strategy.market} | Proposal requested.`);
    addSimpleActivity(`${strategy.market} | Broker proposal requested.`);
    updateDeploymentStatus("Requesting demo Touch proposal...");
    await executionManager.requestProposal();

    addSimpleActivity(`${strategy.market} | Proposal received.`);
    addSimpleActivity(`${strategy.market} | Broker proposal received.`);
    updateDeploymentStatus("Proposal received. Buying demo contract...");
    addSimpleActivity(`${strategy.market} | Broker buy requested.`);
    await executionManager.buyContract();

    const activeStrategy = deploymentManager.getActiveStrategy();
    activeStrategy.status = "EXECUTING";
    renderActiveStrategy(activeStrategy);
    updateDeploymentStatus("EXECUTING. Demo contract is running.");
    addSimpleActivity(`${strategy.market} | Contract purchased.`);
    addSimpleActivity(`${strategy.market} | Broker contract purchased.`);

    const riskState = riskManager.getState();
    riskManager.updateState({
      openTrades: riskState.openTrades + 1,
      tradesToday: riskState.tradesToday + 1,
    });
    renderRiskStatus();

    addSimpleActivity(`${strategy.market} | Broker contract monitoring started.`);
    await executionManager.monitorContract();
  } catch (error) {
    updateDeploymentStatus(error.message);
    addSimpleActivity(`${strategy.market} | Broker execution error: ${error.message}`);
    addSimpleActivity(`${strategy.market} | ${error.message}`);
  }
}

async function connectWithToken(token, options = {}) {
  const source = options.source || "developer";
  const attemptId = startDerivConnectionAttempt(source);

  if (source === "oauth") {
    // Modern Deriv OAuth tokens are backend-only. This legacy branch keeps tokens in memory only.
  } else {
    window.sessionStorage.removeItem("apextrend_deriv_oauth_token");
    window.localStorage.setItem("apextrend_deriv_token", token);
  }

  updateDerivConnectionPhase(attemptId, "connecting", "Connecting...");

  try {
    setBrokerGatewayStatus("Connecting", { source });
    await brokerConnect();
    if (!isActiveDerivAttempt(attemptId)) {
      return null;
    }

    updateDerivConnectionPhase(attemptId, "authorizing", source === "oauth" ? "Authorizing Deriv OAuth session..." : "Connecting...");
    const account = await brokerAuthorize(token, { source });
    if (!isActiveDerivAttempt(attemptId)) {
      return null;
    }
    updateAccount(account);
    updateDerivConnectionPhase(attemptId, "authorized", "Authorized");
    setBrokerGatewayStatus("Authorized", { source });
    debugDerivConnection("Authorized", { attemptId, loginid: account?.loginid });

    let balance;
    try {
      balance = await brokerGetBalance();
    } catch (error) {
      throw error;
    }
    if (!isActiveDerivAttempt(attemptId)) {
      return null;
    }
    updateBalance(balance);
    debugDerivConnection("Balance loaded", { attemptId, balance: balance?.balance, currency: balance?.currency });

    updateDerivConnectionPhase(attemptId, "loading-markets", "Loading markets...");
    const loadedVolatilitySymbols = await loadVolatilitySymbols();
    if (!isActiveDerivAttempt(attemptId)) {
      return null;
    }
    if (!loadedVolatilitySymbols.length) {
      throw new Error("No supported Volatility Indices loaded.");
    }

    const subscriptionsStarted = await subscribeToAllSymbols({ requireSymbols: true });
    if (!isActiveDerivAttempt(attemptId)) {
      return null;
    }
    if (!subscriptionsStarted) {
      throw new Error("Tick subscriptions were not started.");
    }

    activeDerivConnection.completed = true;
    activeDerivConnection.phase = "scanner-active";
    setStatus("Connected");
    setMessage("Scanner subscriptions active");
    setScannerStatus("Scanner Active");
    addSimpleActivity("Scanner started.", {
      eventType: "scanner_started",
      subscribedMarkets: uiSubscribedSymbols.size,
    });
    debugDerivConnection("Scanner active", { attemptId, subscribed: uiSubscribedSymbols.size });
    debugDerivConnection("Connection attempt completed", activeDerivConnection);
    showScreen("dashboard");
    return account;
  } catch (error) {
    if (!isActiveDerivAttempt(attemptId)) {
      debugDerivConnection("Ignored stale connection failure", { attemptId, message: error.message });
      return null;
    }

    activeDerivConnection.completed = false;
    activeDerivConnection.phase = "failed";
    brokerDisconnect();
    setBrokerGatewayStatus("Offline", { source });
    const invalidToken = /token/i.test(error.message) || /authorize/i.test(error.message);
    setStatus(invalidToken ? "Authorization failed: invalid token" : "Disconnected");
    setMessage(invalidToken ? "Authorization failed: invalid token" : error.message);
    debugDerivConnection("Connection attempt failed", { attemptId, source, message: error.message });
    throw error;
  }
}

function resetDashboard() {
  activeDerivConnection = {
    id: derivConnectionAttemptId,
    source: "",
    phase: "idle",
    completed: false,
  };
  setStatus("Disconnected");
  accountType.textContent = "-";
  accountType.dataset.status = "";
  loginId.textContent = "-";
  accountCurrency.textContent = "-";
  accountBalance.textContent = "0.00";
  currentBalanceValue = 0;
  latestTicks = new Map();
  uiSubscribedSymbols = new Set();
  volatilitySymbols = [];
  marketNames = new Map();
  scannerEngine.reset();
  deploymentManager.stopStrategy("Disconnected.");
  executionManager.cancelExecution("Disconnected.");
  validationRecords = [];
  latestAnalyses = new Map();
  latestDeploySignal = null;
  scannerStartedAt = null;
  lastScanAt = null;
  renderValidationRecords();
  renderVolatilityList();
  renderRiskStatus();
  opportunityCard.classList.add("hidden");
  renderActiveStrategy(null);
  renderContract(null);
  updateDeploymentStatus("No bot armed.");
  setScannerStatus("Scanner idle.");
  setMessage("Connect a Deriv account to fetch supported Volatility Indices and run the read-only scanner.");
}

function setAuthMessage(message) {
  authMessage.textContent = message;
}

function setAuthMode(mode) {
  authMode = ["signup", "reset"].includes(mode) ? mode : "login";
  const isSignup = authMode === "signup";
  const isReset = authMode === "reset";
  loginTitle.textContent = isSignup ? "Create your ApexTrend account" : (isReset ? "Reset your password" : "Welcome back");
  authModeCopy.textContent = isSignup
    ? "Start with a 7-day free trial. Connect Deriv after signing in."
    : (isReset ? "Choose a new password for your ApexTrend account." : "Sign in to continue to your ApexTrend intelligence workspace.");
  authSubmitButton.textContent = isSignup ? "Create Account" : (isReset ? "Update Password" : "Sign In");
  showSignupButton.textContent = isSignup ? "Already have an account? Sign in" : "Create an ApexTrend account";
  authPasswordInput.autocomplete = authMode === "signup" || authMode === "reset" ? "new-password" : "current-password";
  authFullNameField.classList.toggle("hidden", !isSignup);
  authConfirmPasswordField.classList.toggle("hidden", !isSignup);
  authTermsCheck.classList.toggle("hidden", !isSignup);
  authFullNameInput.value = isSignup ? authFullNameInput.value : "";
  authConfirmPasswordInput.value = isSignup ? authConfirmPasswordInput.value : "";
  authTermsCheckbox.checked = isSignup ? authTermsCheckbox.checked : false;
  forgotPasswordButton.classList.toggle("hidden", isSignup || isReset);
  setAuthMessage(isSignup
    ? "Start with a 7-day free trial. Connect Deriv after signing in."
    : (isReset ? "Enter a new password to complete reset." : "Login to ApexTrend before linking Deriv."));
}

function applyAuthState(state = window.ApexAuth?.getAuthState?.()) {
  const authenticated = Boolean(state?.authenticated);
  document.body.classList.toggle("authenticated", authenticated);
  accountMenu.classList.toggle("hidden", !authenticated);
  authUserEmail.textContent = authenticated ? (state.user?.email || window.ApexAuth.getUserEmail()) : "-";

  if (!state?.configured) {
    setAuthMessage("Supabase Auth is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY in auth.js.");
  }

  if (authenticated) {
    setAuthMessage("ApexTrend session active.");
    initializeCloudSyncForUser(state.user);
    if (window.location.hash === "#login" || !window.location.hash) {
      showScreen("dashboard");
    }
    return;
  }

  cloudSyncUserId = "";
  updateCloudSyncStatus({ available: false, status: "offline", message: "Cloud sync unavailable" });
  brokerDisconnect();
  window.sessionStorage.removeItem("apextrend_deriv_oauth_token");
  resetDashboard();
  showScreen("login");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.screen);
  });
});

quickConnectButton.addEventListener("click", () => {
  showScreen("connect");
});

quickStartScannerButton.addEventListener("click", async () => {
  try {
    if (!volatilitySymbols.length) {
      await loadVolatilitySymbols();
    }
    await subscribeToAllSymbols();
  } catch (error) {
    setMessage(error.message);
  }
});

quickStopScannerButton.addEventListener("click", () => {
  disconnectButton.click();
});

quickRiskButton.addEventListener("click", () => {
  showScreen("risk");
});

quickActivityButton.addEventListener("click", () => {
  showScreen("activity");
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = authFullNameInput.value.trim();
  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;

  if (!email || !password) {
    setAuthMessage("Enter your email and password.");
    return;
  }

  if (authMode === "signup" && !fullName) {
    setAuthMessage("Enter your full name.");
    return;
  }

  if (authMode === "signup" && !authConfirmPasswordInput.value) {
    setAuthMessage("Confirm your password.");
    return;
  }

  if (authMode === "signup" && password !== authConfirmPasswordInput.value) {
    setAuthMessage("Passwords do not match.");
    return;
  }

  if (authMode === "signup" && !authTermsCheckbox.checked) {
    setAuthMessage("Agree to the ApexTrend Terms and Privacy Policy before creating an account.");
    return;
  }

  authSubmitButton.disabled = true;
  setAuthMessage(authMode === "signup" ? "Creating ApexTrend account..." : "Logging in...");

  try {
    if (authMode === "reset") {
      await window.ApexAuth.updatePassword(password);
      setAuthMessage("Password updated. ApexTrend session active.");
      showScreen("dashboard");
    } else if (authMode === "signup") {
      await window.ApexAuth.signUp(email, password, { full_name: fullName });
      setAuthMessage("Account created. Check your email if confirmation is required, then login.");
      setAuthMode("login");
    } else {
      await window.ApexAuth.signIn(email, password);
      setAuthMessage("ApexTrend session active.");
      showScreen("dashboard");
    }
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    authSubmitButton.disabled = false;
  }
});

showSignupButton.addEventListener("click", () => {
  setAuthMode(authMode === "signup" ? "login" : "signup");
});

forgotPasswordButton.addEventListener("click", async () => {
  const email = authEmailInput.value.trim();
  if (!email) {
    setAuthMessage("Enter your email first, then request a password reset.");
    return;
  }

  forgotPasswordButton.disabled = true;
  setAuthMessage("Sending password reset email...");

  try {
    await window.ApexAuth.resetPassword(email);
    setAuthMessage("Password reset email sent. Follow the Supabase email link to continue.");
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    forgotPasswordButton.disabled = false;
  }
});

logoutButton.addEventListener("click", async () => {
  try {
    await window.ApexAuth.signOut();
    setAuthMessage("Logged out.");
  } catch (error) {
    setAuthMessage(error.message);
  }
});

derivOauthButton.addEventListener("click", async () => {
  if (!window.ApexAuth.isAuthenticated()) {
    setAuthMessage("Login to ApexTrend before linking Deriv.");
    showScreen("login");
    return;
  }

  derivOauthButton.disabled = true;
  setMessage("Starting secure Deriv OAuth...");
  addSimpleActivity("OAuth started.");
  window.sessionStorage.removeItem("apextrend_deriv_oauth_token");

  try {
    const authorizationUrl = await startBackendDerivOAuth();
    window.location.href = authorizationUrl;
  } catch (error) {
    setMessage(error.message);
    addSimpleActivity(`OAuth failed: ${error.message}`);
    derivOauthButton.disabled = false;
  }
});

derivDemoOtpButton.addEventListener("click", async () => {
  const accountId = derivAccountSelect.value;
  if (!accountId) {
    derivOauthStatus.textContent = "Select a Demo options account first.";
    return;
  }

  derivDemoOtpButton.disabled = true;
  derivOauthStatus.textContent = "Preparing Demo WebSocket...";

  try {
    const payload = await requestDerivOtpWebSocket(accountId);
    await window.ApexBroker.manager.getActiveBroker().connectWithOtpWebSocket(payload.wsUrl);
    derivOauthStatus.textContent = "Demo WebSocket prepared. Demo connected.";
    setBrokerGatewayStatus("Connected", { source: "oauth" });
    addSimpleActivity("Deriv Demo OTP WebSocket prepared.");
  } catch (error) {
    derivOauthStatus.textContent = error.message;
    addSimpleActivity(`Deriv Demo OTP failed: ${error.message}`);
  } finally {
    derivDemoOtpButton.disabled = false;
  }
});

connectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = tokenInput.value.trim();
  if (!token) {
    setMessage("Enter a development API token before connecting.");
    showScreen("dashboard");
    return;
  }

  try {
    await connectWithToken(token, { source: "developer" });
  } catch (error) {
    const invalidToken = /token/i.test(error.message) || /authorize/i.test(error.message);
    setStatus(invalidToken ? "Authorization failed: invalid token" : "Disconnected");
    setMessage(invalidToken ? "Authorization failed: invalid token" : error.message);
    showScreen("dashboard");
  }
});

volatilityList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-subscribe-symbol]");
  if (!button) {
    return;
  }

  const symbol = button.dataset.subscribeSymbol;
  if (uiSubscribedSymbols.has(symbol)) {
    return;
  }

  try {
    await subscribeToSymbol(symbol);
  } catch (error) {
    uiSubscribedSymbols.delete(symbol);
    renderVolatilityList();
    setMessage(error.message);
  }
});

refreshSymbolsButton.addEventListener("click", async () => {
  try {
    await loadVolatilitySymbols();
  } catch (error) {
    setMessage(error.message);
  }
});

subscribeAllButton.addEventListener("click", async () => {
  try {
    await subscribeToAllSymbols();
  } catch (error) {
    setMessage(error.message);
  }
});

deploySignalButton.addEventListener("click", async () => {
  if (!latestDeploySignal) {
    updateDeploymentStatus("No deploy signal selected.");
    return;
  }

  try {
    const strategy = deploymentManager.armStrategy(latestDeploySignal);
    renderActiveStrategy(strategy);
    updateDeploymentStatus("Strategy armed. Performing final scanner validation...");
    addSimpleActivity(`${strategy.market} | ${strategy.botType} armed by user.`);
    addSimpleActivity(`${strategy.market} | Bot selected: ${strategy.botType}.`);

    const latestAnalysis = latestAnalyses.get(strategy.symbol);
    const validation = deploymentManager.validateBeforeExecution(latestAnalysis);
    const activeStrategy = deploymentManager.getActiveStrategy();
    renderActiveStrategy(activeStrategy);

    if (!validation.ok) {
      updateDeploymentStatus(validation.reason);
      addSimpleActivity(`${strategy.market} | ${validation.reason}`);
      return;
    }

    const riskValidation = deploymentManager.validateRiskBeforeExecution(riskManager, {
      accountConnected: connectionStatus.textContent === "Connected",
      scannerSignalValid: validation.ok,
      balance: currentBalanceValue,
      accountType: getCurrentAccountType(),
    });
    renderActiveStrategy(deploymentManager.getActiveStrategy());
    renderRiskStatus();

    if (!riskValidation.ok) {
      updateDeploymentStatus(`Deployment cancelled: ${riskValidation.reason}`);
      addSimpleActivity(`${strategy.market} | Deployment blocked by risk rule: ${riskValidation.reason}`);
      logRiskBlock(riskValidation.reason);
      return;
    }

    const botValidation = deploymentManager.verifyBotSetup(
      latestAnalysis,
      getMarketDataForStrategy(strategy),
      riskValidation.decision,
    );
    renderActiveStrategy(deploymentManager.getActiveStrategy());

    if (!botValidation.ok) {
      updateDeploymentStatus(botValidation.reason);
      addSimpleActivity(`${strategy.market} | Bot rejected setup.`);
      if (botValidation.detail) {
        addSimpleActivity(`${strategy.market} | ${botValidation.detail}`);
      }
      return;
    }

    addSimpleActivity(`${strategy.market} | Bot approved setup.`);
    addSimpleActivity(getContractParametersActivityMessage(strategy, botValidation.parameters));
    updateDeploymentStatus(`READY FOR EXECUTION. Stake approved for demo execution: ${formatBalance(riskValidation.decision.stake, accountCurrency.textContent === "-" ? "" : accountCurrency.textContent)}.`);
    addSimpleActivity(`${strategy.market} | ${strategy.botType} ready for execution after final validation.`);
    await executeApprovedStrategy();
  } catch (error) {
    updateDeploymentStatus(error.message);
  }
});

ignoreSignalButton.addEventListener("click", () => {
  latestDeploySignal = null;
  opportunityCard.classList.add("hidden");
  setScannerStatus("Scanning markets...");
});

stopBotButton.addEventListener("click", () => {
  const cancelledExecution = executionManager.cancelExecution("Execution cancelled manually.");
  if (cancelledExecution) {
    renderContract(cancelledExecution);
  }

  const stoppedStrategy = deploymentManager.stopStrategy("Stopped manually.");
  if (!stoppedStrategy) {
    updateDeploymentStatus("No active bot to stop.");
    return;
  }

  renderActiveStrategy(stoppedStrategy);
  updateDeploymentStatus("Bot stopped manually.");
  addSimpleActivity(`${stoppedStrategy.market} | ${stoppedStrategy.botType} stopped manually.`);
});

riskSettingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const previousSettings = riskManager.getSettings();
  const formSettings = getRiskSettingsFromForm();
  riskManager.updateSettings(formSettings);
  syncRiskForm();
  renderRiskStatus();

  const settings = riskManager.getSettings();
  riskSettingsMessage.textContent = `Risk settings saved. Risk per trade: ${settings.riskPerTradePercent}%. Calculated stake updates from live balance.`;
  addSimpleActivity("Risk settings changed.", {
    eventType: "risk_settings_changed",
    riskPercent: settings.riskPerTradePercent,
    maxOpenTrades: settings.maxOpenTrades,
    maxTradesPerDay: settings.maxTradesPerDay,
  });
  await window.ApexSettings?.saveRiskSettings(settings);
  await window.ApexSettings?.saveScannerSettings({
    scannerSensitivity: scannerSensitivityInput?.value || "balanced",
    enabledMarkets: getEnabledMarketSymbols(),
  });

  if (settings.maxTradesPerDay !== previousSettings.maxTradesPerDay && riskManager.getState().tradesToday >= settings.maxTradesPerDay) {
    addSimpleActivity("Max trades reached.");
  }
});

mockSignalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    triggerMockSignal(button.dataset.mockSignal);
  });
});

executionTestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const execution = executionManager.runDemoSimulation(button.dataset.executionTest);
    renderContract(execution || executionManager.getActiveExecution());
  });
});

botTestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    triggerBotTest(button.dataset.botTest);
  });
});

dashboardTestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDashboardActiveBotSample(button.dataset.dashboardTest === "active-bot-sample");
  });
});

validationFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeValidationFilter = button.dataset.validationFilter;
    validationFilterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });
    renderValidationRecords();
  });
});

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", { persist: true });
});

cancelExecutionButton.addEventListener("click", () => {
  const execution = executionManager.cancelExecution("Execution cancelled by user.");
  if (!execution) {
    updateDeploymentStatus("No active execution to cancel.");
    return;
  }

  renderContract(execution);
  updateDeploymentStatus("Execution cancelled.");
  addSimpleActivity(`${execution.market} | Execution cancelled.`);
});

disconnectButton.addEventListener("click", () => {
  brokerDisconnect();
  window.localStorage.removeItem("apextrend_deriv_token");
  window.sessionStorage.removeItem("apextrend_deriv_oauth_token");
  tokenInput.value = "";
  resetDashboard();
});

window.ApexDeriv.addDerivListener("status", (event) => {
  const status = event.detail.status;
  if (activeDerivConnection.phase === "failed" && String(status).startsWith("Disconnected")) {
    setBrokerGatewayStatus("Offline", { source: activeDerivConnection.source });
    return;
  }
  if (activeDerivConnection.completed && status === "Connected") {
    debugDerivConnection("Ignored stale connected status after completion", { status });
    return;
  }
  if (String(status).startsWith("Disconnected")) {
    setStatus("Connection lost");
    setMessage("Connection lost");
  } else if (!["connecting", "authorizing", "authorized", "loading-markets", "scanner-active"].includes(activeDerivConnection.phase)) {
    setStatus(status);
  }
  if (String(event.detail.status).startsWith("Disconnected") && executionManager.hasOpenContract()) {
    updateDeploymentStatus("Connection lost while monitoring demo contract.");
    addSimpleActivity("Connection lost while monitoring demo contract.");
  }
});

window.ApexDeriv.addDerivListener("authorized", (event) => {
  updateAccount(event.detail.account);
  updateBrokerStatus();
});

window.ApexDeriv.addDerivListener("balance", (event) => {
  updateBalance(event.detail.balance);
  updateBrokerStatus();
});

window.ApexDeriv.addDerivListener("tick", (event) => {
  updateTick(event.detail.symbol, event.detail.price);
  scanTick(event.detail.symbol, event.detail.price, event.detail.epoch);
});

window.ApexDeriv.addDerivListener("error", (event) => {
  const message = event.detail.message || "Deriv connection error.";
  const looksLikeAuthError = /token|authorize|authorization/i.test(message);

  if (activeDerivConnection.completed && looksLikeAuthError) {
    debugDerivConnection("Ignored stale auth error after successful connection", { message, active: activeDerivConnection });
    return;
  }

  if (activeDerivConnection.phase === "scanner-active" && looksLikeAuthError) {
    debugDerivConnection("Ignored stale scanner-active auth error", { message, active: activeDerivConnection });
    return;
  }

  setMessage(message);
});

window.ApexDeriv.addDerivListener("contract", (event) => {
  executionManager.applyContractUpdate(event.detail.contract, event.detail.subscriptionId);
});

window.ApexExecution.addExecutionListener("prepared", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("proposalRequested", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("proposalReceived", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("contractPurchased", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("contractRunning", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("contractUpdate", (event) => {
  renderContract(event.detail.execution);
});

window.ApexExecution.addExecutionListener("cancelled", (event) => {
  renderContract(event.detail.execution);
  addSimpleActivity(`${event.detail.execution.market} | Execution cancelled.`);
});

window.ApexExecution.addExecutionListener("error", (event) => {
  const execution = event.detail.execution;
  if (execution) {
    renderContract(execution);
  }
  updateDeploymentStatus(event.detail.message);
  addSimpleActivity(event.detail.message);
});

window.ApexExecution.addExecutionListener("finished", (event) => {
  const execution = event.detail.execution;
  renderContract(execution);

  const state = riskManager.getState();
  const profitLoss = Number(execution.profitLoss || 0);
  riskManager.updateState({
    openTrades: Math.max(0, state.openTrades - 1),
    consecutiveLosses: profitLoss < 0 ? state.consecutiveLosses + 1 : 0,
    dailyProfitLoss: state.dailyProfitLoss + profitLoss,
  });
  renderRiskStatus();

  const outcome = event.detail.outcome === "Won" ? "Contract won" : "Contract lost";
  addSimpleActivity(`${execution.market} | ${outcome}. P/L ${formatBalance(profitLoss, execution.currency)}.`);
  updateDeploymentStatus("Contract settled. Scanner returned to silent monitoring.");
  setScannerStatus("Scanning markets...");
  resetDeploymentManager();
});

async function handleOAuthRedirect(result = getOAuthRedirectResult()) {
  if (!result) {
    return false;
  }

  clearOAuthParamsFromUrl("connect");
  setStatus("Disconnected");
  setMessage(`Deriv connection cancelled or failed. ${result.error || "Use the secure backend OAuth flow."}`);
  addSimpleActivity(`OAuth failed: ${result.error || "Legacy frontend OAuth callback rejected."}`);
  showScreen("connect");
  return true;
}

async function handleBackendDerivCallback(result = getBackendDerivCallbackResult()) {
  if (!result) {
    return false;
  }

  clearOAuthParamsFromUrl("connect");
  showScreen("connect");

  if (result.failed) {
    setMessage(`Deriv connection cancelled or failed. ${result.reason || "OAuth failed."}`);
    derivAccountPanel?.classList.toggle("hidden", false);
    derivOauthStatus.textContent = `Deriv connection failed. ${result.reason || ""}`.trim();
    setBrokerGatewayStatus("Offline", { source: "oauth" });
    addSimpleActivity("Deriv OAuth failed.");
    return true;
  }

  setMessage("Deriv linked successfully.");
  derivAccountPanel?.classList.toggle("hidden", false);
  derivOauthStatus.textContent = "Deriv linked successfully. Loading Demo accounts...";
  setBrokerGatewayStatus("OAuth pending", { source: "oauth" });
  addSimpleActivity("Deriv linked successfully.");
  await refreshDerivOAuthPanel();
  return true;
}

const oauthRedirectResult = getOAuthRedirectResult();
const backendDerivCallbackResult = getBackendDerivCallbackResult();
const authRedirectParams = collectUrlParams();
const isPasswordRecovery = authRedirectParams.get("type") === "recovery";
const requestedScreen = (oauthRedirectResult || backendDerivCallbackResult) ? "connect" : window.location.hash.replace("#", "") || "login";
showScreen("login");
applyTheme(window.localStorage.getItem("apextrend_theme") || document.documentElement.dataset.theme || "light");
updateCloudSyncStatus({ available: false, status: "offline", message: "Cloud sync unavailable" });
updateBrokerStatus();
checkBackendHealth();
window.setInterval(checkBackendHealth, 30000);
window.setInterval(renderPersonalDashboard, 30000);
connectionStatus.dataset.status = connectionStatus.textContent.toLowerCase();
accountType.dataset.status = accountType.textContent.toLowerCase();
renderValidationRecords();
syncRiskForm();
renderRiskStatus();
renderPersonalDashboard();
setAuthMode(isPasswordRecovery ? "reset" : "login");

const storedToken = window.localStorage.getItem("apextrend_deriv_token");

window.addEventListener("unhandledrejection", (event) => {
  handleSupabaseFetchFailure(event, event.reason);
});

window.addEventListener("error", (event) => {
  handleSupabaseFetchFailure(event, event.error || event.message);
});

window.ApexAuth.addAuthListener("auth-change", (event) => {
  applyAuthState(event.detail);
});

window.ApexAuth.addAuthListener("auth-error", () => {
  applyAuthState({ configured: window.ApexAuth.getAuthState().configured, authenticated: false });
  setAuthMessage("ApexTrend authentication could not be restored. Please login again.");
});

window.ApexSettings?.addSettingsListener("sync-change", (event) => {
  updateCloudSyncStatus(event.detail);
});

window.ApexAuth.initializeAuth().then(async (authState) => {
  applyAuthState(authState);

  if (!authState.authenticated) {
    return;
  }

  const handledBackendDerivCallback = await handleBackendDerivCallback(backendDerivCallbackResult);
  if (handledBackendDerivCallback) {
    return;
  }

  const handledOAuthRedirect = await handleOAuthRedirect(oauthRedirectResult);
  if (handledOAuthRedirect) {
    return;
  }

  if (storedToken) {
    tokenInput.value = storedToken;
    setMessage("Saved development token found in localStorage. Connect when ready.");
  }
  refreshDerivOAuthPanel();
  const safeRequestedScreen = screens.some((screen) => screen.id === requestedScreen) ? requestedScreen : "dashboard";
  showScreen(safeRequestedScreen);
}).catch((error) => {
  setAuthMessage(error.message);
  applyAuthState({ configured: window.ApexAuth.getAuthState().configured, authenticated: false });
});
