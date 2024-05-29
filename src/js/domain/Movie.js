class Movie {
  #title;
  #thumbnail;
  #rating;

  constructor({ title, thumbnail, rationg }) {
    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#rating = rationg;
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

  render;
}
