import { Category } from "./types/type";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { createMovieController } from "./controllers/createMovieController";

function initializeApp(): void {
  const headerComponent = Header();
  if (headerComponent) {
    headerComponent.render();
  }

  const movieCtrl = createMovieController("movie-list-container");
  movieCtrl.init();

  const tabsComponent = Tabs(async (selectedCategory: Category) => {
    await movieCtrl.switchTab(selectedCategory);
  });
  tabsComponent.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
