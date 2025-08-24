import axios from 'axios';
import { getToken } from '@/libs/authStore';
import * as Crypto from "expo-crypto";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: false
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (apiKey) {
      const timestamp = Date.now().toString();

      const signature = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        apiKey + timestamp
      );

      config.headers["x-api-key"] = signature;
      config.headers["x-timestamp"] = timestamp;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    if (error.response && error.response.status === 500) {
      return Promise.reject(error);
    }

    if (error.response) {
      if (error.response.status === 422 && error.response.data?.errors) {
        return Promise.reject({
          type: 'validation',
          errors: error.response.data.errors
        });
      }

      if (error.response.data?.message) {
        return Promise.reject({
          type: 'server',
          message: error.response.data.message
        });
      }
    }

    return Promise.reject({
      type: 'network',
      message: error.message || 'Không thể kết nối máy chủ'
    });
  }
);