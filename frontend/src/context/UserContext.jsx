import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearAuthToken, fetchCurrentUser } from "../api";
import { clearStoredSession, isValidUser, readStoredSession } from "../utils/auth";

const STORAGE_USER = "ss_user";
const STORAGE_LOCATION = "ss_location";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => readStoredSession().user);
  const [authReady, setAuthReady] = useState(false);
  const [location, setLocationState] = useState(
    () => localStorage.getItem(STORAGE_LOCATION) || ""
  );

  useEffect(() => {
    let cancelled = false;

    async function validateSession() {
      const session = readStoredSession();
      if (!session.user) {
        if (!cancelled) {
          setUserState(null);
          setAuthReady(true);
        }
        return;
      }

      try {
        const verified = await fetchCurrentUser();
        if (!cancelled) {
          setUserState(verified);
          localStorage.setItem(STORAGE_USER, JSON.stringify(verified));
        }
      } catch {
        clearStoredSession();
        if (!cancelled) setUserState(null);
      } finally {
        if (!cancelled) setAuthReady(true);
      }
    }

    validateSession();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onLogout = () => {
      clearStoredSession();
      setUserState(null);
    };
    window.addEventListener("ss:logout", onLogout);
    return () => window.removeEventListener("ss:logout", onLogout);
  }, []);

  const setUser = (next) => {
    if (!isValidUser(next)) {
      clearStoredSession();
      setUserState(null);
      return;
    }
    setUserState(next);
    localStorage.setItem(STORAGE_USER, JSON.stringify(next));
  };

  const setLocation = (value) => {
    setLocationState(value);
    localStorage.setItem(STORAGE_LOCATION, value);
  };

  const logout = () => {
    clearStoredSession();
    clearAuthToken();
    setUserState(null);
  };

  const value = useMemo(
    () => ({
      user,
      authReady,
      setUser,
      location,
      setLocation,
      logout,
      isAdmin: user?.role === "admin",
      isSubscriber: user?.role === "subscriber",
      isCustomer: user?.role === "customer",
    }),
    [user, authReady, location]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
