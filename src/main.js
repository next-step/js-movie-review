import { Tabs } from "./components/Tabs.js";
import { createMovieController } from "./createMovieController.js";
import { LoadBaseHeader } from "./components/Headers.js";

function initializeApp() {
  LoadBaseHeader();

  const movieCtrl = createMovieController("movie-list-container");

  movieCtrl.init();

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
