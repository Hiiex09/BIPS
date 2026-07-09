import express from "express";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";
import { validateCertificateRequest } from "../middlewares/certificate_validation_req.js";
import {
  approveRequest,
  createCertificateRequest,
  getAllCertificateRequests,
  getMyCertificateRequests,
  rejectRequest,
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

router.get(
  "/my-requests",
  protectRoute,
  authorizedRoles("Resident"),
  getMyCertificateRequests,
);

router.get(
  "/requests",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  getAllCertificateRequests,
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

router.patch(
  "/request/:id/reject",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  rejectRequest,
);
export default router;
