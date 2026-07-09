import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/certificate";

export const createCertificateRequestApi = async (data) => {
  const res = await axios.post(`${BASE_URL}/certificate`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const getMyCertificateRequestsApi = async () => {
  const res = await axios.get(`${BASE_URL}/my-requests`, {
    withCredentials: true,
  });
  return res.data.requests;
};

export const getCertificateRequestsApi = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}/requests`, {
    params,
    withCredentials: true,
  });
  return res.data.requests;
};

export const approveCertificateRequestApi = async (id) => {
  const res = await axios.patch(
    `${BASE_URL}/request/${id}/approve`,
    {},
    { withCredentials: true },
  );
  return res.data;
};

export const readyCertificateRequestApi = async (id) => {
  const res = await axios.patch(
    `${BASE_URL}/request/${id}/ready`,
    {},
    { withCredentials: true },
  );
  return res.data;
};

export const rejectCertificateRequestApi = async (id) => {
  const res = await axios.patch(
    `${BASE_URL}/request/${id}/reject`,
    {},
    { withCredentials: true },
  );
  return res.data;
};
