import { fetchPopularMovies } from "../api/api";
import { Movie } from "./Movie";

export class MovieList {
  #movies = [];
  #page = 1;

  constructor({ page = 1 }) {
    this.#page = page;
  }

  async generateMovies() {
    const movies = await fetchPopularMovies({ page: this.#page });

    const movieList = movies.map(
      (movie) =>
        new Movie({
          title: movie.title,
          rating: movie.vote_average,
          thumbnail: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        })
    );

    this.addMovies(movieList);
    return movieList;
  }

  get movies() {
    return [...this.#movies];
  }

  nextPage() {
    this.#page ++;
  }

  addMovies(movies) {
    this.#movies = [...this.#movies, ...movies];
  }
}
