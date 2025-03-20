import { fetchMovieDetails, fetchMovies, fetchSearchMovies } from "./api.js";
import { DESKTOP_MOVIES_PER_LOAD } from "../constants.js";
import { createMovie } from "./createMovie.js";
import {
  MovieApiDto,
  MovieCategory,
  MovieModel,
  IMovieService,
} from "../types/type.js";

export const createMovieService = (): IMovieService => {
  let allMovies: MovieModel[] = [];
  let displayedCount = 0;
  let moviesPerLoad = DESKTOP_MOVIES_PER_LOAD;

  const setMoviesPerLoad = (num: number): void => {
    moviesPerLoad = num;
  };

  const loadMovies = async (category: MovieCategory): Promise<void> => {
    const rawData = await fetchMovies(category);
    allMovies = rawData.map((item: MovieApiDto) => createMovie(item));
    displayedCount = 0;
  };

  const searchMovies = async (query: string): Promise<void> => {
    const rawData = await fetchSearchMovies(query);
    allMovies = rawData.map((item: MovieApiDto) => createMovie(item));
    displayedCount = 0;
  };

  const getMovieDetails = async (movieId: number): Promise<MovieModel> => {
    const movieData = await fetchMovieDetails(movieId);
    return createMovie(movieData);
  };

  const getNextBatch = (): MovieModel[] => {
    const previousCount = displayedCount;
    const remaining = allMovies.length - displayedCount;
    const itemsToLoad = Math.min(remaining, moviesPerLoad);
    displayedCount += itemsToLoad;
    return allMovies.slice(previousCount, displayedCount);
  };

  const hasMore = (): boolean => displayedCount < allMovies.length;

  const getFirstMovie = (): MovieModel | null =>
    allMovies.length > 0 ? allMovies[0] : null;

  return {
    loadMovies,
    searchMovies,
    getMovieDetails,
    getNextBatch,
    hasMore,
    getFirstMovie,
    setMoviesPerLoad,
  };
};
