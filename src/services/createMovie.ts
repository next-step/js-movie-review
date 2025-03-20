import { MovieApiDto, MovieModel } from "../types/type";
import { getUserRating } from "./userRating";

export const createMovie = (data: MovieApiDto): MovieModel => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    release_date,
    genres,
    overview,
  } = data;

  const getThumbnailUrl = (): string =>
    `https://image.tmdb.org/t/p/w500${poster_path}`;

  const getBackdropUrl = (): string =>
    `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`;

  const getFormattedVote = (): string => vote_average.toFixed(1);

  const getYear = (): string =>
    release_date ? release_date.split("-")[0] : "Unknown";

  const getGenres = (): string =>
    genres?.map((genre) => genre.name).join(", ") || "";

  const getOverview = (): string => overview || "상세 정보 없음.";

  return {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    release_date,
    genres,
    overview,
    getThumbnailUrl,
    getBackdropUrl,
    getFormattedVote,
    getYear,
    getGenres,
    getOverview,
    userRating: getUserRating(id),
  };
};
