import { MovieCard } from './MovieCard.js';

export class MovieList {
  #movieClient;
  #$parent;

  constructor(movieClient, $parent) {
    this.#movieClient = movieClient;
    this.#$parent = $parent;
  }

  #getMovieData() {
    const data = this.#movieClient.get();

    return data;
  }

  #createMovieCard(movieData) {
    return movieData.map((data) => {
      return new MovieCard(data).card;
    });
  }

  #appendMovieList(cards) {
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => {
      fragment.appendChild(card);
    });

    return fragment;
  }

  render() {
    const movieData = this.#getMovieData();
    const cards = this.#createMovieCard(movieData);
    const cardList = this.#appendMovieList(cards);

    this.#$parent.appendChild(cardList);

    console.log('hi');
  }
}
