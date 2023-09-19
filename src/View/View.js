import { MovieComponent } from '../components/MovieComponent';

export class View {
  #movieList = document.querySelector('.item-list');

  constructor() {}

  clearMovies() {
    this.#movieList.innerHTML = '';
  }

  removeMovieFetchButton() {
    const fetchButton = document.querySelector('#movie-fetch-button');

    if (fetchButton) fetchButton.remove();
  }
}
