import { MovieService } from '../Models';
import { MovieView } from '../View';
import { Fetcher } from '../api';
import { EVENT, MOVIE_FETCH_UNIT, SELECTOR } from '../constants';

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
    const components = this.#view.createMovieComponent(MOVIE_FETCH_UNIT);
    components.forEach((component) => component.showSkeleton());

    const movies = await this.#fetchMovie();
    this.#handleFetchButton(movies);

    components.forEach(
      (component, index) => movies[index] && component.render(movies[index])
    );
  }

  #handleFetchButton(movies) {
    if (movies.length < MOVIE_FETCH_UNIT) this.#view.hideMovieFetchButton();
    if (movies.length === MOVIE_FETCH_UNIT) this.#view.renderMovieFetchButton();
  }

  async #fetchMovie() {
    if (this.#searchTerm)
      return await this.#service.searchMovie(this.#searchTerm);

    return await this.#service.getMovie();
  }
}
