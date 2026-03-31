import { axiosInstance } from "./axios.js";

export const countAllResident = async () => {
  try {
    const res = await axiosInstance.get("/users/admin");
    return res.data.count;
  } catch (error) {
    console.error("Failed to count residents:", error.message);
    throw error;
  }
};
