console.log("logout.js script loaded");

async function logout() {
  const response = await fetch("/auth/logout", {
    method: "POST",
  });
  if (response.ok) {
    window.location.reload();
  } else {
    console.error("Failed to log out");
  }
}

window.logout = logout;
