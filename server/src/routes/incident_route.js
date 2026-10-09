import express from "express";
import {
  createIncident,
  getAllIncidents,
  getMyIncidents,
  updateIncident,
} from "../controllers/incident_controller.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { protectRoute } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post(
  "/",
  protectRoute,
  authorizedRoles("Resident"),
  createIncident,
);

router.get(
  "/my-incidents",
  protectRoute,
  authorizedRoles("Resident"),
  getMyIncidents,
);

router.get(
  "/",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  getAllIncidents,
);

router.patch(
  "/:id",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  updateIncident,
);

export default router;
