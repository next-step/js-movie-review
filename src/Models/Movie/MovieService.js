import {
  PROMISE_STATE,
  MOVIE_API,
  BASE_IMAGE_URL,
  DEFAULT_PAGE,
} from '../../constants';
import { Movie } from '../Movie';

export class MovieService {
  #fetcher;
  #page = DEFAULT_PAGE;

  constructor(fetcher) {
    this.#fetcher = fetcher;
  }

  async #fetchMoviePage(page) {
    const movieApis = [MOVIE_API.TMDB.POPULAR_MOVIE(page)];
    const movieResults = await Promise.allSettled(
      movieApis.map(({ endpoint, config }) =>
        this.#fetcher.get(endpoint, config)
      )
    );
    const fulfilledMovies = this.#getFulfilled(movieResults);
    console.log(fulfilledMovies);

    return this.#parseTMDB(fulfilledMovies);
  }

  #getFulfilled(results) {
    return results
      .filter(({ status }) => status === PROMISE_STATE.FULFILLED)
      .map(({ value }) => value);
  }

  #parseTMDB(result) {
    return result[0].results;
  }

  async getMovie() {
    const fetchData = await this.#fetchMoviePage(this.#page++);
    const movies = fetchData.map((movie) => {
      const { original_title, overview, poster_path, vote_average } = movie;

      return new Movie({
        title: original_title,
        thumbnail: `${BASE_IMAGE_URL}${poster_path}`,
        rating: vote_average,
        description: overview,
      });
    });

    return movies;
  }
}
