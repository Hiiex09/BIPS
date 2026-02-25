import express from "express";
import {
  deleteAnnouncement,
  getAnnoucementPost,
  PostAnnouncement,
} from "../controllers/announcement_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { validate } from "../middlewares/validate.js";
import { createAnnouncementSchema } from "../middlewares/announcement_validation.js";

const router = express.Router();

router.post(
  "/create-announcement",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  validate(createAnnouncementSchema),
  PostAnnouncement,
);

router.get("/get-announcement", getAnnoucementPost);

router.patch(
  "/update-announcement/:id",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  validate(createAnnouncementSchema),
  PostAnnouncement,
);

router.delete(
  "/delete-announcement/:id",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  deleteAnnouncement,
);

export default router;
