import { fetchPopularMovies } from "./api";
import { insertMovieHeaders } from './components/Headers';
import { LoadMoreButton } from "./components/LoadMoreButton";
import { MovieList, insertMovieItems } from "./components/MovieList";
import { addSkeleton, removeSkeleton } from "./components/SkeletonItems";
import { DEFAULT_MOVIE_RENDER_COUNT } from "./constants";


let currentPage = 1;
let allMovies = [];
let hasMoreMovies = true;
const MAX_PAGE = 500;

export const initializeMovieSection = async () => {
  const initialMovies = await fetchPopularMovies();
  allMovies = initialMovies.results;

  if (allMovies.length === 0) {
    throw Error("영화 정보가 로드되지 않았습니다.");
  }

  insertMovieHeaders(allMovies[0]);

  renderMovieSection(allMovies);

  addLoadMoreButtonEvent();
};

const loadMoreMovies = async () => {
  if (!hasMoreMovies) return;

  addSkeleton();

  const newMovies = await fetchPopularMovies(currentPage + 1);

  allMovies = [...allMovies, ...newMovies.results];
  currentPage++;

  insertMovieItems(newMovies.results);

  removeSkeleton();

  updateLoadMoreButtonDisplay(newMovies.results.length);
};

const addLoadMoreButtonEvent = () => {
  const loadMoreButton = document.getElementById("load-more-button");
  loadMoreButton?.addEventListener("click", loadMoreMovies);
};

const updateLoadMoreButtonDisplay = (loadedMovieCount, currentPage) => {
  if (
    loadedMovieCount < DEFAULT_MOVIE_RENDER_COUNT ||
    currentPage === MAX_PAGE
  ) {
    hasMoreMovies = false;

    const loadMoreButton = document.getElementById("load-more-button");
    if (loadMoreButton) {
      loadMoreButton.style.display = "none";
    }
    return;
  }
};

const renderMovieSection = (movies) => {
  const movieSection = document.querySelector(".movie-section");
  movieSection.innerHTML = MovieList({ movies });

  const initHasMoreMovies = movies.length === DEFAULT_MOVIE_RENDER_COUNT;
  const loadMoreButtonHTML = LoadMoreButton(initHasMoreMovies);
  movieSection.insertAdjacentHTML("beforeend", loadMoreButtonHTML);
};
