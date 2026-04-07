import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);
const STORAGE_KEY = "educore_auth";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).token : "";
  });
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).user : null;
  });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    async function hydrate() {
      if (!token) {
        setBooting(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        setUser(response.user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: response.user }));
      } catch (_error) {
        localStorage.removeItem(STORAGE_KEY);
        setToken("");
        setUser(null);
      } finally {
        setBooting(false);
      }
    }

    hydrate();
  }, [token]);

  async function login(credentials) {
    const response = await loginUser(credentials);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    return response;
  }

  async function signup(payload) {
    const response = await registerUser(payload);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    return response;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken("");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      booting,
      login,
      signup,
      logout,
    }),
    [token, user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
