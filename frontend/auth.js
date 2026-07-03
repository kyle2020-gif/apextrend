(function () {
  const SUPABASE_URL = "https://djsugylkgmihqkcxchlu.supabase.co"; // Supabase project URL.
  const SUPABASE_ANON_KEY = "sb_publishable_MTNbJvI7iJW6YTrRfOzRHA_3JOYvN-P"; // Supabase publishable key.

  const authEvents = new EventTarget();
  const isConfigured = SUPABASE_URL !== "SUPABASE_URL" && SUPABASE_ANON_KEY !== "SUPABASE_ANON_KEY";
  const client = isConfigured && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  let currentSession = null;
  let currentUser = null;
  let initialized = false;

  function emitAuthChange(eventName = "auth-change") {
    authEvents.dispatchEvent(new CustomEvent(eventName, {
      detail: {
        configured: Boolean(client),
        initialized,
        session: currentSession,
        user: currentUser,
        authenticated: Boolean(currentSession && currentUser),
      },
    }));
  }

  function addAuthListener(name, callback) {
    authEvents.addEventListener(name, callback);
  }

  function getAuthState() {
    return {
      configured: Boolean(client),
      initialized,
      session: currentSession,
      user: currentUser,
      authenticated: Boolean(currentSession && currentUser),
    };
  }

  function getUserEmail() {
    return currentUser?.email || "";
  }

  function getClient() {
    return client;
  }

  async function initializeAuth() {
    if (!client) {
      initialized = true;
      emitAuthChange("auth-change");
      return getAuthState();
    }

    const { data, error } = await client.auth.getSession();
    if (error) {
      currentSession = null;
      currentUser = null;
      initialized = true;
      emitAuthChange("auth-error");
      throw error;
    }

    currentSession = data.session || null;
    currentUser = currentSession?.user || null;
    initialized = true;
    emitAuthChange("auth-change");
    return getAuthState();
  }

  async function signUp(email, password, metadata = {}) {
    assertConfigured();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) {
      throw error;
    }
    currentSession = data.session || currentSession;
    currentUser = data.user || currentSession?.user || null;
    emitAuthChange("auth-change");
    return data;
  }

  async function signIn(email, password) {
    assertConfigured();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    currentSession = data.session || null;
    currentUser = data.user || currentSession?.user || null;
    emitAuthChange("auth-change");
    return data;
  }

  async function signOut() {
    assertConfigured();
    const { error } = await client.auth.signOut();
    if (error) {
      throw error;
    }
    currentSession = null;
    currentUser = null;
    emitAuthChange("auth-change");
  }

  async function resetPassword(email) {
    assertConfigured();
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname + "#login",
    });
    if (error) {
      throw error;
    }
    return data;
  }

  async function updatePassword(password) {
    assertConfigured();
    const { data, error } = await client.auth.updateUser({ password });
    if (error) {
      throw error;
    }
    currentUser = data.user || currentUser;
    emitAuthChange("auth-change");
    return data;
  }

  function assertConfigured() {
    if (!client) {
      throw new Error("Supabase Auth is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY in auth.js.");
    }
  }

  if (client) {
    client.auth.onAuthStateChange((event, session) => {
      currentSession = session || null;
      currentUser = currentSession?.user || null;
      initialized = true;
      emitAuthChange(event || "auth-change");
    });
  }

  window.ApexAuth = {
    addAuthListener,
    getClient,
    getAuthState,
    getUserEmail,
    initializeAuth,
    isAuthenticated: () => Boolean(currentSession && currentUser),
    resetPassword,
    signIn,
    signOut,
    signUp,
    updatePassword,
  };
}());
