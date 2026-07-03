export function createClient(url, _key, options = {}) {
  return {
    url,
    options,
    auth: {
      async getUser() {
        return {
          data: { user: null },
          error: new Error("Supabase admin verification is a Phase 7B placeholder."),
        };
      },
    },
  };
}
