import { MovieService } from './MovieService';
import { EVENT } from '../../constants';
import { Fetcher } from '../Fetcher';

export class MovieController {
  #service;
  #fetcher = new Fetcher();

  constructor() {
    this.#service = new MovieService(this.#fetcher);
    this.#initial();
  }

  async #initial() {
    this.#setupLoadingEvent();
    const movies = await this.#service.fetchMoviePage(1);
    this.#renderMovie(movies);
  }

  #setupLoadingEvent() {
    this.#fetcher.eventListener.addEventListener(
      EVENT.LOADING_STATE_CHANGE,
      () => {
        this.#handleLoading(this.#fetcher.isLoading);
      }
    );
  }

  #handleLoading(isLoading) {
    console.log(isLoading);
  }

  #renderMovie(movies) {
    console.log('render:', movies);
  }
}
