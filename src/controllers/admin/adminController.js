import Post from "../../models/post.js";
import User from "../../models/user.js";

export const adminController = {
  displayAdminDashboard: async (req, res) => {
    const posts = await Post.getAll();
    const users = await User.getAll();
    res.render("admin/dashboard", { posts, users });
  },

  updateUserRole: async (req, res) => {
    try {
      if (!req.params.username) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
        return;
      }

      const { role } = req.body;
      console.log("Role: ", role);

      const user = await User.getWithUsername(req.params.username);
      user.updateRole(role);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end();
    } catch (err) {
      console.error("Error updating user role: ", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }

    res.end();
  },

  deleteUser: async (req, res) => {
    if (!req.params.username) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    const user = await User.getWithUsername(req.params.username);
    if (!user) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("User not found");
      return;
    }

    try {
      await user.delete();
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("User deleted successfully");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }

    res.end()
  }
};
