/**
 * @module public/js/admin
 * @description Handles administration tasks including user role changes, new user creation,
 * deleting users and posts, and approving/archiving posts.
 */

import {
  addSubmitListener,
  passwordEncryptModifier,
  sendFormAsJson,
} from "./utils.js";

import { showSnackbarError, showSnackbarSuccess } from "./snackbar.js";

/* ---- Users ---- */

/**
 * Handles role change requests for users.
 * @param {Event} event - The submit event from the role change form.
 */
for (const form of document.getElementsByClassName("change-role-form")) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await sendFormAsJson(event.target);
      if (response.ok) {
        window.location.reload();
        showSnackbarSuccess("Role changed successfully");
      } else {
        showSnackbarError("An error occured!");
      }
    } catch (err) {
      showSnackbarError(`Error: ${err}`);
    }
  });
}

/**
 * Handles new user creation.
 * @param {Event} event - The submit event from the new user form.
 */
addSubmitListener("new-user-form", async (event) => {
  try {
    const response = await sendFormAsJson(event.target, [
      passwordEncryptModifier,
    ]);
    if (response.ok) {
      showSnackbarSuccess("User created successfully");
      window.location.reload();
    } else {
      const text = (await response.text()) || "";
      showSnackbarError(`An error occured: ${text}`);
    }
  } catch (err) {
    showSnackbarError(`Error: ${err}`);
    console.error(err);
  }
});

/* ---- Users Functions ---- */

/**
 * Deletes a user.
 * @param {string} username - The username of the user to be deleted.
 * @returns {Promise<void>}
 */
function deleteUser(username) {
  fetch(`/admin/users/${username}`, {
    method: "DELETE",
  })
    .then(async (response) => {
      if (response.ok) {
        showSnackbarSuccess("User deleted successfully");
        window.location.reload();
      } else {
        const text = (await response.text()) || "Unknown error";
        showSnackbarError(`An error occured: ${text}`);
      }
    })
    .catch((e) => {
      showSnackbarError(`Error: ${e}`);
      console.error(e);
    });
}

/* ---- Posts Functions ---- */

/**
 * Deletes a post.
 * @param {string} postId - The unique identifier of the post to be deleted.
 * @returns {Promise<void>}
 */
function deletePost(postId) {
  fetch(`/posts/${postId}`, {
    method: "DELETE",
  })
    .then(async (response) => {
      if (response.ok) {
        showSnackbarSuccess("Post deleted successfully");
        window.location.reload();
      } else {
        const text = (await response.text()) || "Unknown error";
        showSnackbarError(`An error occured: ${text}`);
      }
    })
    .catch((e) => {
      showSnackbarError(`Error: ${e}`);
      console.error(e);
    });
}

/**
 * Approves a post.
 * @param {string} postId - The unique identifier of the post to be approved.
 * @returns {Promise<void>}
 */
function approvePost(postId) {
  fetch(`/posts/${postId}/approve`, {
    method: "POST",
  })
    .then(async (response) => {
      if (response.ok) {
        showSnackbarSuccess("Post approved successfully");
        window.location.reload();
      } else {
        const text = (await response.text()) || "Unknown error";
        showSnackbarError(`An error occured: ${text}`);
      }
    })
    .catch((e) => {
      showSnackbarError(`Error: ${e}`);
      console.error(e);
    });
}

/**
 * Archives a post.
 * @param {string} postId - The unique identifier of the post to be archived.
 * @returns {Promise<void>}
 */
function archivePost(postId) {
  fetch(`/posts/${postId}/archive`, {
    method: "POST",
  })
    .then(async (response) => {
      if (response.ok) {
        showSnackbarSuccess("Post archived successfully");
        window.location.reload();
      } else {
        const text = (await response.text()) || "Unknown error";
        showSnackbarError(`An error occured: ${text}`);
      }
    })
    .catch((e) => {
      showSnackbarError(`Error: ${e}`);
      console.error(e);
    });
}

// Expose the functions on the global window object
window.deleteUser = deleteUser;
window.deletePost = deletePost;
window.approvePost = approvePost;
window.archivePost = archivePost;
