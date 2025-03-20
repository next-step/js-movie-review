import initInfiniteScroll from "./../utils/infiniteScroll";
import { createMovieService } from "../services/createMovieService";
import { showErrorMessage } from "../utils/error";
import { debounce } from "../utils/helper";
import { MovieCategory, IMovieService, MovieModel } from "../types/type";
import {
  updateHeader,
  updateSectionTitle,
  updateTabContainer,
} from "../utils/ui";
import {
  DEFAULT_CATEGORY,
  DESKTOP_MOVIES_PER_LOAD,
  MOBILE_BREAKPOINT,
  MOBILE_MOVIES_PER_LOAD,
} from "../constants";
import { getCurrentMode } from "../utils/state";
import { Tabs } from "../components/Tabs";
import {
  appendMovies,
  removeSkeletonUI,
  renderMoviesInitial,
  showSkeletonUI,
} from "../components/MovieRenderer";
import { Modal } from "../components/Modal";
export function createMovieController(containerId: string) {
  const containerElement = document.getElementById(containerId);
  if (!containerElement) {
    console.error(`document에서 ${containerId} id를 찾을 수 없습니다`);
    return null;
  }

  const movieContainer: HTMLElement = containerElement;
  const service: IMovieService = createMovieService();
  const modal = Modal();

  const infiniteScroll = initInfiniteScroll({
    container: movieContainer,
    onLoadMore: renderNextBatch,
    hasMore: () => service.hasMore(),
  });

  let currentMode: "search" | "category" = "category";
  let tabComponent: ReturnType<typeof Tabs> | null = null;

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

  function init(tabs: ReturnType<typeof Tabs>) {
    modal.render();
    tabComponent = tabs;
    attachSearchListener();
    initializeMovies();
    initResizeListener();

    window.addEventListener("popstate", initializeMovies);
    movieContainer.addEventListener("click", fetchAndShowMovieDetails);
  }

  async function fetchAndShowMovieDetails(event: Event) {
    const target = event.target as HTMLElement;
    const movieItem = target.closest(".item") as HTMLElement | null;
    if (!movieItem) return;

    const { movieId } = movieItem.dataset;
    if (!movieId) return;

    try {
      const movieDetails = await service.getMovieDetails(Number(movieId));
      modal.open(movieDetails);
    } catch (error) {
      console.error(
        `영화 상세 정보를 불러오는 데 실패했습니다. (MovieID: ${movieId})`
      );
    }
  }

  function initializeMovies() {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    currentMode = getCurrentMode(searchQuery ?? "");
    updateSectionTitle(
      currentMode,
      searchQuery ?? (tabComponent?.getSelectedCategory() || DEFAULT_CATEGORY)
    );

    if (currentMode === "search") {
      searchMovies(searchQuery!, false);
      return;
    } else {
      fetchMoviesByCategory(
        tabComponent?.getSelectedCategory() || DEFAULT_CATEGORY
      );
    }
  }

  async function switchTab(newCategory: MovieCategory): Promise<void> {
    if (currentMode === "search") return;
    updateSectionTitle("category", newCategory);
    await fetchMoviesByCategory(newCategory);
  }

  async function fetchMovies({
    category,
    query,
    isInitial = true,
    pushState = true,
  }: {
    category?: MovieCategory;
    query?: string;
    isInitial?: boolean;
    pushState?: boolean;
  }) {
    showSkeletonUI(movieContainer);

    if (query) {
      updateSectionTitle("search", query);
    }

    try {
      const movies = await getMovies({ category, query, isInitial });

      if (!movies.length) {
        displayNoResultsMessage(query);
        return;
      }

      removeSkeletonUI(movieContainer);

      renderMovies(movies, isInitial);

      if (service.hasMore()) {
        infiniteScroll.observeLastItem();
      } else {
        infiniteScroll.disconnect();
      }

      updateHeader(service);
    } catch (error) {
      displayFetchErrorMessage();
    } finally {
      updateHistory(query, pushState);
    }
  }

  async function getMovies({
    category,
    query,
    isInitial,
  }: {
    category?: MovieCategory;
    query?: string;
    isInitial: boolean;
  }) {
    return isInitial
      ? query
        ? await fetchMoviesBySearchQuery(query)
        : await fetchMoviesByCategoryName(category)
      : service.getNextBatch();
  }

  async function fetchMoviesBySearchQuery(query: string) {
    updateTabContainer("search");
    await service.searchMovies(query);
    return service.getNextBatch();
  }

  async function fetchMoviesByCategoryName(category?: MovieCategory) {
    if (category) {
      await service.loadMovies(category);
    }
    return service.getNextBatch();
  }

  function displayNoResultsMessage(query?: string) {
    movieContainer.innerHTML = query
      ? `<p>${query} 검색 결과가 없습니다.</p>`
      : `<p>영화가 없습니다.</p>`;
  }

  function renderMovies(movies: MovieModel[], isInitial: boolean) {
    isInitial
      ? renderMoviesInitial(movieContainer, movies)
      : appendMovies(movieContainer, movies);
  }

  function displayFetchErrorMessage() {
    showErrorMessage(
      currentMode === "search"
        ? "검색 중 오류가 발생했습니다."
        : "영화를 불러오는 중 오류가 발생했습니다."
    );
  }

  function updateHistory(query?: string, pushState = true) {
    const newUrl = query
      ? `?search=${encodeURIComponent(query)}`
      : location.pathname;

    if (pushState && location.search !== newUrl) {
      history.pushState({}, "", newUrl);
    }
  }

  async function fetchMoviesByCategory(category: MovieCategory) {
    await fetchMovies({ category });
  }

  async function searchMovies(query: string, pushState = true) {
    if (!query.trim()) return;
    await fetchMovies({ query, pushState });
  }

  function renderNextBatch() {
    infiniteScroll.disconnect();

    fetchMovies({ isInitial: false, pushState: false });
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

  window.addEventListener("beforeunload", () => {
    infiniteScroll.disconnect();
  });

  return {
    init,
    switchTab,
  };
}
