/**
 * @module public/js/utils
 * @description Utility functions for form submission, data manipulation, and navigation.
 */

import { showSnackbarSuccess, showSnackbarError } from "./snackbar.js";

/**
 * Adds a submit event listener to a form with the given ID.
 * Prevents the default form submission and calls the provided callback.
 *
 * @param {string} formId - The ID of the form element.
 * @param {function(Event): Promise<void>} callback - An async callback to execute on form submission.
 * @returns {void}
 */
export function addSubmitListener(formId, callback) {
  document.getElementById(formId).addEventListener("submit", async (event) => {
    event.preventDefault();
    await callback(event);
  });
}

/**
 * Sends the form data as a JSON payload.
 * Applies any optional modifiers to the data before sending.
 *
 * @param {HTMLFormElement} form - The form element whose data will be sent.
 * @param {Array<function(Object): Promise<void>>} [modifiers=[]] - An array of async functions to modify the data object.
 * @returns {Promise<Response>} A promise that resolves to the fetch Response.
 */
export async function sendFormAsJson(form, modifiers = []) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  for (const modifier of modifiers) {
    await modifier(data);
  }

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      showSnackbarSuccess("Form submitted successfully.");
    } else {
      showSnackbarError("Form submission failed.");
    }
    return response;
  } catch (error) {
    showSnackbarError("Network error occurred while submitting the form.");
    throw error;
  }
}

/**
 * Encrypts the 'password' field in the given data object using SHA-256.
 * Replaces the plain text password with its hexadecimal hash.
 *
 * @async
 * @param {Object} data - The data object containing a 'password' property.
 * @returns {Promise<void>}
 */
export const passwordEncryptModifier = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  data.password = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Redirects the current window to the URL specified by the "next" query parameter,
 * or to the root path ("/") if no "next" parameter is present.
 *
 * @param {Window} windowObj - The global window object.
 * @returns {void}
 */
export function gotoNextOrRoot(windowObj) {
  const params = new URLSearchParams(windowObj.location.search);
  const nextUrl = params.get("next") || "/";
  windowObj.location.assign(nextUrl);
}
