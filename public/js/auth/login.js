import {
  addSubmitListener,
  gotoNextOrRoot,
  passwordEncryptModifier,
  sendFormAsJson,
} from "../utils.js";

console.log("login.js script loaded");

addSubmitListener("login-form", async (event) => {
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
