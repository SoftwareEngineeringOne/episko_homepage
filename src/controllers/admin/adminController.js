import Post from "../../models/post.js";
import User from "../../models/user.js";

export const adminController = {
  displayAdminDashboard: async (req, res) => {
    const posts = await Post.getAll();
    const users = await User.getAll();
    res.render("admin/dashboard", { posts, users });
  },
};
