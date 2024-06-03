import { fetchPopularMovies } from "../util/fetchMovie";
import { Movie } from "./Movie";

export class MovieList {
  #movies = [];

  async generateMovies({ page }) {
    const movies = await fetchPopularMovies({ page });

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

  addMovies(movies) {
    this.#movies = [...this.#movies, ...movies];
  }
}
