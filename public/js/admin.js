import {
  addSubmitListener,
  passwordEncryptModifier,
  sendFormAsJson,
} from "./utils.js";

console.log("Admin script loaded");

/* ---- Users ---- */
const roleChangeForms = document.getElementsByClassName("change-role-form");

for (const form of roleChangeForms) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await sendFormAsJson(event.target);
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to change role");
      }
    } catch (err) {
      console.log(err);
    }
  })
}

addSubmitListener("new-user-form", async (event) => {
  try {
    const response = await sendFormAsJson(event.target, [
      passwordEncryptModifier,
    ]);
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to create user");
    }
  } catch (err) {
    console.error(err)
  }

})

function deleteUser(username) {
  fetch(`/admin/users/${username}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error deleting post");
    }
  });
}


/* ---- Posts ---- */
/**
 * @param {string} postId
 */
function deletePost(postId) {
  fetch(`/posts/${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error deleting post");
    }
  });
}

function approvePost(postId) {
  fetch(`/posts/${postId}/approve`, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error approving post");
    }
  });
}

function archivePost(postId) {
  fetch(`/posts/${postId}/archive`, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error archiving post");
    }
  });
}

window.deleteUser = deleteUser;
window.deletePost = deletePost;
window.approvePost = approvePost;
window.archivePost = archivePost;
