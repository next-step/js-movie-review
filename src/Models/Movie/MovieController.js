import { MovieService } from './MovieService';
import { EVENT, MOVIE_API } from '../../constants';
import { Fetcher } from '../Fetcher';

export class MovieController {
  #service;
  #fetcher;

  constructor() {
    this.#fetcher = new Fetcher();
    this.#service = new MovieService(this.#fetcher);
    this.#setupLoadingEvent();
  }

  #setupLoadingEvent() {
    this.#fetcher.eventListener.addEventListener(
      EVENT.LOADING_STATE_CHANGE,
      () => {
        this.#handleLoading(this.#fetcher.isLoading);
      }
    );
  }

  loadMovies() {
    const movieApis = [MOVIE_API.TMDB.POPULAR_MOVIE];

    return this.#service.fetchMovies(movieApis);
  }

  #handleLoading(isLoading) {}
}
