import { PROMISE_STATE } from '../../constants';

export class MovieService {
  #fetcher;

  constructor(fetcher) {
    this.#fetcher = fetcher;
  }

  async fetchMovies(movieApis) {
    const movieResults = await Promise.allSettled(
      movieApis.map(({ endpoint, config }) =>
        this.#fetcher.get(endpoint, config)
      )
    );

    return this.#getFulfilled(movieResults);
  }

  #getFulfilled(results) {
    return results
      .filter(({ status }) => status === PROMISE_STATE.FULFILLED)
      .map(({ value }) => value);
  }
}
