import { MovieService } from './MovieService';
import { MOVIE_API } from '../../constants';

export class MovieController {
  #service = new MovieService();

  async fetchAllMovies() {
    const movieApiConfigs = [MOVIE_API.TMDB.POPULAR_MOVIE];
    const movieResults = await this.#fetchMoviesFromApis(movieApiConfigs);

    return this.#extractFulfilledResults(movieResults);
  }

  async #fetchMoviesFromApis(apiConfigs) {
    return await Promise.allSettled(
      apiConfigs.map(({ endpoint, config }) =>
        this.#service.getMovies(endpoint, config)
      )
    );
  }

  #extractFulfilledResults(results) {
    return results
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);
  }
}
