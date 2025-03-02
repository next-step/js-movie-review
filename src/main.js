import { createTabs } from "./components/tabs";
import { initializeMovieList } from "./movieList";

function initializeTabs() {
  const tabs = createTabs();
  tabs.init();
}

async function initializeApp() {
  initializeTabs();
  await initializeMovieList();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
