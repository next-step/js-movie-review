import { loadMovies } from "./movieList";

document.addEventListener("DOMContentLoaded", async () => {
  async function loadComponent(containerId, filePath) {
    try {
      const response = await fetch(filePath);
      const content = await response.text();
      const container = document.getElementById(containerId);

      if (container) {
        container.insertAdjacentHTML("beforeend", content);
      } else {
        console.error(`Element with ID '${containerId}' not found`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  await loadComponent("header-container", "../templates/header.html");
  await loadComponent("footer-container", "../templates/footer.html");
  await loadComponent("tab-container", "../templates/tabs.html");

  await loadMovies();
});
