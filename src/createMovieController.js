import { createMovieService } from "./createMovieService.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "./components/Button.js";
import { LoadHeader } from "./components/Headers.js";
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
        LoadHeader({
          title: first.title,
          rating: first.getFormattedVote(),
          backdrop: first.getBackdropUrl(),
        });
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

    if (!service.hasMore()) {
      removeLoadMoreButton();
    }
  }

  return {
    init,
    initResizeListener,
  };
}
