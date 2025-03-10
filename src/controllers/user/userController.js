/**
 * @module controllers/user/userController
 * @description Contains controller methods for handling user-related requests.
 * 
 * @requires ../../models/post.js
 * @requires ../../models/user.js
 * @requires ../../util/controller.js
 */
import Post from "../../models/post.js";
import User from "../../models/user.js";
import { endBadRequest, endInternalError, endNotFound, endSuccess } from "../../util/controller.js";

/**
 * User Controller object.
 * @typedef {Object} UserController
 * @property {function(Request, Response, NextFunction): Promise<void>} displayUserPosts - Renders posts authored by a specified user.
 * @property {function(Request, Response): Promise<void>} updateUserRole - Updates the role of a user.
 * @property {function(Request, Response): Promise<void>} deleteUser - Deletes a user.
 */
export const UserController = {
  /**
   * Renders posts authored by a specific user.
   *
   * @function
   * @param {Request} req - Express request object containing parameter "user".
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  displayUserPosts: async (req, res, next) => {
    try {
      const user = req.params.user;
      const posts = await Post.withAuthor(user);

      res.render("user/posts", { posts, user });

    } catch (err) {
      next(err);
    }
  },

  /**
   * Updates the role of the user identified by username.
   *
   * @function
   * @param {Request} req - Express request object containing username parameter and role in the body.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  updateUserRole: async (req, res) => {
    try {
      if (!req.params.username) {
        endBadRequest(res);
        return;
      }

      const { role } = req.body;

      const user = await User.withUsername(req.params.username);
      await user.updateRole(role);

      endSuccess(res, "Role updated successfully");
    } catch (err) {
      console.error("Error updating user role: ", err);
      endInternalError(res);
    }
  },

  /**
   * Deletes a user identified by username.
   *
   * @function
   * @param {Request} req - Express request object containing username parameter.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  deleteUser: async (req, res) => {
    if (!req.params.username) {
      endBadRequest(res);
      return;
    }

    const user = await User.withUsername(req.params.username);
    if (!user) {
      endNotFound(res, "User not found");
      return;
    }

    try {
      await user.delete();

      endSuccess(res, "User deleted successfully");
    } catch (err) {
      console.error(err);
      endInternalError(res);
    }
  },
};
