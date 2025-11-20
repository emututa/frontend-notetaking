import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // read from .env
  headers: { "Content-Type": "application/json" },
});

export const checkPassword = () => API.get("/api/secrets/check");
export const setPassword = (password: string) => API.post("/api/secrets/set-password", { password });
export const verifyPassword = (password: string) => API.post("/api/secrets/verify", { password });
export const changePassword = (oldPassword: string, newPassword: string) =>
  API.post("/api/secrets/change-password", { oldPassword, newPassword });
