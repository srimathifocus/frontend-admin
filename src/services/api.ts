import axios from "axios";
import { loadingBus } from "../utils/loadingBus";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor: add auth token and start global loader
api.interceptors.request.use(
  (config) => {
    loadingBus.start();
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    loadingBus.stop();
    return Promise.reject(error);
  }
);

// Response interceptor: stop loader and handle errors
api.interceptors.response.use(
  (response) => {
    loadingBus.stop();
    return response;
  },
  (error) => {
    loadingBus.stop();
    // Handle different types of errors
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network Error:", error.message);
    } else if (error.response?.status === 0) {
      console.error("CORS or Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
