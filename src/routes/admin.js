import express from "express";
import { adminController } from "../controllers/admin/adminController.js";
import { protectedMiddleware } from "../middleware/protected.js";
import { Roles } from "../models/user.js";

/** Express router providing API routes */
const router = express.Router();

// router.use(protectedMiddleware.roleProtection([Roles.ADMIN]));

router.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", adminController.displayAdminDashboard);

router.post("/users/:username/role", adminController.updateUserRole);

router.delete("/users/:username", adminController.deleteUser);

export default router;
