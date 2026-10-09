import { axiosInstance } from "./axios.js";

// ── Public / Resident: Get published stories feed ──────────
export const getPublishedStoriesApi = async (params = {}) => {
  const res = await axiosInstance.get("/stories/published", { params });
  return res.data;
};

// ── Resident: Submit new story ──────────────────────────────
export const submitStoryApi = async (storyData) => {
  const res = await axiosInstance.post("/stories", storyData);
  return res.data;
};

// ── Resident: Get own submissions ───────────────────────────
export const getMyStoriesApi = async () => {
  const res = await axiosInstance.get("/stories/my-stories");
  return res.data;
};

// ── Resident: Update pending submission ─────────────────────
export const updateMyStoryApi = async ({ id, data }) => {
  const res = await axiosInstance.patch(`/stories/${id}`, data);
  return res.data;
};

// ── Resident: Delete pending submission ─────────────────────
export const deleteMyStoryApi = async (id) => {
  const res = await axiosInstance.delete(`/stories/${id}`);
  return res.data;
};

// ── Admin / Staff: Get all stories in moderation queue ───────
export const getAllStoriesAdminApi = async (params = {}) => {
  const res = await axiosInstance.get("/stories/admin/all", { params });
  return res.data;
};

// ── Admin / Staff: Update story moderation status ───────────
export const updateStoryStatusApi = async ({ id, status, reviewerNotes }) => {
  const res = await axiosInstance.patch(`/stories/admin/${id}/status`, {
    status,
    reviewerNotes,
  });
  return res.data;
};

// ── Admin / Staff: Delete story permanently ─────────────────
export const deleteStoryAdminApi = async (id) => {
  const res = await axiosInstance.delete(`/stories/admin/${id}`);
  return res.data;
};

