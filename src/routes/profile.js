import express from "express";
import { profileController } from "../controllers/profile/profileController.js";

const router = express.Router();

router.get("/:user", (req, res) => {
  // Redirect to the user's posts page, since no profile page exists
  res.redirect(`/profile/${req.params.user}/posts`);
});
router.get("/:user/posts", profileController.onUserPosts);

export default router;
