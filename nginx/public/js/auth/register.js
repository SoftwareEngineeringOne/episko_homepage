/**
 * @module public/js/auth/register
 * @description Script for handling user registration.
 * This module attaches a submit listener to the registration form,
 * submits the registration data as JSON with a password encryption modifier,
 * and redirects the user upon successful registration.
 *
 * @requires ../utils.js
 */
import {
  addSubmitListener,
  gotoNextOrRoot,
  passwordEncryptModifier,
  sendFormAsJson,
} from "../utils.js";

console.log("register.js script loaded");

/**
 * Asynchronous callback for registration form submission.
 *
 * @async
 * @function
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the registration process completes.
 */
addSubmitListener("register-form", async (event) => {
  try {
    const response = await sendFormAsJson(event.target, [
      passwordEncryptModifier,
    ]);
    if (response.ok) {
      gotoNextOrRoot(window);
    } else {
      console.error("Failed to log in");
    }
  } catch (err) {
    console.error(err);
  }
});
