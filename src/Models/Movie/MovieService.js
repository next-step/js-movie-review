import { Fetcher } from '../Fetcher';

export class MovieService {
  #fetcher = Fetcher;

  async getMovies(endpoint, config) {
    return await this.#fetcher.get(endpoint, config);
  }
}
