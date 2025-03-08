document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("drawer");
  const closeBtn = drawer.querySelector(".close");
  const overlay = document.getElementById("overlay");

  function openDrawer() {
    drawer.style.width = "250px";
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    drawer.style.width = "0";
    document.body.classList.remove("drawer-open");
  }

  menuToggle.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);


})
