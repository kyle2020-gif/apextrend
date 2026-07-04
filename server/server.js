import crypto from "node:crypto";
import cors from "./vendor/cors/index.js";
import dotenv from "./vendor/dotenv/index.js";
import express from "./vendor/express/index.js";
import helmet from "./vendor/helmet/index.js";
import { createClient } from "./vendor/supabase-js/index.js";

dotenv.config();

const app = express();
const env = globalThis.process?.env || {};
const port = Number(env.PORT || 8787);
const frontendOrigin = env.FRONTEND_ORIGIN || "http://127.0.0.1:4173";
const derivClientId = env.DERIV_CLIENT_ID || env.DERIV_APP_ID || "YOUR_DERIV_CLIENT_ID";
const derivRedirectUri = env.DERIV_REDIRECT_URI || `http://127.0.0.1:${port}/api/deriv/oauth/callback`;
const derivAuthUrl = env.DERIV_AUTH_URL || "https://auth.deriv.com/oauth2/auth";
const derivLegacyAuthUrl = env.DERIV_LEGACY_AUTH_URL || "https://oauth.deriv.com/oauth2/authorize";
const derivOauthStyle = env.DERIV_OAUTH_STYLE || "pkce_modern";
const derivTokenUrl = env.DERIV_TOKEN_URL || "https://auth.deriv.com/oauth2/token";
const derivScope = env.DERIV_SCOPE || "trade";
const derivAccountsUrl = env.DERIV_ACCOUNTS_URL || "https://api.derivws.com/trading/v1/accounts";

const supabaseUrl = env.SUPABASE_URL || "";
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseServiceRoleKey &&
  supabaseUrl !== "SUPABASE_URL" &&
  supabaseServiceRoleKey !== "SUPABASE_SERVICE_ROLE_KEY",
);

// Placeholder for future server-side profile, settings, and audit-log storage.
// Never expose or log the Supabase service role key.
const supabaseAdmin = supabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

const defaultSettings = {
  riskPerTradePercent: 3,
  dailyProfitTarget: 0,
  dailyLossLimit: 0,
  maxConsecutiveLosses: 3,
  maxTradesPerDay: 10,
  maxOpenTrades: 1,
  executionMode: "demo",
};

const settingsByUser = new Map();
const activityByUser = new Map();
const oauthStates = new Map();
const derivSessionsByUser = new Map();
const selectedDerivAccountByUser = new Map();
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

app.use(helmet());
app.use(cors({
  origin: [frontendOrigin, "http://localhost:4173"],
  credentials: true,
}));
app.use(express.json({ limit: "64kb" }));

function base64Url(input) {
  return input.toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createPkcePair() {
  const codeVerifier = base64Url(crypto.randomBytes(48));
  const codeChallenge = base64Url(crypto.createHash("sha256").update(codeVerifier).digest());
  return { codeVerifier, codeChallenge };
}

function buildDerivAuthorizationUrl({ state, codeChallenge } = {}) {
  if (derivOauthStyle === "legacy_app_id") {
    const authorizationUrl = new URL(derivLegacyAuthUrl);
    authorizationUrl.searchParams.set("app_id", derivClientId);
    return authorizationUrl;
  }

  const authorizationUrl = new URL(derivAuthUrl);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", derivClientId);
  authorizationUrl.searchParams.set("redirect_uri", derivRedirectUri);
  authorizationUrl.searchParams.set("scope", derivScope);
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  return authorizationUrl;
}

function pruneExpiredOauthStates() {
  const now = Date.now();
  for (const [state, record] of oauthStates.entries()) {
    if (now - record.createdAt > OAUTH_STATE_TTL_MS) {
      oauthStates.delete(state);
    }
  }
}

function safeErrorMessage(error) {
  return String(error?.message || error || "Unknown error").replace(/access_token=[^&\s]+/gi, "access_token=[redacted]");
}

function redirectToFrontend(params = {}) {
  const url = new URL(frontendOrigin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  url.hash = "connect";
  return url.toString();
}

function sendRedirect(res, location) {
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}

function getDerivSession(userId = "local-dev-user") {
  return derivSessionsByUser.get(userId) || null;
}

function requireDerivSession(req, res) {
  const session = getDerivSession(req.user.id);
  if (!session?.accessToken) {
    res.status(401).json({
      error: "deriv_oauth_required",
      message: "Link Deriv through OAuth before continuing.",
    });
    return null;
  }
  return session;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch (_error) {
    payload = { raw: text };
  }

  if (!response.ok) {
    throw Object.assign(new Error(payload.error_description || payload.message || `Deriv request failed with ${response.status}`), {
      status: response.status,
      payload,
    });
  }

  return payload;
}

function normalizeDerivAccounts(payload = {}) {
  const source = Array.isArray(payload.accounts)
    ? payload.accounts
    : (Array.isArray(payload.data) ? payload.data : []);

  return source.map((account) => {
    const id = account.id || account.account_id || account.loginid || account.login_id || "";
    const typeText = `${account.type || ""} ${account.account_type || ""} ${account.kind || ""}`.toLowerCase();
    const isDemo = Boolean(account.is_virtual || account.virtual || typeText.includes("demo"));
    const productText = `${account.product || ""} ${account.products || ""} ${account.market_type || ""}`.toLowerCase();
    const isOptions = productText.includes("option") || productText.includes("options") || productText === "";
    return {
      id,
      label: account.label || account.display_name || account.name || id,
      currency: account.currency || "",
      isDemo,
      isOptions,
      disabled: !isDemo,
    };
  }).filter((account) => account.id);
}

function getDemoOptionsAccount(accounts = []) {
  return accounts.find((account) => account.isDemo && account.isOptions) || accounts.find((account) => account.isDemo) || null;
}

function createActivityEntry(payload) {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: String(payload.type || "activity"),
    message: String(payload.message || ""),
    metadata: payload.metadata && typeof payload.metadata === "object" ? payload.metadata : {},
  };
}

function requireApexUser(req, _res, next) {
  // Phase 7B structure only. Later this middleware will verify the Supabase JWT
  // from the Authorization header and load the authenticated ApexTrend user.
  req.user = {
    id: "local-dev-user",
    email: "developer@apextrend.local",
  };
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "ApexTrend" });
});

app.get("/api/deriv/oauth/debug", requireApexUser, (_req, res) => {
  const state = base64Url(crypto.randomBytes(24));
  const { codeChallenge } = createPkcePair();
  const authorizationUrl = buildDerivAuthorizationUrl({ state, codeChallenge });

  res.json({
    oauthStyle: derivOauthStyle,
    configuredAuthUrl: derivAuthUrl,
    configuredLegacyAuthUrl: derivLegacyAuthUrl,
    clientIdPresent: Boolean(derivClientId && derivClientId !== "YOUR_DERIV_CLIENT_ID"),
    redirectUri: derivRedirectUri,
    scope: derivScope,
    generatedAuthorizationUrl: authorizationUrl.toString(),
    pkce: {
      method: "S256",
      codeChallengePresent: true,
      codeVerifierExposed: false,
    },
  });
});

app.get("/api/deriv/oauth/start", requireApexUser, (req, res) => {
  if (derivOauthStyle === "legacy_app_id") {
    const authorizationUrl = buildDerivAuthorizationUrl();

    if (req.query.redirect === "1") {
      sendRedirect(res, authorizationUrl.toString());
      return;
    }

    res.json({
      status: "ok",
      oauthStyle: derivOauthStyle,
      authorizationUrl: authorizationUrl.toString(),
      pkce: {
        enabled: false,
        codeVerifierStoredServerSide: false,
      },
    });
    return;
  }

  pruneExpiredOauthStates();
  const state = base64Url(crypto.randomBytes(24));
  const { codeVerifier, codeChallenge } = createPkcePair();

  oauthStates.set(state, {
    codeVerifier,
    userId: req.user.id,
    createdAt: Date.now(),
  });

  const authorizationUrl = buildDerivAuthorizationUrl({ state, codeChallenge });

  if (req.query.redirect === "1") {
    sendRedirect(res, authorizationUrl.toString());
    return;
  }

  res.json({
    status: "ok",
    authorizationUrl: authorizationUrl.toString(),
    pkce: {
      method: "S256",
      codeVerifierStoredServerSide: true,
    },
  });
});

app.get("/api/deriv/oauth/callback", requireApexUser, async (req, res) => {
  const { state, code, error } = req.query;

  if (error) {
    sendRedirect(res, redirectToFrontend({
      deriv_oauth: "failed",
      reason: "Deriv connection cancelled or failed.",
    }));
    return;
  }

  pruneExpiredOauthStates();
  const stateRecord = state ? oauthStates.get(String(state)) : null;
  if (!stateRecord || stateRecord.userId !== req.user.id) {
    sendRedirect(res, redirectToFrontend({
      deriv_oauth: "failed",
      reason: "Invalid or expired OAuth state.",
    }));
    return;
  }

  oauthStates.delete(String(state));

  if (!code) {
    sendRedirect(res, redirectToFrontend({
      deriv_oauth: "failed",
      reason: "OAuth callback returned no code.",
    }));
    return;
  }

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: String(code),
      redirect_uri: derivRedirectUri,
      client_id: derivClientId,
      code_verifier: stateRecord.codeVerifier,
    });

    const tokenPayload = await fetchJson(derivTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    });

    derivSessionsByUser.set(req.user.id, {
      accessToken: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token || "",
      expiresAt: tokenPayload.expires_in ? Date.now() + Number(tokenPayload.expires_in) * 1000 : null,
      tokenType: tokenPayload.token_type || "Bearer",
      linkedAt: new Date().toISOString(),
    });

    // Tokens are intentionally held only in temporary backend memory for development.
    // Production must store Deriv tokens server-side only, encrypted at rest, never in frontend storage.
    sendRedirect(res, redirectToFrontend({
      deriv_oauth: "linked",
    }));
  } catch (exchangeError) {
    sendRedirect(res, redirectToFrontend({
      deriv_oauth: "failed",
      reason: safeErrorMessage(exchangeError),
    }));
  }
});

app.get("/api/deriv/accounts", requireApexUser, async (req, res) => {
  const session = requireDerivSession(req, res);
  if (!session) {
    return;
  }

  try {
    const payload = await fetchJson(derivAccountsUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
    });
    const accounts = normalizeDerivAccounts(payload);
    const demoOptionsAccount = getDemoOptionsAccount(accounts);
    if (demoOptionsAccount) {
      selectedDerivAccountByUser.set(req.user.id, demoOptionsAccount.id);
    }

    res.json({
      linked: true,
      accounts,
      demoAccountAvailable: Boolean(demoOptionsAccount),
      selectedAccountId: demoOptionsAccount?.id || selectedDerivAccountByUser.get(req.user.id) || "",
    });
  } catch (accountsError) {
    res.status(accountsError.status || 502).json({
      error: "deriv_accounts_failed",
      message: safeErrorMessage(accountsError),
    });
  }
});

app.get("/api/deriv/connection-status", requireApexUser, (req, res) => {
  const session = getDerivSession(req.user.id);
  const selectedAccountId = selectedDerivAccountByUser.get(req.user.id) || "";
  res.json({
    oauthLinked: Boolean(session?.accessToken),
    demoAccountAvailable: Boolean(selectedAccountId),
    currentAccountId: selectedAccountId,
    status: session?.accessToken ? (selectedAccountId ? "demo_pending" : "oauth_linked") : "not_linked",
  });
});

app.use(async (req, res, next) => {
  const otpMatch = req.path.match(/^\/api\/deriv\/options\/accounts\/([^/]+)\/otp$/);
  if (!otpMatch || req.method !== "POST") {
    next();
    return;
  }

  requireApexUser(req, res, async () => {
    const session = requireDerivSession(req, res);
    if (!session) {
      return;
    }

    const accountId = decodeURIComponent(otpMatch[1]);
    selectedDerivAccountByUser.set(req.user.id, accountId);

    try {
      const payload = await fetchJson(`https://api.derivws.com/trading/v1/options/accounts/${encodeURIComponent(accountId)}/otp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json",
        },
      });

      res.json({
        accountId,
        wsUrl: payload.websocket_url || payload.ws_url || payload.url || "",
      });
    } catch (otpError) {
      res.status(otpError.status || 502).json({
        error: "deriv_otp_failed",
        message: safeErrorMessage(otpError),
      });
    }
  });
});

app.get("/api/settings", requireApexUser, (req, res) => {
  const settings = settingsByUser.get(req.user.id) || defaultSettings;
  res.json({
    userId: req.user.id,
    settings,
    source: settingsByUser.has(req.user.id) ? "memory" : "default",
  });
});

app.post("/api/settings", requireApexUser, (req, res) => {
  const previous = settingsByUser.get(req.user.id) || defaultSettings;
  const next = {
    ...previous,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  settingsByUser.set(req.user.id, next);

  res.json({
    status: "saved",
    userId: req.user.id,
    settings: next,
  });
});

app.get("/api/activity", requireApexUser, (req, res) => {
  res.json({
    userId: req.user.id,
    activity: activityByUser.get(req.user.id) || [],
  });
});

app.post("/api/activity", requireApexUser, (req, res) => {
  const activity = activityByUser.get(req.user.id) || [];
  const entry = createActivityEntry(req.body || {});
  const next = [entry, ...activity].slice(0, 100);
  activityByUser.set(req.user.id, next);

  res.status(201).json({
    status: "recorded",
    activity: entry,
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: "not_found",
    message: "Endpoint not found.",
  });
});

app.use((err, _req, res, _next) => {
  console.error("[apextrend-server]", err.message);
  res.status(err.status || 500).json({
    error: "server_error",
    message: "ApexTrend backend could not complete the request.",
  });
});

app.listen(port, () => {
  console.log(`ApexTrend backend listening on http://127.0.0.1:${port}`);
  if (!supabaseAdmin) {
    console.log("Supabase admin client is not configured. Add env values when production storage is ready.");
  }
});
