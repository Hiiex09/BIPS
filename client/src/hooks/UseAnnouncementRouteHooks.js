import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementApi } from "../api/announcement_api";

export const createAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncementApi,
    onSuccess: () => {
      console.log("New announcement created");
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
    },
    onError: (err) => {
      console.error("Create failed:", err);
    },
  });
};
