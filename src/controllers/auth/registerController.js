/**
 * @module controllers/auth/registerController
 * @description Handles user registration requests.
 *
 * @requires ../../models/user.js
 * @requires ../../util/controller.js
 */
import User from "../../models/user.js";
import { endBadRequest, endResponseText } from "../../util/controller.js";

/**
 * Register controller object.
 * @typedef {Object} RegisterController
 * @property {function(Request, Response): Promise<void>} displayRegisterForm - Renders the registration page.
 * @property {function(Request, Response): Promise<void>} handleRegisterRequest - Processes the registration form submission.
 */
export const RegisterController = {
  /**
   * Handles GET requests for displaying the registration page.
   * @async
   * @function handleGetRequest
   * @param {Request} _req - The request object (unused).
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  displayRegisterForm: async (_req, res) => {
    res.render("auth/register");
  },

  /**
   * Handles POST requests for registering a new user.
   * @async
   * @function handlePostRequest
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  handleRegisterRequest: async (req, res) => {
    const { firstName, lastName, username, password, role } = req.body;
    if (!firstName || !lastName || !username || !password) {
      endBadRequest(res);
    }

    let user;
    if (role) {
      user = new User(firstName, lastName, username, role);
    } else {
      user = new User(firstName, lastName, username);
    }

    const success = await user.registerUser(password);

    if (success) {
      if (!role) {
        req.session.user = user;
      }
      endResponseText(res, 201, "User registered successfully");
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("User already exists");
    }
  },
};
