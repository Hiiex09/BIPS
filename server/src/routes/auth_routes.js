import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth_controller.js";
import { protectRoute } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
