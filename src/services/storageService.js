// Service layer abstraction over the persistence mechanism.
// Today: localStorage. Tomorrow: swap for Supabase / REST without touching components.

const KEY = "farzeen.portfolio.v1";

export const storageService = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },
  reset() {
    localStorage.removeItem(KEY);
  },
  export() {
    const raw = localStorage.getItem(KEY) || "{}";
    return raw;
  },
  import(json) {
    try {
      const parsed = JSON.parse(json);
      localStorage.setItem(KEY, JSON.stringify(parsed));
      return true;
    } catch {
      return false;
    }
  },
};

const AUTH_KEY = "farzeen.portfolio.auth";

export const authService = {
  isAuthed() {
    return localStorage.getItem(AUTH_KEY) === "1";
  },
  login(password, expected) {
    if (password && password === expected) {
      localStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
};
