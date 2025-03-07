console.log("navbar.js script loaded");

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
