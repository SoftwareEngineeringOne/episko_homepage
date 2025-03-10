/**
 * @module routes/admin
 * @description Express router providing API endpoints for administrative tasks.
 * 
 * @requires express
 * @requires ../controllers/admin/adminController
 * @requires ../controllers/user/userController
 * @requires ../middleware/protectionMiddleware
 * @requires ../models/user
 */

import express from "express";
import { AdminController } from "../controllers/admin/adminController.js";
import { UserController } from "../controllers/user/userController.js";
import { protectionMiddleware } from "../middleware/protectionMiddleware.js";
import { Roles } from "../models/user.js";

const router = express.Router();

router.get("/dashboard", AdminController.displayAdminDashboard);

/**
 * @function Middleware
 * @description Ensures that the request is made by a user with ADMIN privileges.
 * @param {Array.<string>} roles - List of roles required to access subsequent routes.
 */
router.use(protectionMiddleware.roleRequired([Roles.ADMIN]));

/**
 * @route GET /
 * @description Redirects the request to the admin dashboard.
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 */
router.get("/", (_req, res) => {
  res.redirect("/admin/dashboard");
});

/**
 * @route GET /dashboard
 * @description Renders the admin dashboard.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */

/**
 * @route POST /users/:username/role
 * @description Updates the role of a user specified by the username route parameter.
 * @param {Request} req - Express request object containing:
 *   @property {string} params.username - The username of the user.
 *   @property {Object} body - The updated role information.
 * @param {Response} res - Express response object.
 */
router.post("/users/:username/role", UserController.updateUserRole);

/**
 * @route DELETE /users/:username
 * @description Deletes the user specified by the username route parameter.
 * @param {Request} req - Express request object containing:
 *   @property {string} params.username - The username of the user to delete.
 * @param {Response} res - Express response object.
 */
router.delete("/users/:username", UserController.deleteUser);

export default router;
