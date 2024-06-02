import Api from "./Api.js";
import Movie from "./Movie.js";

class MovieList {
  #movies;

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return [...this.#movies];
  }

  getMoviesByPage(page) {
    return this.movies.slice(
      Api.NUM_MOVIES_PER_PAGE * (page - 1),
      Api.NUM_MOVIES_PER_PAGE * page
    );
  }

  addMovie(movie) {
    this.#movies.push(movie);
  }

  async fetchMovies(page) {
    const movieUrl = Api.generateUrl(page);

    try {
      const { results: movies } = await Api.get(movieUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new Movie({
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

export default MovieList;
