/**
 * @module public/js/auth/login
 * @description Script for handling the login process:
 * - Attaches a submit listener to the login form.
 * - Submits login credentials as JSON.
 * - Redirects the user upon a successful login.
 *
 * @requires ../utils.js
 */
import {
  addSubmitListener,
  gotoNextOrRoot,
  passwordEncryptModifier,
  sendFormAsJson,
} from "../utils.js";

/**
 * Asynchronous callback for login form submission.
 *
 * @async
 * @function
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} Resolves when the login process completes.
 */
addSubmitListener("login-form", async (event) => {
  try {
    // Attempt to send the form data with password encryption.
    const response = await sendFormAsJson(event.target, [
      passwordEncryptModifier,
    ]);
    if (response.ok) {
      // Redirect to the next page or root if login is successful.
      gotoNextOrRoot(window);
    } else {
      console.error("Failed to log in");
    }
  } catch (err) {
    console.error(err);
  }
});
