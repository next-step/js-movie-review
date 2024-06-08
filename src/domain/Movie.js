class Movie {
  #title;
  #image;
  #rating;

  constructor({ title, image, rating }) {
    this.#title = title;
    this.#image = image;
    this.#rating = rating;
  }

  get title() {
    return this.#title;
  }
  get image() {
    return this.#image;
  }
  get rating() {
    return this.#rating;
  }
}

export default Movie;
