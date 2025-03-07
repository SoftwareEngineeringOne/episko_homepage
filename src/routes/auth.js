import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { logoutController } from "../controllers/auth/logoutController.js";

/**
 * @module routes/auth
 */

/** Express router providing auth routes */
const router = express.Router();

/**
 * Route serving login page.
 * @name get/login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
router.get("/login", loginController.handleGetRequest);

/**
 * Route handling login form submission.
 * @name post/login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
router.post("/login", loginController.handlePostRequest);

/**
 * Route serving registration page.
 * @name get/register
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
router.get("/register", registerController.handleGetRequest);

/**
 * Route handling registration form submission.
 * @name post/register
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
router.post("/register", registerController.handlePostRequest);

/**
 * Route handling logout request.
 * @name post/logout
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
router.post("/logout", logoutController.handlePostRequest);

export default router;
