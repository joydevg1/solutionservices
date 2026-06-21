import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearAuthToken } from "../api";

const STORAGE_USER = "ss_user";
const STORAGE_LOCATION = "ss_location";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USER) || "null");
    } catch {
      return null;
    }
  });
  const [location, setLocationState] = useState(
    () => localStorage.getItem(STORAGE_LOCATION) || ""
  );

  useEffect(() => {
    const onLogout = () => setUserState(null);
    window.addEventListener("ss:logout", onLogout);
    return () => window.removeEventListener("ss:logout", onLogout);
  }, []);

  const setUser = (next) => {
    setUserState(next);
    if (next) localStorage.setItem(STORAGE_USER, JSON.stringify(next));
    else {
      localStorage.removeItem(STORAGE_USER);
      clearAuthToken();
    }
  };

  const setLocation = (value) => {
    setLocationState(value);
    localStorage.setItem(STORAGE_LOCATION, value);
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      location,
      setLocation,
      logout,
      isAdmin: user?.role === "admin",
      isSubscriber: user?.role === "subscriber",
      isCustomer: user?.role === "customer",
    }),
    [user, location]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
