/**
 * @module routes/posts
 * @description Routes for managing blog posts.
 * This module defines endpoints to display, create, update, delete, publish, and archive posts.
 *
 * @requires express
 * @requires ../controllers/post/postController
 * @requires ../models/user
 * @requires ../middleware/protectionMiddleware
 */

import express from "express";
import { PostController } from "../controllers/post/postController.js";
import { Roles } from "../models/user.js";
import { protectionMiddleware } from "../middleware/protectionMiddleware.js";

const router = express.Router();

const adminAuthorOnly = protectionMiddleware.roleRequired([
  Roles.ADMIN,
  Roles.AUTHOR,
]);
const adminOnly = protectionMiddleware.roleRequired([Roles.ADMIN]);

/**
 * @route GET /
 * @description Retrieve public posts.
 * @returns {Array<object>} List of public posts.
 */
router.get("/", PostController.displayPublicPosts);

/**
 * @route POST /
 * @description Create a new post.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN, Roles.AUTHOR])
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
router.post("/", adminAuthorOnly, PostController.createPost);

/**
 * @route GET /:id/read
 * @description Display a post by its ID.
 * @param {string} id Post ID.
 * @returns {object} Post details.
 */
router.get("/:id/read", PostController.displayPostWithId);

/**
 * @route GET /new
 * @description Display form for creating a new post.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN, Roles.AUTHOR])
 */
router.get("/new", adminAuthorOnly, PostController.displayForm);

/**
 * @route GET /:id/edit
 * @description Display form for editing an existing post.
 * @param {string} id Post ID.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN, Roles.AUTHOR])
 */
router.get("/:id/edit", adminAuthorOnly, PostController.displayForm);

/**
 * @route POST /:id
 * @description Update an existing post.
 * @param {string} id Post ID.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN, Roles.AUTHOR])
 */
router.post("/:id", adminAuthorOnly, PostController.updatePost);

/**
 * @route DELETE /:id
 * @description Delete a specified post.
 * @param {string} id Post ID.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN])
 */
router.delete("/:id", adminOnly, PostController.deletePost);

/**
 * @route POST /:id/approve
 * @description Publish a post by approving it.
 * @param {string} id Post ID.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN])
 */
router.post("/:id/approve", adminOnly, PostController.publishPost);

/**
 * @route POST /:id/archive
 * @description Archive an existing post.
 * @param {string} id Post ID.
 * @middleware protectionMiddleware.roleRequired([Roles.ADMIN])
 */
router.post("/:id/archive", adminOnly, PostController.archivePost);

export default router;
