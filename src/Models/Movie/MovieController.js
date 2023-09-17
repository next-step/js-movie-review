import { MovieService } from './MovieService';
import { Fetcher } from '../Fetcher';
import { MovieView } from '../../components/MovieView';
import { EVENT } from '../../constants';

export class MovieController {
  #service;
  #fetcher = new Fetcher();
  #view = new MovieView();

  constructor() {
    this.#service = new MovieService(this.#fetcher);
    this.#initial();
  }

  async #initial() {
    this.#setupFetchButtonEvent();
    this.#getNewMovie();
  }

  #setupFetchButtonEvent() {
    const fetchButton = document.querySelector('#movie-fetch-button');
    fetchButton.addEventListener(EVENT.CLICK, async () => {
      this.#getNewMovie();
    });
  }

  async #getNewMovie() {
    const components = this.#view.showSkeleton();
    const movies = await this.#service.getMovie();

    movies.forEach((movie, index) => {
      if (components[index]) components[index].render(movie);
    });
  }
}
