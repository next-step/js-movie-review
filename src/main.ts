import { MovieCategory } from "./types/type";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { createMovieController } from "./controllers/createMovieController";

function initializeApp(): void {
  const headerComponent = Header();
  if (headerComponent) {
    headerComponent.render();
  }

  const movieController = createMovieController("movie-list-container");
  if (!movieController) {
    console.error("movie controller를 초기화하지 못했습니다.");
    return;
  }

  const tabsComponent = Tabs(async (selectedCategory: MovieCategory) => {
    await movieController.switchTab(selectedCategory);
  });
  tabsComponent.init();

  movieController.init(tabsComponent);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
