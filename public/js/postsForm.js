import { addSubmitListener, sendFormAsJson } from "./utils.js";

console.log("postsForm.js script loaded");

addSubmitListener("post-form", async (event) => {
  try {
    const response = await sendFormAsJson(event.target);
    if (response.ok) {
      window.location.assign("/posts");
    } else {
      console.error("Failed to create post");
    }
  } catch (err) {
    console.error(err);
  }
});
