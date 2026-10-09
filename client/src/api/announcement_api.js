import { axiosInstance } from "./axios.js";

export const createAnnouncementApi = async (data) => {
  try {
    const res = await axiosInstance.post(
      "/announcement/create-announcement",
      data,
    );
    return res.data;
  } catch (error) {
    console.error("Create announcement error:", error.message);
    throw error;
  }
};

export const getAnnouncementApi = async () => {
  try {
    const res = await axiosInstance.get("/announcement/get-announcement");
    return res.data.allAnnouncementData;
  } catch (error) {
    console.error("Get announcement error:", error.message);
    throw error;
  }
};
