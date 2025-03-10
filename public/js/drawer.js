/**
 * @module public/js/drawer
 * @description Provides functionality for the site's navigation drawer,
 * including opening and closing the drawer when interacting with the menu toggle, close button, and overlay.
 */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("drawer");
  const closeBtn = drawer.querySelector(".close");
  const overlay = document.getElementById("overlay");

  /**
   * Opens the navigation drawer.
   * @function openDrawer
   * @returns {void}
   */
  function openDrawer() {
    drawer.style.width = "250px";
    document.body.classList.add("drawer-open");
  }

  /**
   * Closes the navigation drawer.
   * @function closeDrawer
   * @returns {void}
   */
  function closeDrawer() {
    drawer.style.width = "0";
    document.body.classList.remove("drawer-open");
  }

  menuToggle.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
});
