import { createMovieService } from "../services/createMovieService";
import { showSkeletonUI, renderMovies } from "../components/MovieRenderer";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { Header } from "../components/Header";
import { showErrorMessage } from "../utils/error";
import { debounce } from "../utils/helper";
import { Category, MovieService } from "../types/type";

export function createMovieController(containerId: string) {
  const movieContainer = document.getElementById(
    containerId
  ) as HTMLElement | null;
  const service: MovieService = createMovieService();

  let currentCategory: Category = "popular";
  let searchFormAttached = false;
  let loadMoreButtonComponent: ReturnType<typeof LoadMoreButton> | null = null;

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
      setMode("search");

      await fetchMoviesBySearch(query);
      const inputEl = document.querySelector(
        ".search-input"
      ) as HTMLInputElement | null;
      if (inputEl) inputEl.value = query;
    } else {
      setMode("category");
      await fetchMoviesByCategory(currentCategory);
    }
  }

  function setMode(mode: "category" | "search"): void {
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
    await fetchMoviesByCategory(newCategory);
  }

  async function fetchMoviesByCategory(category: Category): Promise<void> {
    if (!movieContainer) return;

    showSkeletonUI(movieContainer);

    try {
      await service.loadMovies(category);

      movieContainer.innerHTML = "";
      renderNextBatch();

      if (service.hasMore()) {
        if (!loadMoreButtonComponent) {
          loadMoreButtonComponent = LoadMoreButton(
            movieContainer,
            renderNextBatch
          );
        }
        loadMoreButtonComponent.render();
      } else if (loadMoreButtonComponent) {
        loadMoreButtonComponent.remove();
      }

      const first = service.getFirstMovie();
      if (first) {
        const headerComponent = Header();
        if (headerComponent) {
          headerComponent.update({
            title: first.title,
            rating: first.getFormattedVote(),
            backdrop: first.getBackdropUrl(),
          });
        }
      } else {
        movieContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
      }

      history.pushState({}, "", location.pathname);
    } catch (error) {
      console.error(
        "createMovieController 초기화 중 오류가 발생했습니다:",
        error
      );
      showErrorMessage("영화를 불러오는 중 오류가 발생했습니다.");
    }
  }

  async function fetchMoviesBySearch(query: string): Promise<void> {
    if (!movieContainer) return;

    setMode("search");

    showSkeletonUI(movieContainer);

    try {
      await service.searchMovies(query);

      movieContainer.innerHTML = "";
      renderNextBatch();

      if (service.hasMore()) {
        if (!loadMoreButtonComponent) {
          loadMoreButtonComponent = LoadMoreButton(
            movieContainer,
            renderNextBatch
          );
        }
        loadMoreButtonComponent.render();
      } else if (loadMoreButtonComponent) {
        loadMoreButtonComponent.remove();
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
      console.error("영화 검색 중 오류가 발생했습니다", error);
      showErrorMessage("검색 중 오류가 발생했습니다.");
    }
  }

  function renderNextBatch(): void {
    const batch = service.getNextBatch();
    renderMovies(movieContainer, batch);

    if (!service.hasMore()) {
      loadMoreButtonComponent?.remove();
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
        await fetchMoviesBySearch(query);
      }
    });
    searchFormAttached = true;
  }

  async function onPopState(event: PopStateEvent): Promise<void> {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      setMode("search");

      const inputEl = document.querySelector(
        ".search-input"
      ) as HTMLInputElement | null;
      if (inputEl) {
        inputEl.value = query;
      }

      await fetchMoviesBySearch(query);
    } else {
      setMode("category");
      await fetchMoviesByCategory(currentCategory);
    }
  }

  return {
    init,
    switchTab,
  };
}
