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
}

export interface MovieModel {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  getThumbnailUrl: () => string;
  getBackdropUrl: () => string;
  getFormattedVote: () => string;
}

export interface IMovieService {
  loadMovies: (category: MovieCategory) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  getNextBatch: () => MovieModel[];
  hasMore: () => boolean;
  getFirstMovie: () => MovieModel | null;
  setMoviesPerLoad: (num: number) => void;
}
