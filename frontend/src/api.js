import axios from "axios";

const STORAGE_TOKEN = "ss_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      localStorage.removeItem("ss_user");
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

export async function createSession({ name, email, role, adminKey }) {
  const { data } = await api.post("/users/session", { name, email, role, adminKey });
  setAuthToken(data.token);
  return data.user;
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
