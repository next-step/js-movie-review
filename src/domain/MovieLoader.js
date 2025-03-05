import { fetchPopularMovies } from "../api";
import { Headers } from "../components/Headers";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { MovieList, renderMovieItems } from "../components/MovieList";

let currentPage = 1;
let allMovies = [];
let hasMoreMovies = true;
const DEFAULT_MOVIE_RENDER_COUNT = 20;
const MAX_PAGE = 500;

export const initializeMovieSection = async () => {
  const initialMovies = await fetchPopularMovies();
  allMovies = initialMovies.results;

  if(allMovies.length === 0) {
    throw Error("영화 정보가 로드되지 않았습니다.")
  }

  renderHeaders(allMovies[0]);

  renderMovieSection(allMovies);

  addLoadMoreButtonEvent();
};

const renderHeaders = (movie) => {
  const wrap = document.querySelector("#wrap");
  wrap.insertAdjacentHTML("afterbegin", Headers(movie));
};

const renderMovieSection = (movies) => {
  const movieSection = document.querySelector(".movie-section");
  movieSection.innerHTML = MovieList({ movies });

  const initHasMoreMovies = movies.length === DEFAULT_MOVIE_RENDER_COUNT;
  const loadMoreButtonHTML = LoadMoreButton(initHasMoreMovies);
  movieSection.insertAdjacentHTML("beforeend", loadMoreButtonHTML);
};

const loadMoreMovies = async () => {
  if (!hasMoreMovies) return;

  const newMovies = await fetchPopularMovies(currentPage + 1);

  allMovies = [...allMovies, ...newMovies.results];
  currentPage++;

  addMovieItems(newMovies.results);

  updateLoadMoreButtonDisplay(newMovies.results.length);
};

const addLoadMoreButtonEvent = () => {
  const loadMoreButton = document.getElementById("load-more-button");
  loadMoreButton?.addEventListener("click", loadMoreMovies);
};

const addMovieItems = (movies) => {
  const movieSection = document.querySelector(".thumbnail-list");
  movieSection.insertAdjacentHTML("beforeend", renderMovieItems(movies));
};

const updateLoadMoreButtonDisplay = (loadedMovieCount) => {
  if (loadedMovieCount === 0 || currentPage === MAX_PAGE) {
    hasMoreMovies = false;

    const loadMoreButton = document.getElementById("load-more-button");
    if (loadMoreButton) {
      loadMoreButton.style.display = "none";
    }
    return;
  }
};
