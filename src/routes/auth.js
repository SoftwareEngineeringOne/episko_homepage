/**
 * @module routes/auth
 * @description Express router providing API endpoints for authentication tasks.
 *
 * @requires express
 * @requires ../controllers/auth/registerController
 * @requires ../controllers/auth/loginController
 * @requires ../controllers/auth/logoutController
 */

import express from "express";
import { RegisterController } from "../controllers/auth/registerController.js";
import { LoginController } from "../controllers/auth/loginController.js";
import { LogoutController } from "../controllers/auth/logoutController.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/user/${req.session.user.username}`);
  } else {
    res.redirect(`/auth/login?next=${encodeURIComponent("/posts")}`);
  }
});

/**
 * @route GET /login
 * @description Renders the login form for the user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.get("/login", LoginController.displayLoginForm);

/**
 * @route POST /login
 * @description Handles the login request submitted by the user.
 * @param {Request} req - Express request object containing:
 *   @property {Object} body - Login credentials.
 * @param {Response} res - Express response object.
 */
router.post("/login", LoginController.handleLoginRequest);

/**
 * @route GET /register
 * @description Renders the registration form for the user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.get("/register", RegisterController.displayRegisterForm);

/**
 * @route POST /register
 * @description Handles the registration request and creates a new user.
 * @param {Request} req - Express request object containing:
 *   @property {Object} body - New user registration data.
 * @param {Response} res - Express response object.
 */
router.post("/register", RegisterController.handleRegisterRequest);

/**
 * @route POST /logout
 * @description Logs out the current user and terminates the session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post("/logout", LogoutController.handleLogoutRequest);

export default router;
