import { createMovieService } from "./createMovieService.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "./components/Button.js";
import { updateHeaderMovie } from "./components/Headers.js";
import { showErrorUI } from "../utils/error.js";
import { debounce } from "../utils/helper.js";

export function createMovieController(containerId) {
  const movieContainer = document.getElementById(containerId);
  const service = createMovieService();

  let currentMode = "category";
  let currentCategory = "popular";
  let searchFormAttached = false;

  function initResizeListener() {
    window.addEventListener(
      "resize",
      debounce(() => {
        const perLoad = window.innerWidth <= 768 ? 3 : 9;
        service.setMoviesPerLoad(perLoad);
      }, 300)
    );
    const initialPerLoad = window.innerWidth <= 768 ? 3 : 9;
    service.setMoviesPerLoad(initialPerLoad);
  }

  async function init() {
    if (!movieContainer) return;

    attachSearchFormListener();
    window.addEventListener("popstate", onPopState);
    initResizeListener();

    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      currentMode = "search";
      setMode("search");
      await handleSearch(query);
    } else {
      setMode("category");
      await loadCategory(currentCategory);
    }
  }

  function setMode(mode) {
    currentMode = mode;

    const tabContainer = document.getElementById("tab-container");
    if (mode === "search") {
      if (tabContainer) {
        tabContainer.style.display = "none";
      }
    } else if (mode === "category") {
      if (tabContainer) {
        tabContainer.style.display = "block";
      }
      const inputEl = document.querySelector(".search-input");
      if (inputEl) inputEl.value = "";
    }
  }

  async function switchTab(newCategory) {
    currentCategory = newCategory;
    setMode("category");
    await loadCategory(newCategory);
  }

  async function loadCategory(category) {
    if (!movieContainer) return;

    showSkeletonUI(movieContainer);

    try {
      await service.loadMovies(category);

      movieContainer.innerHTML = "";
      renderNextBatch();

      if (service.hasMore()) {
        createLoadMoreButton(movieContainer, renderNextBatch);
      }

      const first = service.getFirstMovie();
      if (first) {
        updateHeaderMovie({
          title: first.title,
          rating: first.getFormattedVote(),
          backdrop: first.getBackdropUrl(),
        });
      } else {
        movieContainer.innerHTML = "<p>영화 데이터가 없습니다.</p>";
      }

      history.pushState({}, "", location.pathname);
    } catch (error) {
      console.error(error);
      showErrorUI(movieContainer, "영화를 불러오는 중 오류가 발생했습니다.");
    }
  }

  async function handleSearch(query) {
    if (!movieContainer) return;

    currentMode = "search";
    setMode("search");

    showSkeletonUI(movieContainer);

    try {
      await service.searchMovies(query);

      movieContainer.innerHTML = "";
      renderNextBatch();

      if (service.hasMore()) {
        createLoadMoreButton(movieContainer, renderNextBatch);
      } else {
        removeLoadMoreButton();
      }

      if (!service.getFirstMovie()) {
        movieContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
      }

      history.replaceState(
        { query },
        "",
        `?search=${encodeURIComponent(query)}`
      );
    } catch (error) {
      console.error(error);
      showErrorUI(movieContainer, "검색 중 문제가 발생했습니다.");
    }
  }

  function renderNextBatch() {
    const batch = service.getNextBatch();
    renderMovies(movieContainer, batch);

    if (!service.hasMore()) {
      removeLoadMoreButton();
    }
  }

  function attachSearchFormListener() {
    if (searchFormAttached) return;
    const form = document.querySelector(".search-bar");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputEl = form.querySelector(".search-input");
      if (!inputEl) return;

      const query = inputEl.value.trim();
      if (query) {
        await handleSearch(query);
      }
    });
    searchFormAttached = true;
  }

  async function onPopState(event) {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      currentMode = "search";
      setMode("search");

      const inputEl = document.querySelector(".search-input");
      if (inputEl) {
        inputEl.value = query;
      }

      await handleSearch(query);
    } else {
      setMode("category");

      await loadCategory(currentCategory);
    }
  }

  return {
    init,
    switchTab,
  };
}
