document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.getElementById("userDropdown");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", () => {
      const isExpanded =
        dropdownToggle.getAttribute("aria-expanded") === "true";

      dropdownToggle.setAttribute("aria-expanded", String(!isExpanded));

      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
      if (
        !dropdownToggle.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.remove("show");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-links");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});
