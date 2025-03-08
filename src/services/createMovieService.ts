import { fetchMovies, fetchSearchMovies } from "./api.js";
import { DESKTOP_MOVIES_PER_LOAD } from "../constants.js";
import { createMovie } from "./createMovie.js";
import {
  MovieApiDto,
  MovieCategory,
  MovieModel,
  IMovieService,
} from "../types/type.js";

export function createMovieService(): IMovieService {
  let allMovies: MovieModel[] = [];
  let displayedCount = 0;
  let moviesPerLoad = DESKTOP_MOVIES_PER_LOAD;

  function setMoviesPerLoad(num: number): void {
    moviesPerLoad = num;
  }

  async function loadMovies(category: MovieCategory): Promise<void> {
    const rawData = await fetchMovies(category);
    allMovies = rawData.map((item: MovieApiDto) => createMovie(item));
    displayedCount = 0;
  }

  async function searchMovies(query: string): Promise<void> {
    const rawData = await fetchSearchMovies(query);
    allMovies = rawData.map((item: MovieApiDto) => createMovie(item));
    displayedCount = 0;
  }

  function getNextBatch(): MovieModel[] {
    const remaining = allMovies.length - displayedCount;
    const itemsToLoad = Math.min(remaining, moviesPerLoad);
    const batch = allMovies.slice(0, displayedCount + itemsToLoad);
    displayedCount += itemsToLoad;
    return batch;
  }

  function hasMore(): boolean {
    return displayedCount < allMovies.length;
  }

  function getFirstMovie(): MovieModel | null {
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
