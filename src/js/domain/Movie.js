export class Movie {
  #title;
  #thumbnail;
  #rating;

  constructor({ title, thumbnail, rating }) {
    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#rating = rating;
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
