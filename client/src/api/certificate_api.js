import { axiosInstance } from "./axios.js";

export const createCertificateRequestApi = async (data) => {
  const res = await axiosInstance.post("/certificate/certificate", data);
  return res.data;
};

export const getMyCertificateRequestsApi = async () => {
  const res = await axiosInstance.get("/certificate/my-requests");
  return res.data.requests;
};

export const getCertificateRequestsApi = async (params = {}) => {
  const res = await axiosInstance.get("/certificate/requests", { params });
  return res.data;
};

export const approveCertificateRequestApi = async (id, data = {}) => {
  const res = await axiosInstance.patch(`/certificate/request/${id}/approve`, data);
  return res.data;
};

export const readyCertificateRequestApi = async (id, data = {}) => {
  const res = await axiosInstance.patch(`/certificate/request/${id}/ready`, data);
  return res.data;
};

export const rejectCertificateRequestApi = async (id, data = {}) => {
  const res = await axiosInstance.patch(`/certificate/request/${id}/reject`, data);
  return res.data;
};
