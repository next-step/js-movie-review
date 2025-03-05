import { Tabs } from "./components/Tabs.js";
import { createMovieController } from "./createMovieController.js";

function initializeApp() {
  const movieCtrl = createMovieController("movie-list-container");
  movieCtrl.initResizeListener();

  const tabs = Tabs(async (selectedTab) => {
    await movieCtrl.init(selectedTab);
  });
  tabs.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
