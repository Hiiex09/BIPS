import { axiosInstance } from "./axios.js";

export const createIncidentApi = async (data) => {
  const res = await axiosInstance.post("/incidents", data);
  return res.data;
};

export const getMyIncidentsApi = async () => {
  const res = await axiosInstance.get("/incidents/my-incidents");
  return res.data.incidents;
};

export const getIncidentsApi = async (params = {}) => {
  const res = await axiosInstance.get("/incidents", { params });
  return res.data;
};

export const updateIncidentApi = async ({ id, data }) => {
  const res = await axiosInstance.patch(`/incidents/${id}`, data);
  return res.data;
};
