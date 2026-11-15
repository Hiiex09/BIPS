import express from "express";
import rateLimit from "express-rate-limit";
import {
  checkAuth,
  googleLogin,
  login,
  logout,
  signup,
} from "../controllers/auth_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";
import upload from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, signupSchema } from "../validator/auth_validation.js";

const router = express.Router();

// Per-IP limit on credential endpoints (on top of the per-account lockout in login).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts from this device. Try again in 15 minutes." },
});

router.post(
  "/signup",
  authLimiter,
  upload.single("idUpload"),
  validate(signupSchema),
  signup,
);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/google", authLimiter, googleLogin);
router.post("/logout", logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
