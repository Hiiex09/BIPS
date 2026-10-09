import { axiosInstance } from "./axios.js";

export const countAllResident = async () => {
  const res = await axiosInstance.get("/users/admin");
  return res.data.count;
};

export const getUsersListApi = async (params = {}) => {
  const res = await axiosInstance.get("/users/admin/list", { params });
  return res.data.users;
};

export const createUserApi = async (userData) => {
  const res = await axiosInstance.post("/users/admin/create", userData);
  return res.data;
};

export const updateUserApi = async ({ id, data }) => {
  const res = await axiosInstance.patch(`/users/admin/${id}`, data);
  return res.data;
};

export const deleteUserApi = async (id) => {
  const res = await axiosInstance.delete(`/users/admin/${id}`);
  return res.data;
};
