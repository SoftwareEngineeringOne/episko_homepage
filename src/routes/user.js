import express from "express";
import { userController } from "../controllers/user/userController.js";

const router = express.Router();

router.get("/:user", (req, res) => {
  // Redirect to the user's posts page, since no user page exists
  res.redirect(`/user/${req.params.user}/posts`);
});
router.get("/:user/posts", userController.onUserPosts);

export default router;
