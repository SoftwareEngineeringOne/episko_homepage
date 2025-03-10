/**
 * @module loginController
 * @description Handles user login related requests.
 * 
 * @requires ../../models/user.js
 * @requires ../../util/controller.js
 */
import User from "../../models/user.js";
import { endBadRequest, endInternalError, endSuccess } from "../../util/controller.js";

/**
 * Login Controller object.
 * @typedef {Object} LoginController
 * @property {function(Request, Response): Promise<void>} displayLoginForm - Renders the login page.
 * @property {function(Request, Response): Promise<void>} handleLoginRequest - Processes the login form submission.
 */
export const LoginController = {
  /**
   * Handles GET requests to display the login page.
   *
   * @async
   * @function handleGetRequest
   * @param {Request} _req - Express request object (unused).
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  displayLoginForm: async (_req, res) => {
    res.render("auth/login");
  },

  /**
   * Handles POST requests for logging in a user.
   *
   * @async
   * @function handlePostRequest
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  handleLoginRequest: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      endBadRequest(res);
    }

    try {
      const user = await User.loginUser(username, password);
      if (!user) {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Invalid username or password");
        return;
      }

      req.session.user = user;
      endSuccess(res);
    } catch (err) {
      console.error(err);
      endInternalError(res);
    }
  },
};
