/**
 * @module public/js/postsForm
 * @description Handles the submission of the post creation form.
 */

import { addSubmitListener, sendFormAsJson } from "./utils.js";
import { showSnackbarSuccess, showSnackbarError } from './snackbar.js';

/**
 * Callback for handling the post form submission.
 * Sends the form data as JSON and navigates to the posts page on success.
 *
 * @async
 * @function handlePostSubmit
 * @param {Event} event - The submit event from the post form.
 * @returns {Promise<void>} Resolves when form submission is processed.
 */
addSubmitListener("post-form", async (event) => {
  try {
    const response = await sendFormAsJson(event.target);
    if (response.ok) {
      showSnackbarSuccess("Post created successfully.");
      window.location.assign("/posts");
    } else {
      showSnackbarError("Failed to create post.");
      console.error("Failed to create post");
    }
  } catch (err) {
    showSnackbarError("Network error occurred while submitting the post.");
    console.error(err);
  }
});
