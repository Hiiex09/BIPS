import axios from "axios";

export const createAnnouncementApi = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/announcement",
      data,
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getAnnouncementApi = async (data) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/v1/get-announcement",
      data,
    );

    return res.data.allAnnouncementData;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
