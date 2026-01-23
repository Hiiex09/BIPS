import express from "express";
import { protectRoute } from "../middlewares/auth_middleware.js";
import { authorizedRoles } from "../middlewares/auth_roles.js";

const router = express.Router();

router.get("/admin", protectRoute, authorizedRoles("Admin"), (req, res) => {
  res.send("Welcome Admin");
});
router.get(
  "/staff",
  protectRoute,
  authorizedRoles("Admin", "Staff"),
  (req, res) => {
    res.send("Welcome Staff");
  },
);
router.get(
  "/resident",
  protectRoute,
  authorizedRoles("Admin", "Staff", "Resident"),
  (req, res) => {
    res.send("Welcome Resident");
  },
);

export default router;
