import { createMovieService } from "../services/createMovieService";
import { showSkeletonUI, renderMovies } from "../components/MovieRenderer";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "../components/Button";
import { updateHeaderMovie } from "../components/Headers";
import { showErrorUI } from "../utils/error";
import { debounce } from "../utils/helper";
import { Category, MovieService } from "../types/type";

export function createMovieController(containerId: string) {
  const movieContainer = document.getElementById(
    containerId
  ) as HTMLElement | null;
  const service: MovieService = createMovieService();

  let currentMode: "category" | "search" = "category";
  let currentCategory: Category = "popular";
  let searchFormAttached = false;

  function initResizeListener(): void {
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

  async function init(): Promise<void> {
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

  function setMode(mode: "category" | "search"): void {
    currentMode = mode;
    const tabContainer = document.getElementById(
      "tab-container"
    ) as HTMLElement | null;
    if (mode === "search") {
      if (tabContainer) {
        tabContainer.style.display = "none";
      }
    } else {
      if (tabContainer) {
        tabContainer.style.display = "block";
      }
      const inputEl = document.querySelector(
        ".search-input"
      ) as HTMLInputElement | null;
      if (inputEl) inputEl.value = "";
    }
  }

  async function switchTab(newCategory: Category): Promise<void> {
    currentCategory = newCategory;
    setMode("category");
    await loadCategory(newCategory);
  }

  async function loadCategory(category: Category): Promise<void> {
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
      showErrorUI("영화를 불러오는 중 오류가 발생했습니다.");
    }
  }

  async function handleSearch(query: string): Promise<void> {
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
      showErrorUI("검색 중 문제가 발생했습니다.");
    }
  }

  function renderNextBatch(): void {
    const batch = service.getNextBatch();
    renderMovies(movieContainer, batch);

    if (!service.hasMore()) {
      removeLoadMoreButton();
    }
  }

  function attachSearchFormListener(): void {
    if (searchFormAttached) return;
    const form = document.querySelector(
      ".search-bar"
    ) as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const inputEl = form.querySelector(
        ".search-input"
      ) as HTMLInputElement | null;
      if (!inputEl) return;

      const query = inputEl.value.trim();
      if (query) {
        await handleSearch(query);
      }
    });
    searchFormAttached = true;
  }

  async function onPopState(event: PopStateEvent): Promise<void> {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      currentMode = "search";
      setMode("search");

      const inputEl = document.querySelector(
        ".search-input"
      ) as HTMLInputElement | null;
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
