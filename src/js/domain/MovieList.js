import { fetchPopularMovies } from "../util/fetchMovie";
import { Movie } from "./Movie";

export class MovieList {
  #movies = [];

  async generateMovies({ page }) {
    const movies = await fetchPopularMovies({ page });

    this.#movies = movies.map(
      (movie) =>
        new Movie({
          title: movie.title,
          rating: movie.vote_average,
          thumbnail: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        })
    );
  }

  get movies() {
    return [...this.#movies];
  }
}
