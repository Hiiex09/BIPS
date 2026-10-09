import express from "express";
import {
  createStory,
  getMyStories,
  updateMyStory,
  deleteMyStory,
  getPublishedStories,
  getAllStoriesAdmin,
  updateStoryStatus,
  deleteStoryAdmin,
} from "../controllers/story_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";

const router = express.Router();

// Public / Resident live feed
router.get("/published", getPublishedStories);

// Resident submission CRUD
router.post("/", protectRoute, authorizedRoles("Resident", "Staff", "Admin"), createStory);
router.get("/my-stories", protectRoute, getMyStories);
router.patch("/:id", protectRoute, updateMyStory);
router.delete("/:id", protectRoute, deleteMyStory);

// Admin & Staff moderation
router.get("/admin/all", protectRoute, authorizedRoles("Admin", "Staff"), getAllStoriesAdmin);
router.patch("/admin/:id/status", protectRoute, authorizedRoles("Admin", "Staff"), updateStoryStatus);
router.delete("/admin/:id", protectRoute, authorizedRoles("Admin", "Staff"), deleteStoryAdmin);

export default router;

