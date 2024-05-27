class Movie {
  #title;
  #rating;
  #thumbnail;

  constructor({ title, rating, thumbnail }) {
    this.#title = title;
    this.#rating = rating;
    this.#thumbnail = thumbnail;
  }

  get title() {
    return this.#title;
  }

  get rating() {
    return this.#rating;
  }

  get thumbnail() {
    return this.#thumbnail;
  }
}

export default Movie;
