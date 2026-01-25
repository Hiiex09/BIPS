import express from "express";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { validateCertificateRequest } from "../middlewares/certificate_validation_req.js";
import {
  approveRequest,
  createCertificateRequest,
  requestReady,
} from "../controllers/cert_request_controller.js";

const router = express.Router();

router.post(
  "/certificate",
  protectRoute,
  authorizedRoles("Resident"),
  validateCertificateRequest,
  createCertificateRequest,
);

router.patch(
  "/request/:id/approve",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  approveRequest,
);

router.patch(
  "/request/:id/ready",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  requestReady,
);
export default router;
