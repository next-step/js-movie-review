import { MovieApiData } from "../../types/movie-api-data";
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

  async fetchMovies(page: number) {
    const movieUrl = Api.generatePopularMoviesUrl(page);

    try {
      const { results: movies } = await Api.get<MovieApiData[]>(movieUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new MovieModel({
            title: movie.title,
            thumbnail: `${Api.THUMBNAIL_URL}${movie.poster_path}`,
            rating: movie.vote_average,
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
      const { results: movies } = await Api.get<MovieApiData[]>(searchUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new MovieModel({
            title: movie.title,
            thumbnail: `${Api.THUMBNAIL_URL}${movie.poster_path}`,
            rating: movie.vote_average,
          })
        );
      });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default MovieListModel;
