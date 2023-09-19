import { MovieComponent } from '../components/MovieComponent';

export class View {
  #movieList = document.querySelector('.item-list');

  constructor() {}

  createMovieComponent(amount) {
    const components = Array(amount)
      .fill(null)
      .map(() => new MovieComponent());

    components.forEach((v) => this.#movieList.appendChild(v.component));

    return components;
  }

  clearMovies() {
    this.#movieList.innerHTML = '';
  }

  removeMovieFetchButton() {
    const fetchButton = document.querySelector('#movie-fetch-button');

    if (fetchButton) fetchButton.remove();
  }

  getSearchTerm() {
    return document.querySelector('#movie-search-input');
  }
}
