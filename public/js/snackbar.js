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

  function closeSnackbar() {
    snackbar.classList.remove("show");
    snackbar.classList.remove("snackbar-success");
    snackbar.classList.remove("snackbar-error");
  }

  snackbarClose.addEventListener("click", closeSnackbar)

  setTimeout(() => {
    closeSnackbar();
  }, 5500);
}

export function showSnackbarSuccess(message) {
  showSnackbar(message, 'success')
}

export function showSnackbarError(message) {
  showSnackbar(message, 'error')
}

window.showSnackbar = showSnackbar;
window.showSnackbarSuccess = showSnackbarSuccess;
window.showSnackbarError = showSnackbarError;
