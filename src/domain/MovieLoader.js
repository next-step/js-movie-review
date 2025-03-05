import { fetchPopularMovies } from "../api";
import { Headers } from "../components/Headers";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { MovieList, renderMovieItems } from "../components/MovieList";

let currentPage = 1;
let allMovies = [];
let hasMoreMovies = true;

export const initializeMovieSection = async () => {
  const initialMovies = await fetchPopularMovies();
  allMovies = initialMovies.results;

  renderHeaders(allMovies[0]);

  renderMovieSection(allMovies);

  addLoadMoreButtonEvent();
};

const loadMoreMovies = async () => {
  if (!hasMoreMovies) return;

  const newMovies = await fetchPopularMovies(currentPage + 1);
  if (newMovies.results.length === 0) {
    hasMoreMovies = false;

    const loadMoreButton = document.getElementById("load-more-button");
    if (loadMoreButton) {
      loadMoreButton.style.display = "none";
    }
    return;
  }

  allMovies = [...allMovies, ...newMovies.results];
  currentPage++;

  const movieSection = document.querySelector(".thumbnail-list");
  movieSection.insertAdjacentHTML(
    "beforeend",
    renderMovieItems(newMovies.results),
  );
};

const addLoadMoreButtonEvent = () => {
  const loadMoreButton = document.getElementById("load-more-button");
  loadMoreButton?.addEventListener("click", loadMoreMovies);
};

const renderMovieSection = (movies) => {
  const movieSection = document.querySelector(".movie-section");
  movieSection.innerHTML = MovieList({ movies });

  const initHasMoreMovies = movies.length > 0;
  const loadMoreButtonHTML = LoadMoreButton(initHasMoreMovies);
  movieSection.insertAdjacentHTML("beforeend", loadMoreButtonHTML);
};

const renderHeaders = (movie) => {
  const wrap = document.querySelector("#wrap");
  wrap.insertAdjacentHTML("afterbegin", Headers(movie));
};
