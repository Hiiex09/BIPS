import express from "express";
import { PostAnnouncement } from "../controllers/announcement_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { validate } from "../middlewares/validate.js";
import { createAnnouncementSchema } from "../middlewares/announcement_validation.js";

const router = express.Router();

router.post(
  "/announcement",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  validate(createAnnouncementSchema),
  PostAnnouncement,
);

export default router;
