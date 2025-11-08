// temples.js

// Hamburger toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
});

// Temple filtering
const navLinks = document.querySelectorAll("nav a");
const templeFigures = document.querySelectorAll(".temple-grid figure");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.textContent.toLowerCase();

    templeFigures.forEach(figure => {
      const oldnew = figure.dataset.oldnew;
      const size = figure.dataset.size;

      let show = false;
      switch (filter) {
        case "old":
          show = oldnew === "old";
          break;
        case "new":
          show = oldnew === "new";
          break;
        case "large":
          show = size === "large";
          break;
        case "small":
          show = size === "small";
          break;
        default:
          show = true; // Home shows all
      }

      figure.classList.toggle("hidden", !show);
    });
  });
});