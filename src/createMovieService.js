import { fetchMovies } from "./api.js";
import { createMovie } from "./createMovie.js";

export function createMovieService() {
  let allMovies = [];
  let displayedCount = 0;
  let moviesPerLoad = 9;

  function setMoviesPerLoad(num) {
    moviesPerLoad = num;
  }

  async function loadMovies(category) {
    const rawData = await fetchMovies(category);
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
    getNextBatch,
    hasMore,
    getFirstMovie,
    setMoviesPerLoad,
  };
}
