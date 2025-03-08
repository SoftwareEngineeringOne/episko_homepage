import Post from "../../models/post.js";

export const userController = {
  onUserPosts: async (req, res, next) => {
    try {
      const user = req.params.user;
      console.log("User:", user);
      const posts = await Post.getByAuthor(user);
      console.log("Posts:", posts);
      res.render("user/posts", { posts, user });
    } catch (err) {
      next(err);
    }
  },
};
