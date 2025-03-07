import express from "express";
import { PostController } from "../controllers/post/postController.js";
import { Roles } from "../models/user.js";
import { protectedMiddleware } from "../middleware/protected.js";

const router = express.Router();

//Public Routes
router.get("/", PostController.displayPublicPosts);
router.get("/:id/read", PostController.displayPostWithId);

// Protected Routes
router.use(protectedMiddleware.roleProtection([Roles.ADMIN, Roles.AUTHOR]));
router.get("/new", PostController.displayForm);
router.get("/:id/edit", PostController.displayForm);

router.post("/", PostController.createPost);
// Using Put would be nicer, but doesnt really work with html forms
router.post("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

router.post("/:id/approve", PostController.publishPost);
router.post("/:id/archive", PostController.archivePost);

export default router;
