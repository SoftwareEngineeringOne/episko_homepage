/**
 * @module public/js/navbar
 * @description Provides functionality for handling user logout via the navigation bar.
 */

/**
 * Handles logout link click event.
 * Prevents the default behavior, sends a POST request to log out, and redirects the user
 * to the home page upon successful logout.
 * @param {Event} event - The mouse click event from the logout link.
 * @returns {Promise<void>} A promise that resolves when the logout process is completed.
 */
document
  .querySelector("#logout-link")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await fetch("/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Failed to log out");
    }
  });
