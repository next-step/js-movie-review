import Movie from "./Movie.js";

const apiKey = window.Cypress
  ? Cypress.env("TMDB_API_KEY")
  : process.env.TMDB_API_KEY;
class MovieList {
  #movies;

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return [...this.#movies];
  }

  addMovie(movie) {
    this.#movies.push(movie);
  }

  async fetchMovies(page, language = "ko-KR") {
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";
    const param = new URLSearchParams({
      api_key: apiKey,
      language,
      page,
    });

    const response = await fetch(`${baseUrl}?${param}`);
    const data = await response.json();

    data.results.forEach((movie) => {
      this.addMovie(
        new Movie({
          title: movie.title,
          thumbnail: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          rating: movie.vote_average,
        })
      );
    });
  }
}

export default MovieList;
