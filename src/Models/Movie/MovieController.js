import { MovieService } from './MovieService';
import { Fetcher } from '../Fetcher';
import { View } from '../../View/View';
import { EVENT } from '../../constants';
import { MovieComponent } from '../../components/MovieComponent';

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

  async #getMovie(mode = 'popular') {
    const components = Array(20)
      .fill(null)
      .map(() => new MovieComponent());

    const movieList = document.querySelector('.item-list');
    components.forEach((v) => movieList.appendChild(v.component));
    const movies = await this.#fetchBranch(mode);

    if (movies.length < 20) this.#view.removeMovieFetchButton(movies);

    for (let i = 0; i < 20; i++) components[i].render(movies[i]);
  }

  async #fetchBranch(mode) {
    if (mode === 'search')
      return await this.#service.searchMovie(this.#searchTerm); // view

    return await this.#service.getMovie();
  }
}
