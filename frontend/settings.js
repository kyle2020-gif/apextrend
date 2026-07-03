(function () {
  const settingsEvents = new EventTarget();
  const LOCAL_SETTINGS_KEY = "apextrend_user_settings";
  const LOCAL_PROFILE_KEY = "apextrend_profile";

  const DEFAULT_SETTINGS = {
    theme: "light",
    notifications_enabled: true,
    scanner_sensitivity: "balanced",
    enabled_markets: [],
    risk_percent: 3,
    daily_profit_target: 25,
    daily_loss_limit: 10,
    max_open_trades: 1,
    max_trades_per_day: 5,
  };

  let currentUser = null;
  let currentSettings = { ...DEFAULT_SETTINGS };
  let cloudAvailable = false;
  let lastMessage = "Cloud sync unavailable";
  let cloudRetryAfter = 0;
  let lastCloudDebugAt = 0;
  const CLOUD_RETRY_DELAY_MS = 60000;

  function getClient() {
    return window.ApexAuth?.getClient?.() || null;
  }

  function emit(status, message = lastMessage) {
    lastMessage = message;
    settingsEvents.dispatchEvent(new CustomEvent("sync-change", {
      detail: {
        available: cloudAvailable,
        status,
        message,
        settings: getSettings(),
      },
    }));
  }

  function logCloudDebug(label, error) {
    const now = Date.now();
    if (now - lastCloudDebugAt < 5000) {
      return;
    }
    lastCloudDebugAt = now;
    console.debug("[ApexTrend Settings]", label, error?.message || error || "");
  }

  function markCloudUnavailable(reason = "Cloud sync unavailable", error = null) {
    cloudAvailable = false;
    cloudRetryAfter = Date.now() + CLOUD_RETRY_DELAY_MS;
    logCloudDebug(reason, error);
    emit("offline", "Cloud sync unavailable");
  }

  function canUseCloud() {
    return Boolean(currentUser && getClient() && Date.now() >= cloudRetryAfter);
  }

  function markCloudConnected() {
    cloudAvailable = true;
    cloudRetryAfter = 0;
    emit("connected", "Cloud sync active");
  }

  function addSettingsListener(name, callback) {
    settingsEvents.addEventListener(name, callback);
  }

  function getLocalSettings() {
    try {
      return {
        ...DEFAULT_SETTINGS,
        ...JSON.parse(window.localStorage.getItem(LOCAL_SETTINGS_KEY) || "{}"),
      };
    } catch (_error) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveLocalSettings(settings) {
    currentSettings = { ...DEFAULT_SETTINGS, ...settings };
    window.localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(currentSettings));
    return getSettings();
  }

  function getProfileFromUser(user) {
    const metadata = user?.user_metadata || {};
    return {
      id: user.id,
      full_name: metadata.full_name || metadata.name || "",
      email: user.email || "",
      country: metadata.country || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    };
  }

  async function initializeForUser(user) {
    currentUser = user || null;
    cloudRetryAfter = 0;
    if (!currentUser) {
      markCloudUnavailable("Cloud sync unavailable");
      return {
        profile: null,
        settings: getLocalSettings(),
        cloudAvailable,
      };
    }

    currentSettings = getLocalSettings();
    const client = getClient();
    if (!client) {
      markCloudUnavailable("Cloud sync unavailable");
      return {
        profile: getProfileFromUser(currentUser),
        settings: getSettings(),
        cloudAvailable,
      };
    }

    try {
      emit("syncing", "Syncing settings...");
      const profile = await ensureProfile(currentUser);
      const settings = await loadOrCreateSettings();
      markCloudConnected();
      return { profile, settings, cloudAvailable };
    } catch (error) {
      markCloudUnavailable("Cloud sync unavailable", error);
      return {
        profile: getProfileFromUser(currentUser),
        settings: getSettings(),
        cloudAvailable,
        error,
      };
    }
  }

  async function ensureProfile(user = currentUser) {
    if (!user) {
      throw new Error("No ApexTrend user is signed in.");
    }

    const client = getClient();
    if (!client) {
      throw new Error("Supabase client is unavailable.");
    }

    const profile = getProfileFromUser(user);
    const { data, error } = await client
      .from("profiles")
      .upsert(profile, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      throw error;
    }

    window.localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data || profile));
    return data || profile;
  }

  async function loadOrCreateSettings() {
    if (!currentUser) {
      return getSettings();
    }

    const client = getClient();
    if (!client) {
      throw new Error("Supabase client is unavailable.");
    }

    const { data, error } = await client
      .from("user_settings")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      saveLocalSettings(data);
      return getSettings();
    }

    return saveSettings(DEFAULT_SETTINGS);
  }

  async function saveSettings(partialSettings = {}) {
    const next = saveLocalSettings({
      ...currentSettings,
      ...partialSettings,
    });

    if (!currentUser) {
      markCloudUnavailable("Cloud sync unavailable");
      return next;
    }

    if (!canUseCloud()) {
      emit("offline", "Cloud sync unavailable");
      return next;
    }

    try {
      emit("syncing", "Syncing settings...");
      const payload = {
        ...next,
        user_id: currentUser.id,
      };
      const { data, error } = await getClient()
        .from("user_settings")
        .upsert(payload, { onConflict: "user_id" })
        .select()
        .single();

      if (error) {
        throw error;
      }

      currentSettings = { ...DEFAULT_SETTINGS, ...(data || next) };
      markCloudConnected();
      return getSettings();
    } catch (error) {
      markCloudUnavailable("Settings save failed", error);
      return next;
    }
  }

  function saveTheme(theme) {
    return saveSettings({ theme: theme === "dark" ? "dark" : "light" });
  }

  function saveRiskSettings(settings) {
    return saveSettings({
      risk_percent: Number(settings.riskPerTradePercent),
      daily_profit_target: Number(settings.dailyProfitTarget),
      daily_loss_limit: Number(settings.dailyLossLimit),
      max_open_trades: Number(settings.maxOpenTrades),
      max_trades_per_day: Number(settings.maxTradesPerDay),
    });
  }

  function saveScannerSettings(settings = {}) {
    return saveSettings({
      scanner_sensitivity: settings.scannerSensitivity || currentSettings.scanner_sensitivity || "balanced",
      enabled_markets: Array.isArray(settings.enabledMarkets) ? settings.enabledMarkets : currentSettings.enabled_markets,
    });
  }

  async function logActivity(event = {}) {
    if (!canUseCloud()) {
      return { ok: false, reason: "Cloud sync unavailable" };
    }

    try {
      const { error } = await getClient()
        .from("activity_logs")
        .insert({
          user_id: currentUser.id,
          event_type: event.eventType || "activity",
          message: event.message || "",
          metadata: event.metadata || {},
        });

      if (error) {
        throw error;
      }

      markCloudConnected();
      return { ok: true };
    } catch (error) {
      markCloudUnavailable("Activity log sync failed", error);
      return { ok: false, reason: error.message };
    }
  }

  async function getRecentActivityLogs(limit = 50) {
    if (!canUseCloud()) {
      emit("offline", "Cloud sync unavailable");
      return [];
    }

    try {
      const { data, error } = await getClient()
        .from("activity_logs")
        .select("event_type,message,metadata,created_at")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      markCloudConnected();
      return data || [];
    } catch (error) {
      markCloudUnavailable("Activity log load failed", error);
      return [];
    }
  }

  function getRiskSettingsForApp() {
    return {
      riskPerTradePercent: Number(currentSettings.risk_percent ?? DEFAULT_SETTINGS.risk_percent),
      dailyProfitTarget: Number(currentSettings.daily_profit_target ?? DEFAULT_SETTINGS.daily_profit_target),
      dailyLossLimit: Number(currentSettings.daily_loss_limit ?? DEFAULT_SETTINGS.daily_loss_limit),
      maxOpenTrades: Number(currentSettings.max_open_trades ?? DEFAULT_SETTINGS.max_open_trades),
      maxTradesPerDay: Number(currentSettings.max_trades_per_day ?? DEFAULT_SETTINGS.max_trades_per_day),
    };
  }

  function getSettings() {
    return { ...DEFAULT_SETTINGS, ...currentSettings };
  }

  function getSyncState() {
    return {
      available: cloudAvailable,
      message: lastMessage,
      user: currentUser,
      settings: getSettings(),
    };
  }

  window.ApexSettings = {
    DEFAULT_SETTINGS,
    addSettingsListener,
    ensureProfile,
    getRiskSettingsForApp,
    getRecentActivityLogs,
    getSettings,
    getSyncState,
    initializeForUser,
    loadOrCreateSettings,
    logActivity,
    markCloudUnavailable,
    saveRiskSettings,
    saveScannerSettings,
    saveSettings,
    saveTheme,
  };
}());
