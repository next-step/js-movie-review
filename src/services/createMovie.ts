import { ApiMovie, Movie } from "../types/type";

export function createMovie(data: ApiMovie): Movie {
  const { id, title, poster_path, vote_average, backdrop_path } = data;

  function getThumbnailUrl(): string {
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  }

  function getBackdropUrl(): string {
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`;
  }

  function getFormattedVote(): string {
    return vote_average.toFixed(1);
  }

  return {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    getThumbnailUrl,
    getBackdropUrl,
    getFormattedVote,
  };
}
