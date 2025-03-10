/**
 * @module public/js/snackbar
 * @description Provides functionality to display snackbar notifications for various messages.
 * Offers methods for showing general, success, and error notifications.
 */

/**
 * Displays a snackbar with the specified message and type.
 * The snackbar shows the message, applies styling based on the type, and auto-hides after 5.5 seconds.
 *
 * @param {string} message - The message to display.
 * @param {('success'|'error'|string)} type - The type of snackbar. Recognized types are 'success' and 'error'.
 * @returns {void}
 */
export function showSnackbar(message, type) {
  const snackbar = document.getElementById("snackbar");
  const snackbarText = document.getElementById("snackbar-text");
  const snackbarClose = snackbar.querySelector(".close");
  if (!snackbar) return;

  snackbarText.textContent = message;
  if (type === 'success') {
    snackbar.classList.add("snackbar-success");
  } else if (type === 'error') {
    snackbar.classList.add("snackbar-error");
  }
  snackbar.classList.add("show");

  /**
   * Closes the snackbar by removing applied display classes.
   *
   * @inner
   * @function closeSnackbar
   * @returns {void}
   */
  function closeSnackbar() {
    snackbar.classList.remove("show");
    snackbar.classList.remove("snackbar-success");
    snackbar.classList.remove("snackbar-error");
  }

  snackbarClose.addEventListener("click", closeSnackbar);

  setTimeout(() => {
    closeSnackbar();
  }, 5500);
}

/**
 * Displays a success snackbar with the provided message.
 *
 * @param {string} message - The success message to display.
 * @returns {void}
 */
export function showSnackbarSuccess(message) {
  showSnackbar(message, 'success');
}

/**
 * Displays an error snackbar with the provided message.
 *
 * @param {string} message - The error message to display.
 * @returns {void}
 */
export function showSnackbarError(message) {
  showSnackbar(message, 'error');
}

// Expose the snackbar functions to the global scope.
window.showSnackbar = showSnackbar;
window.showSnackbarSuccess = showSnackbarSuccess;
window.showSnackbarError = showSnackbarError;
