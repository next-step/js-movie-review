class MovieListWrapper {
  constructor() {
    this.element = this.element();
  }

  element() {
    const ul = document.createElement("ul");
    ul.classList.add("item-list");
    return ul;
  }
}

export default MovieListWrapper;
