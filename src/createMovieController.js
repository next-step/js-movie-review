import { createMovieService } from "./createMovieService.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "./components/Button.js";
import { LoadBaseHeader, updateHeaderMovie } from "./components/Headers.js";
import { showErrorUI } from "../utils/error.js";
import { debounce } from "../utils/helper.js";

export function createMovieController(containerId) {
  const movieContainer = document.getElementById(containerId);
  const service = createMovieService();

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

  async function init(category = "popular") {
    if (!movieContainer) return;

    LoadBaseHeader();
    attachSearchFormListener();

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
      }
    } catch (error) {
      console.error(error);
      showErrorUI(
        movieContainer,
        "영화를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
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
    const form = document.querySelector(".search-bar");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputElement = form.querySelector(".search-input");
      if (!inputElement) return;

      const query = inputElement.value.trim();
      if (query) {
        await handleSearch(query);
      }
    });
  }

  async function handleSearch(query) {
    if (!movieContainer) return;

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

      history.pushState({ query }, "", `?search=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error(error);
      showErrorUI(movieContainer, "검색 중 문제가 발생했습니다.");
    }
  }

  return {
    init,
    initResizeListener,
  };
}
