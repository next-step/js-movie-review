import { MovieService } from '../Models';
import { MovieView } from '../View';
import { Fetcher } from '../api';
import { EVENT, SELECTOR } from '../constants';

export class MovieController {
  #service;
  #view = new MovieView();
  #fetcher = new Fetcher();
  #searchTerm = '';

  constructor() {
    this.#service = new MovieService(this.#fetcher);
    this.#initial();
  }

  #initial() {
    this.#setupFetchButtonEvent();
    this.#setupSearchButtonEvent();
    this.#getMovie();
  }

  /* BindEvent */
  #setupFetchButtonEvent() {
    const fetchButton = document.querySelector(SELECTOR.FETCH_BUTTON);
    fetchButton.addEventListener(EVENT.CLICK, () => {
      this.#getMovie();
    });
  }

  #setupSearchButtonEvent() {
    const searchButton = document.querySelector(SELECTOR.SEARCH_BUTTON);
    const searchInput = document.querySelector(SELECTOR.SEARCH_INPUT);

    searchButton.addEventListener(EVENT.CLICK, () => {
      this.#view.clearMovies();
      this.#service.resetPage();
      this.#searchTerm = searchInput.value.trim();
      this.#getMovie();
    });
  }

  async #getMovie() {
    const components = this.#view.createMovieComponent(20);
    const movies = await this.#fetchBranch();

    if (movies.length < 20) this.#view.hideMovieFetchButton();
    if (movies.length === 20) this.#view.renderMovieFetchButton();

    for (let i = 0; i < 20; i++) components[i].render(movies[i]);
  }

  async #fetchBranch() {
    if (this.#searchTerm)
      return await this.#service.searchMovie(this.#searchTerm);

    return await this.#service.getMovie();
  }
}
