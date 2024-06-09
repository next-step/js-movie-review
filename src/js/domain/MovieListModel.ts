import { PopularMovieListResponseDTO } from "../../types/MovieApiDTO";
import Api from "./Api";
import MovieModel from "./MovieModel";

class MovieListModel {
  #movies: MovieModel[];

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return [...this.#movies];
  }

  getMoviesByPage(page: number) {
    return this.movies.slice(
      Api.NUM_MOVIES_PER_PAGE * (page - 1),
      Api.NUM_MOVIES_PER_PAGE * page
    );
  }

  addMovie(movie: MovieModel) {
    this.#movies.push(movie);
  }

  clearMovies() {
    this.#movies = [];
  }

  getMovieById(movieId: number) {
    return this.#movies.find((movie) => movie.id === movieId);
  }

  async fetchMovies(page: number) {
    const movieUrl = Api.generatePopularMoviesUrl(page);

    try {
      const { results: movies } = await Api.get<{
        results: PopularMovieListResponseDTO[];
      }>(movieUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new MovieModel({
            id: movie.id,
            title: movie.title,
            thumbnail: `${Api.THUMBNAIL_URL}${movie.poster_path}`,
            rating: movie.vote_average,
            overview: movie.overview,
          })
        );
      });
    } catch (e) {
      alert(e.message);
    }
  }

  async searchMovies(query: string, page: number) {
    const searchUrl = Api.generateSearchMoviesUrl(query, page);

    try {
      const { results: movies } = await Api.get<{
        results: PopularMovieListResponseDTO[];
      }>(searchUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new MovieModel({
            id: movie.id,
            title: movie.title,
            thumbnail: `${Api.THUMBNAIL_URL}${movie.poster_path}`,
            rating: movie.vote_average,
            overview: movie.overview,
          })
        );
      });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default MovieListModel;
