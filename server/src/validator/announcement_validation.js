import z from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.enum(["General", "Meeting", "Emergency", "Event", "Curfew"]),
  priority: z.enum(["Normal", "Important", "Urgent"]).optional(),
  status: z.enum(["Draft", "Published"]).optional(),
  expiresAt: z.string().optional(),
});
