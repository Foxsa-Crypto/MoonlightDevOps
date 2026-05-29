import axios from "axios";
import toast from "react-hot-toast";
import { navigate } from "../utils/navigate/navigate";
import { logoutFn } from "../utils/authBridge/logout";
let redirecting = false;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {"Content-Type": "application/json"}
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    response => response,
    error => {
      const status = error.response?.status;

      if ((status === 401 || status === 403) && !redirecting) {
        redirecting = true;
        logoutFn?.();
        toast.error("Sessão expirada. Faça login novamente.");
        navigate?.("/login");
      }

      const message = error.response?.data?.message || "Erro inesperado.";
      return Promise.reject(new Error(message));
    }
);
