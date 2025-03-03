import { fetchMovies } from "./api.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "./components/Button.js";
import { LoadHeader } from "./components/Headers.js";
import { showErrorUI } from "../utils/error.js";
import { debounce } from "../utils/helper.js";

const movieContainer = document.getElementById("movie-list-container");

let allMovies = [];
let displayedCount = 0;
let moviesPerLoad = getMoviesPerLoad();

window.addEventListener(
  "resize",
  debounce(() => {
    moviesPerLoad = getMoviesPerLoad();
  }, 300)
);

function getMoviesPerLoad() {
  return window.innerWidth <= 768 ? 3 : 9;
}

function loadMoreMovies(movies) {
  if (!movieContainer || movies.length === 0) return;

  const remaining = movies.length - displayedCount;
  const itemsToLoad = Math.min(remaining, moviesPerLoad);

  renderMovies(movieContainer, movies.slice(0, displayedCount + itemsToLoad));
  displayedCount += itemsToLoad;

  if (displayedCount >= movies.length) {
    removeLoadMoreButton();
  }
}

export async function fetchAndRenderMovies(selectedCategory) {
  if (!movieContainer) return;

  showSkeletonUI(movieContainer);

  try {
    allMovies = await fetchMovies(selectedCategory);
    movieContainer.innerHTML = "";
    displayedCount = 0;

    loadMoreMovies(allMovies);

    if (allMovies.length > moviesPerLoad) {
      createLoadMoreButton(movieContainer, () => loadMoreMovies(allMovies));
    }

    if (allMovies.length > 0) {
      const firstMovie = allMovies[0];
      LoadHeader({
        title: firstMovie.title,
        rating: firstMovie.vote_average.toFixed(1),
        backdrop: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${firstMovie.backdrop_path}`,
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
