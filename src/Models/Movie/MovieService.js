import { PROMISE_STATE, MOVIE_API } from '../../constants';

export class MovieService {
  #fetcher;

  constructor(fetcher) {
    this.#fetcher = fetcher;
  }

  async fetchMoviePage(page) {
    const movieApis = [MOVIE_API.TMDB.POPULAR_MOVIE(page)];
    const movieResults = await Promise.allSettled(
      movieApis.map(({ endpoint, config }) =>
        this.#fetcher.get(endpoint, config)
      )
    );
    const fulfilledMovies = this.#getFulfilled(movieResults);

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
}
