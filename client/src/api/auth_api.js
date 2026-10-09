import { axiosInstance } from "./axios.js";

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/auth/checkAuth");
    return res.data;
  } catch (error) {
    console.error("Auth check failed:", error.message);
    return null;
  }
};

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const googleLoginUser = async (data) => {
  const res = await axiosInstance.post("/auth/google", data);
  return res.data;
};

export const signupUser = async (formData) => {
  const res = await axiosInstance.post("/auth/signup", formData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getUserInfo = async () => {
  const res = await axiosInstance.get("/users/resident");
  return res.data;
};
