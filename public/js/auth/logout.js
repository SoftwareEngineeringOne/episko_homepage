/**
 * @module public/js/auth/logout
 * @description Script for handling the logout process.
 * It sends a POST request to log the user out and reloads the page upon success.
 */
import { showSnackbarError } from "./snackbar.js";

/**
 * Asynchronously logs out the current user.
 *
 * @async
 * @function logout
 * @returns {Promise<void>} Resolves when the logout process completes.
 * @throws {Error} Logs an error if the logout request fails.
 */
async function logout() {
  const response = await fetch("/auth/logout", {
    method: "POST",
  });
  if (response.ok) {
    window.location.reload();
  } else {
    console.error("Failed to log out");
    showSnackbarError("Failed to log out!");

  }
}

// Expose the logout function on the global window object
window.logout = logout;
