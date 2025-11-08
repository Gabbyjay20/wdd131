// Dynamic footer date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const mainnav = document.querySelector(".navigation");
const menuButton = document.querySelector("#menu");

menuButton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  menuButton.textContent = mainnav.classList.contains("open") ? "✖" : "☰";
});