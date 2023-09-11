import { Fetcher } from '../Fetcher';
import { PROMISE_STATE } from '../../constants';

export class MovieService {
  #fetcher = new Fetcher();
  #movieApis;

  constructor(movieApis) {
    this.#movieApis = movieApis;
  }

  async fetchAllMovies() {
    const movieResults = await this.#fetchMoviesFromApis(this.#movieApis);

    return this.#extractFulfilledResults(movieResults);
  }

  async #fetchMoviesFromApis(apiConfigs) {
    return await Promise.allSettled(
      apiConfigs.map(({ endpoint, config }) =>
        this.#getMovies(endpoint, config)
      )
    );
  }

  async #getMovies(endpoint, config) {
    return await this.#fetcher.get(endpoint, config);
  }

  #extractFulfilledResults(results) {
    return results
      .filter(({ status }) => status === PROMISE_STATE.FULFILLED)
      .map(({ value }) => value);
  }
}
