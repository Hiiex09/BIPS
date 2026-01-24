import axios from "axios";

export const checkAuth = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/checkAuth", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/login",
      data, // 1️⃣ payload goes here
      { withCredentials: true }, // 2️⃣ config goes here
    );
    return res.data;
  } catch (error) {
    throw error; // optional, so React Query knows it failed
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/logout",
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
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
