export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

export interface MovieApiDto {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
}

export interface UserRating {
  movieId: number;
  score: number;
  ratedAt: string;
}

export interface MovieModel {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
  userRating?: UserRating | null;

  getThumbnailUrl: () => string;
  getBackdropUrl: () => string;
  getFormattedVote: () => string;
  getYear: () => string;
  getGenres: () => string;
  getOverview: () => string;
}

export interface IMovieService {
  loadMovies: (category: MovieCategory) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  getNextBatch: () => MovieModel[];
  getMovieDetails: (movieId: number) => Promise<MovieModel>;
  hasMore: () => boolean;
  getFirstMovie: () => MovieModel | null;
  setMoviesPerLoad: (num: number) => void;
}
