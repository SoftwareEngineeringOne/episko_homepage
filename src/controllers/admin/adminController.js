/**
 * @module controllers/admin/adminController
 * @description Handles admin-related requests.
 *
 * @requires ../../models/post.js
 * @requires ../../models/user.js
 */
import Post from "../../models/post.js";
import User from "../../models/user.js";

/**
 * Admin controller object.
 * @typedef {Object} AdminController
 * @property {function(Request, Response, NextFunction): Promise<void>} displayAdminDashboard - Renders the admin dashboard.
 */
export const AdminController = {
  /**
   * Renders the admin dashboard by fetching all posts and users.
   * @async
   * @function displayAdminDashboard
   * @param {Request} _req - The request object (unused).
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @returns {Promise<void>}
   */
  displayAdminDashboard: async (_req, res, next) => {
    try {
      const posts = await Post.getAll();
      const users = await User.getAll();
      res.render("admin/dashboard", { posts, users });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
