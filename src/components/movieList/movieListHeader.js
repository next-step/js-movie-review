class MovieListHeader {
  #title;

  constructor(title) {
    this.#title = title;
    this.element = this.element();
  }

  element() {
    const h2 = document.createElement("h2");
    h2.textContent = this.#title;

    return h2;
  }
}

export default MovieListHeader;
