import { MovieService } from './MovieService';
import { Fetcher } from '../Fetcher';
import { MovieView } from '../../components/MovieView';
import { EVENT } from '../../constants';

export class MovieController {
  #service;
  #fetcher = new Fetcher();
  #view = new MovieView();
  #searchTerm = '';

  constructor() {
    this.#service = new MovieService(this.#fetcher);
    this.#initial();
  }

  async #initial() {
    this.#setupFetchButtonEvent();
    this.#setupSearchButtonEvent();
    this.#getMoreMovie();
  }

  #setupFetchButtonEvent() {
    const fetchButton = document.querySelector('#movie-fetch-button');
    fetchButton.addEventListener(EVENT.CLICK, async () => {
      this.#getMoreMovie();
    });
  }

  async #getMoreMovie() {
    const components = this.#view.showSkeleton();
    const movies = await this.#fetchBranch(this.#searchTerm);

    movies.forEach((movie, index) => {
      if (components[index]) components[index].render(movie);
    });
  }

  async #fetchBranch(searchTerm) {
    if (searchTerm) return await this.#service.searchMovie(this.#searchTerm);

    return await this.#service.getMovie();
  }

  #setupSearchButtonEvent() {
    const searchButton = document.querySelector('#movie-search-button');
    const searchInput = document.querySelector('#movie-search-input');

    searchButton.addEventListener(EVENT.CLICK, async () => {
      this.#view.clearMovies();
      this.#service.resetPage();
      this.#searchTerm = searchInput.value.trim();
      this.#getMoreMovie();
    });
  }
}
