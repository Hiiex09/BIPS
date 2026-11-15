import axios from "axios";

const getBaseURL = () => {
  // In development, use localhost
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
  }

  // In production, use the environment variable or fall back to relative path.
  // Strip a stray BOM / whitespace (e.g. pasted from a UTF-8-with-BOM file),
  // otherwise the URL becomes relative and requests hit the frontend host.
  const apiUrl = import.meta.env.VITE_API_URL?.replace(/^﻿/, "").trim();
  if (apiUrl) {
    return apiUrl;
  }

  // Last resort: use relative path (assumes API is on same domain)
  return "/api/v1";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - token might be expired
      console.warn("Unauthorized access - redirecting to login");
      // Clear auth state if needed
    }
    if (error.response?.status === 403) {
      // Forbidden
      console.warn("Access forbidden");
    }
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }
    return Promise.reject(error);
  },
);
