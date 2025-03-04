import { Category } from "./types/type";
import { LoadBaseHeader } from "./components/Headers";
import { createTabs } from "./components/Tab";
import { createMovieController } from "./controllers/createMovieController";

function initializeApp(): void {
  LoadBaseHeader();

  const movieCtrl = createMovieController("movie-list-container");
  movieCtrl.init();

  try {
    const tabs = createTabs(async (selectedCategory: Category) => {
      await movieCtrl.switchTab(selectedCategory);
    });
    tabs.init();
  } catch (error) {
    console.error(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
