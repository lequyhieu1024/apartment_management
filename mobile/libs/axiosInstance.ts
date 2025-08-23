import axios from "axios";
import {getToken} from "@/libs/authStore";

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: false,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (apiKey) {
            config.headers['apiKey'] = apiKey;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 500) {
            return Promise.reject(error);
        }

      if (error.response) {
        if (error.response.status === 422 && error.response.data?.errors) {
          return Promise.reject({
            type: "validation",
            errors: error.response.data.errors,
          });
        }

        if (error.response.data?.message) {
          return Promise.reject({
            type: "server",
            message: error.response.data.message,
          });
        }
      }

      return Promise.reject({
        type: "network",
        message: error.message || "Không thể kết nối máy chủ",
      });
    }
);