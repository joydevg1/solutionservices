const STORAGE_TOKEN = "ss_token";

export function getStoredToken() {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function isValidUser(user) {
  return (
    user &&
    typeof user === "object" &&
    !Array.isArray(user) &&
    user.id != null &&
    typeof user.email === "string" &&
    user.email.length > 0 &&
    typeof user.name === "string" &&
    user.name.length > 0 &&
    typeof user.role === "string" &&
    user.role.length > 0
  );
}

export function isTokenUsable(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload?.exp) return true;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function readStoredSession() {
  try {
    const token = getStoredToken();
    const raw = localStorage.getItem("ss_user");
    const user = raw ? JSON.parse(raw) : null;
    if (!isValidUser(user) || !isTokenUsable(token)) {
      localStorage.removeItem("ss_user");
      localStorage.removeItem(STORAGE_TOKEN);
      return { user: null, token: null };
    }
    return { user, token };
  } catch {
    localStorage.removeItem("ss_user");
    localStorage.removeItem(STORAGE_TOKEN);
    return { user: null, token: null };
  }
}

export function clearStoredSession() {
  localStorage.removeItem("ss_user");
  localStorage.removeItem(STORAGE_TOKEN);
}
