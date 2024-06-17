export interface PopularMovieListResponseDTO {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  overview: string;
}

export interface MovieDetailResponseDTO extends PopularMovieListResponseDTO {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface MovieUserRatingResponseDTO {
  id: number;
  rated:
    | false
    | {
        value: number;
      };
}

export interface MovieUserRatingRequestDTO {
  value: number;
}
