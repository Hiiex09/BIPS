import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncementApi,
  getAnnouncementApi,
} from "../api/announcement_api.js";

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncementApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (err) => {
      console.error("Create announcement failed:", err);
    },
  });
};

export const useAnnouncements = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncementApi,
  });

  return { data, isLoading, error };
};

// Backwards compatibility aliases
export const createAnnouncement = useCreateAnnouncement;
export const getAnnouncement = useAnnouncements;
