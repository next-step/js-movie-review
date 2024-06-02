export class Movie {
  #title;
  #thumbnail;
  #rating;

  constructor({ title, thumbnail, rating }) {
    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#rating = rating.toFixed(2);
  }

  get title() {
    return this.#title;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get rating() {
    return this.#rating;
  }
}
