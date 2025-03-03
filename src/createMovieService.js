import { fetchMovies } from "./api.js";
import { DESKTOP_MOVIES_PER_LOAD } from "./constants.js";
import { createMovie } from "./createMovie.js";

export function createMovieService() {
  let allMovies = [];
  let displayedCount = 0;
  let moviesPerLoad = DESKTOP_MOVIES_PER_LOAD;

  function setMoviesPerLoad(num) {
    moviesPerLoad = num;
  }

  async function loadMovies(category) {
    const rawData = await fetchMovies(category);
    allMovies = rawData.map((item) => createMovie(item));
    displayedCount = 0;
  }

  async function searchMovies(query) {
    const rawData = await fetchSearchMovies(query);
    allMovies = rawData.map((item) => createMovie(item));
    displayedCount = 0;
  }

  function getNextBatch() {
    const remaining = allMovies.length - displayedCount;
    const itemsToLoad = Math.min(remaining, moviesPerLoad);
    const batch = allMovies.slice(0, displayedCount + itemsToLoad);
    displayedCount += itemsToLoad;
    return batch;
  }

  function hasMore() {
    return displayedCount < allMovies.length;
  }

  function getFirstMovie() {
    return allMovies.length > 0 ? allMovies[0] : null;
  }

  return {
    loadMovies,
    searchMovies,
    getNextBatch,
    hasMore,
    getFirstMovie,
    setMoviesPerLoad,
  };
}
