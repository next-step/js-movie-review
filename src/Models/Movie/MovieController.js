import { MovieService } from './MovieService';
import { Fetcher } from '../Fetcher';
import { View } from '../../View/View';
import { EVENT } from '../../constants';

export class MovieController {
  #service;
  #view = new View();
  #fetcher = new Fetcher();
  #searchTerm = '';

  constructor() {
    this.#service = new MovieService(this.#fetcher);
    this.#initial();
  }

  async #initial() {
    this.#setupFetchButtonEvent();
    this.#setupSearchButtonEvent();
    this.#getMovie();
  }

  /* BindEvent */
  #setupFetchButtonEvent() {
    const fetchButton = document.querySelector('#movie-fetch-button');
    fetchButton.addEventListener(EVENT.CLICK, async () => {
      this.#getMovie();
    });
  }

  #setupSearchButtonEvent() {
    const searchButton = document.querySelector('#movie-search-button');
    const searchInput = document.querySelector('#movie-search-input');

    searchButton.addEventListener(EVENT.CLICK, async () => {
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
