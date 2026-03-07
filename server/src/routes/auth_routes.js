import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";
import upload from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, signupSchema } from "../validator/auth_validation.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("idUpload"),
  validate(signupSchema),
  signup,
);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
