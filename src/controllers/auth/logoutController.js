/**
 * @module controllers/auth/logoutController
 * @description Handles user logout requests.
 *
 * @requires ../../util/controller.js
 */
import { endInternalError, endSuccess } from "../../util/controller.js";

/**
 * Logout Controller object.
 * @typedef {Object} LogoutController
 * @property {function(Request, Response): Promise<void>} handleLogoutRequest - Logs out the user and destroys the session.
 */
export const LogoutController = {
  /**
   * Handles the logout request by destroying the user session.
   *
   * @async
   * @function handleLogoutRequest
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  handleLogoutRequest: async (req, res) => {
    try {
      req.session.destroy();
      endSuccess(res, "User logged out successfully");
    } catch (err) {
      console.error(err);
      endInternalError(res);
    }
  },
};
