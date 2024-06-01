import MovieListHeader from "./movieListHeader";

class MovieList {
  #movieListHeader;

  constructor() {
    this.#movieListHeader = new MovieListHeader("지금 인기있는 영화").element;
    this.element = this.render();
  }

  render() {
    const section = document.createElement("section");
    const ul = document.createElement("ul");
    ul.classList.add("item-list");
    section.classList.add("item-view");
    section.appendChild(this.#movieListHeader);
    section.appendChild(ul);

    return section;
  }
}

export default MovieList;
