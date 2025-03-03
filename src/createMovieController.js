import { createMovieService } from "./createMovieService.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import { LoadMoreButton } from "./components/LoadMoreButton.js";
import { Header } from "./components/Header.js";
import { showErrorUI } from "../utils/error.js";
import { debounce } from "../utils/helper.js";
import {
  DESKTOP_MOVIES_PER_LOAD,
  MOBILE_BREAKPOINT,
  MOBILE_MOVIES_PER_LOAD,
} from "./constants.js";

export function createMovieController(containerId) {
  const movieContainer = document.getElementById(containerId);
  const service = createMovieService();
  let loadMoreButtonComponent = null;

  function initResizeListener() {
    window.addEventListener(
      "resize",
      debounce(() => {
        const perLoad =
          window.innerWidth <= MOBILE_BREAKPOINT
            ? MOBILE_MOVIES_PER_LOAD
            : DESKTOP_MOVIES_PER_LOAD;
        service.setMoviesPerLoad(perLoad);
      }, 300)
    );
    const initialPerLoad =
      window.innerWidth <= MOBILE_BREAKPOINT
        ? MOBILE_MOVIES_PER_LOAD
        : DESKTOP_MOVIES_PER_LOAD;
    service.setMoviesPerLoad(initialPerLoad);
  }

  async function init(category = "popular") {
    if (!movieContainer) {
      console.error(`cocument에서 ${containerId} id를 찾을 수 없습니다`);
      return;
    }

    LoadBaseHeader();
    attachSearchFormListener();

    showSkeletonUI(movieContainer);

    try {
      await service.loadMovies(category);

      movieContainer.innerHTML = "";

      renderNextBatch();

      if (service.hasMore()) {
        loadMoreButtonComponent = LoadMoreButton(
          movieContainer,
          renderNextBatch
        );
        loadMoreButtonComponent.render();
      }

      const first = service.getFirstMovie();
      if (first) {
        const headerComponent = Header({
          title: first.title,
          rating: first.getFormattedVote(),
          backdrop: first.getBackdropUrl(),
        });

        if (headerComponent) {
          headerComponent.render();
        }
      }
    } catch (error) {
      console.error("컨트롤러 초기화 중 오류가 발생했습니다:", error);
      showErrorUI(
        movieContainer,
        "영화를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }

  function renderNextBatch() {
    const batch = service.getNextBatch();
    renderMovies(movieContainer, batch);

    if (!service.hasMore() && loadMoreButtonComponent) {
      loadMoreButtonComponent.remove();
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
