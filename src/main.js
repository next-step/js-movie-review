import { loadFooter } from "./components/footer";
import { loadHeader } from "./components/header";
import { loadTabs } from "./components/tabs";
import { initMovieList } from "./movieList";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    loadHeader({ title: "인사이드 아웃 2", rating: "9.5" });
    loadTabs();
    loadFooter();

    initMovieList();
  } catch (error) {
    console.error("❌ 초기화 중 오류 발생:", error);
  }
});
