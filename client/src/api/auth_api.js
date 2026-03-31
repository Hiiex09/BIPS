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
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

export const signupUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/auth/signup", formData);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/resident", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
