document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.getElementById("userDropdown");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", () => {
      const isExpanded =
        dropdownToggle.getAttribute("aria-expanded") === "true";

      // Toggle aria-expanded attribute
      dropdownToggle.setAttribute("aria-expanded", String(!isExpanded));

      // Toggle visibility of dropdown menu
      dropdownMenu.classList.toggle("show");
    });

    // Optional: Close dropdown if clicked outside
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
