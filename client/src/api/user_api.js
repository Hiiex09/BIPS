import { axiosInstance } from "./axios.js";

export const countAllResident = async () => {
  const res = await axiosInstance.get("/users/admin");
  return res.data.count;
};

export const getUsersListApi = async (params = {}) => {
  const res = await axiosInstance.get("/users/admin/list", { params });
  return res.data.users;
};
