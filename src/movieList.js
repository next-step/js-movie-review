import { fetchMovies } from "./api.js";
import { showSkeletonUI, renderMovies } from "./movieRenderer.js";
import {
  createLoadMoreButton,
  removeLoadMoreButton,
} from "./components/loadMoreButton.js";

let allMovies = [];
let displayedCount = 0;

function getMoviesPerLoad() {
  return window.matchMedia("(max-width: 768px)").matches ? 3 : 9;
}

function loadMoreMovies() {
  const movieContainer = document.getElementById("movie-list-container");
  if (!movieContainer) return;

  const moviesPerLoad = getMoviesPerLoad();
  const remaining = allMovies.length - displayedCount;
  const itemsToLoad = Math.min(remaining, moviesPerLoad);

  renderMovies(
    movieContainer,
    allMovies.slice(displayedCount, displayedCount + itemsToLoad)
  );
  displayedCount += itemsToLoad;

  if (displayedCount >= allMovies.length) {
    removeLoadMoreButton();
  }
}

async function fetchAndRenderMovies() {
  const movieContainer = document.getElementById("movie-list-container");
  if (!movieContainer) return;

  showSkeletonUI(movieContainer);

  try {
    allMovies = await fetchMovies();
    movieContainer.innerHTML = "";
    loadMoreMovies();

    if (allMovies.length > getMoviesPerLoad()) {
      createLoadMoreButton(movieContainer, loadMoreMovies);
    }
  } catch (error) {
    console.error("❌ Error loading movies:", error);
  }
}

export function initMovieList() {
  fetchAndRenderMovies();
}
