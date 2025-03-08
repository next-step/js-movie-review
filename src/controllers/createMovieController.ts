import { createMovieService } from "../services/createMovieService";
import { showSkeletonUI, renderMovies } from "../components/MovieRenderer";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { showErrorMessage } from "../utils/error";
import { debounce } from "../utils/helper";
import { MovieCategory, IMovieService, MovieModel } from "../types/type";
import { addLoadMoreButton, updateHeader } from "../utils/ui";
import {
  DESKTOP_MOVIES_PER_LOAD,
  MOBILE_BREAKPOINT,
  MOBILE_MOVIES_PER_LOAD,
} from "../constants";
import { getCurrentMode } from "../utils/state";
export function createMovieController(containerId: string) {
  const containerElement = document.getElementById(containerId);
  if (!containerElement) {
    console.error(`document에서 ${containerId} id를 찾을 수 없습니다`);
    return null;
  }

  const movieContainer: HTMLElement = containerElement;
  const service: IMovieService = createMovieService();
  let currentCategory: MovieCategory = "popular";
  let loadMoreButtonComponent: ReturnType<typeof LoadMoreButton> | null = null;
  let currentMode: "search" | "category" = "category";

  function updatePerLoad(): void {
    service.setMoviesPerLoad(
      window.innerWidth <= MOBILE_BREAKPOINT
        ? MOBILE_MOVIES_PER_LOAD
        : DESKTOP_MOVIES_PER_LOAD
    );
  }

  function initResizeListener(): void {
    const debouncedUpdate = debounce(updatePerLoad, 300);
    window.addEventListener("resize", debouncedUpdate);
    updatePerLoad();
  }

  function init() {
    attachSearchListener();
    handleInitialState();
    initResizeListener();
    window.addEventListener("popstate", handleInitialState);
  }

  function handleInitialState() {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    currentMode = getCurrentMode(searchQuery ?? "");

    if (currentMode === "search") {
      searchMovies(searchQuery!, false);
    } else {
      fetchMoviesByCategory(currentCategory, true);
    }
  }

  async function switchTab(newCategory: MovieCategory): Promise<void> {
    if (currentMode === "search") return;
    currentCategory = newCategory;
    await fetchMoviesByCategory(newCategory);
  }

  async function fetchMovies({
    category,
    query,
    isInitial = false,
    pushState = true,
  }: {
    category?: MovieCategory;
    query?: string;
    isInitial?: boolean;
    pushState?: boolean;
  }) {
    currentMode = getCurrentMode(query);

    showSkeletonUI(movieContainer);

    try {
      const movies = query
        ? await fetchMoviesBySearchQuery(query)
        : await fetchMoviesByCategoryName(category);

      renderMovieResults(movies, query);
      updateHeader(service);
    } catch (error) {
      displayFetchErrorMessage();
    } finally {
      updateHistory(query, isInitial, pushState);
    }
  }

  async function fetchMoviesBySearchQuery(query: string) {
    await service.searchMovies(query);
    return service.getNextBatch();
  }

  async function fetchMoviesByCategoryName(category?: MovieCategory) {
    if (category) {
      await service.loadMovies(category);
      currentCategory = category;
    }
    return service.getNextBatch();
  }

  function renderMovieResults(movies: MovieModel[], query?: string) {
    if (movies.length === 0) {
      movieContainer.innerHTML = query
        ? `<p>${query} 검색 결과가 없습니다.</p>`
        : `<p>영화가 없습니다.</p>`;
      return;
    }

    renderMovies(movieContainer, movies);

    if (service.hasMore()) {
      loadMoreButtonComponent = addLoadMoreButton({
        hasMore: true,
        movieContainer,
        renderNextBatch,
        loadMoreButtonComponent,
      });
    }
  }

  function displayFetchErrorMessage() {
    showErrorMessage(
      currentMode === "search"
        ? "검색 중 오류가 발생했습니다."
        : "영화를 불러오는 중 오류가 발생했습니다."
    );
  }

  function updateHistory(query?: string, isInitial = false, pushState = true) {
    if (!isInitial && pushState) {
      history.pushState(
        {},
        "",
        query ? `?search=${encodeURIComponent(query)}` : location.pathname
      );
    }
  }

  async function fetchMoviesByCategory(
    category: MovieCategory,
    isInitial = false
  ) {
    await fetchMovies({ category, isInitial });
  }

  async function searchMovies(query: string, pushState = true) {
    if (!query.trim()) return;
    await fetchMovies({ query, pushState });
  }

  function renderNextBatch() {
    renderMovies(movieContainer, service.getNextBatch());

    if (!service.hasMore()) {
      loadMoreButtonComponent?.remove();
    }
  }

  function attachSearchListener() {
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
      if (!query) return;

      await searchMovies(query);
    });
  }

  return {
    init,
    switchTab,
  };
}
