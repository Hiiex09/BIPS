import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/incidents";

export const createIncidentApi = async (data) => {
  const res = await axios.post(BASE_URL, data, {
    withCredentials: true,
  });
  return res.data;
};

export const getMyIncidentsApi = async () => {
  const res = await axios.get(`${BASE_URL}/my-incidents`, {
    withCredentials: true,
  });
  return res.data.incidents;
};

export const getIncidentsApi = async (params = {}) => {
  const res = await axios.get(BASE_URL, {
    params,
    withCredentials: true,
  });
  return res.data.incidents;
};

export const updateIncidentApi = async ({ id, data }) => {
  const res = await axios.patch(`${BASE_URL}/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};
