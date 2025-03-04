export type Category = "now_playing" | "popular" | "top_rated" | "upcoming";

export interface ApiMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  getThumbnailUrl: () => string;
  getBackdropUrl: () => string;
  getFormattedVote: () => string;
}

export interface MovieService {
  loadMovies: (category: Category) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  getNextBatch: () => Movie[];
  hasMore: () => boolean;
  getFirstMovie: () => Movie | null;
  setMoviesPerLoad: (num: number) => void;
}
