import { loadFooter } from "./components/footer";
import { createTabs } from "./components/tabs";
import { initMovieList } from "./movieList";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const tabs = createTabs();
    tabs.init();

    loadFooter();

    initMovieList();
  } catch (error) {
    console.error(error);
  }
});
