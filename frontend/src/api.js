import axios from "axios";
import { clearStoredSession, getStoredToken, isValidUser } from "./utils/auth";

const STORAGE_TOKEN = "ss_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 120000,
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(requestFn, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      const isNetwork = !error.response;
      if (!isNetwork || attempt === retries) break;
      await sleep(4000 * (attempt + 1));
    }
  }
  throw lastError;
}

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredSession();
      window.dispatchEvent(new Event("ss:logout"));
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) localStorage.setItem(STORAGE_TOKEN, token);
  else localStorage.removeItem(STORAGE_TOKEN);
}

export function clearAuthToken() {
  localStorage.removeItem(STORAGE_TOKEN);
}

export function getApiErrorMessage(error, fallback) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === "ECONNABORTED") {
    return "Server is waking up. Please wait 30 seconds and try again.";
  }
  if (!error.response) {
    if (error.code === "ERR_NETWORK") {
      return "Server is waking up. Wait 30 seconds and try again.";
    }
    const base = import.meta.env.VITE_API_BASE_URL || "/api";
    if (base.startsWith("/")) {
      return "Cannot reach /api proxy. Redeploy Cloudflare Pages (latest commit) and test /api/health.";
    }
    return `Cannot reach API at ${base}. Check deployment settings.`;
  }
  return fallback;
}

export async function createSession({ name, email, role, adminKey }) {
  const { data } = await withRetry(() =>
    api.post("/users/session", { name, email, role, adminKey })
  );
  if (!data?.token || !isValidUser(data?.user)) {
    throw new Error("Invalid session response from server.");
  }
  setAuthToken(data.token);
  return data.user;
}

export async function fetchCurrentUser() {
  const { data } = await withRetry(() => api.get("/users/me"));
  if (!isValidUser(data)) {
    throw new Error("Invalid user profile.");
  }
  return data;
}

export async function upgradeToSubscriber(userId) {
  const { data } = await api.patch(`/users/${userId}/role`, { role: "subscriber" });
  if (data.token) setAuthToken(data.token);
  return data.user;
}

export async function fetchServices() {
  const { data } = await api.get("/services");
  return data;
}

export async function fetchOffers() {
  const { data } = await api.get("/offers");
  return data;
}

export async function fetchRecommendations(email) {
  const { data } = await api.get("/services/recommendations", { params: { email } });
  return data;
}

export async function submitBooking(payload) {
  const { data } = await api.post("/bookings", payload);
  return data;
}

export async function fetchBookings({ status } = {}) {
  const { data } = await api.get("/bookings", { params: { status } });
  return data;
}

export async function updateBookingStatus(id, status) {
  const { data } = await api.patch(`/bookings/${id}/status`, { status });
  return data;
}

export async function sendChatMessage(message, userId) {
  const { data } = await api.post("/chat", { message, userId });
  return data;
}

export async function fetchChatHistory(userId) {
  const { data } = await api.get(`/chat/history/${userId}`);
  return data;
}

export async function fetchChatUsers() {
  const { data } = await api.get("/chat/users");
  return data;
}

export async function addCustomService(service) {
  const { data } = await api.post("/catalog/custom", service);
  return data;
}

export async function addOffer(offer) {
  const { data } = await api.post("/offers", offer);
  return data;
}

export async function fetchCustomServices() {
  const { data } = await api.get("/catalog/custom");
  return data;
}
