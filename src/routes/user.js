/**
 * @module routes/user
 * @description Routes for managing user-related endpoints.
 * This module defines endpoints for redirecting to a user's posts and for displaying a user's posts.
 *
 * @requires express
 * @requires ../controllers/user/userController
 */

import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

/**
 * @route GET /:user
 * @description Redirects to the user's posts page, since no dedicated user page exists.
 * @param {Request} req Express request object with req.params.user representing the username.
 * @param {Response} res Express response object.
 */
router.get("/:user", (req, res) => {
  // Redirect to the user's posts page, since no user page exists
  res.redirect(`/user/${req.params.user}/posts`);
});

/**
 * @route GET /:user/posts
 * @description Display posts for the specified user.
 * @param {Request} req Express request object with req.params.user representing the username.
 * @param {Response} res Express response object.
 */
router.get("/:user/posts", UserController.displayUserPosts);

export default router;
