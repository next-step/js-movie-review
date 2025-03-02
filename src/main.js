import { createTabs } from "./components/Tab";
import { fetchAndRenderMovies } from "./movieList";

function initializeTabs() {
  const tabs = createTabs(fetchAndRenderMovies);
  tabs.init();
}

async function initializeApp() {
  initializeTabs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
