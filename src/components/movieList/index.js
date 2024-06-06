import { $ } from "../../utils/querySelector";
import MovieCard from "../movieCard";
import MovieListHeader from "./movieListHeader";
import MovieListWrapper from "./movieListWrapper";

class MovieList {
  #movieListHeader;
  #movieListWrapper;

  constructor() {
    this.#movieListHeader = new MovieListHeader("지금 인기있는 영화").element;
    this.#movieListWrapper = new MovieListWrapper().element;
  }

  render(target) {
    const section = document.createElement("section");
    section.classList.add("item-view");
    section.appendChild(this.#movieListHeader);
    section.appendChild(this.#movieListWrapper);

    $(target).appendChild(section);
  }

  static renderMovies(movies) {
    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => {
      const movieCard = new MovieCard(movie).element;
      fragment.appendChild(movieCard);
    });
    $("ul").appendChild(fragment);
  }
}

export default MovieList;
