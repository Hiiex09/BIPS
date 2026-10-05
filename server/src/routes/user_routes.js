import express from "express";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { getUserInfo } from "../controllers/user_controller.js";
import {
  getAllResident,
  getUsersList,
  totalAnnouncement,
  totalCertificateRequest,
} from "../controllers/admin_controller.js";

const router = express.Router();

router.get(
  "/admin",
  protectRoute,
  authorizedRoles("Admin"),
  getAllResident,
);

router.get(
  "/admin/staff",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  getAllResident,
);

router.get(
  "/admin/list",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  getUsersList,
);

router.get(
  "/admin/total",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  totalCertificateRequest,
);

router.get("/total/announcement", totalAnnouncement);

router.get(
  "/resident",
  protectRoute,
  authorizedRoles("Admin", "Staff", "Resident"),
  getUserInfo,
);

export default router;
