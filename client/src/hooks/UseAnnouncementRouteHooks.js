import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncementApi,
  getAnnouncementApi,
} from "../api/announcement_api.js";

export const createAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncementApi,
    onSuccess: () => {
      console.log("New announcement created");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (err) => {
      console.error("Create failed:", err);
    },
  });
};

export const getAnnouncement = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncementApi,
  });

  return { data, isLoading, error };
};
