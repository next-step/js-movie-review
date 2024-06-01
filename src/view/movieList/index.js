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
    this.element = this.element();
  }

  element() {
    const section = document.createElement("section");
    section.classList.add("item-view");
    section.appendChild(this.#movieListHeader);
    section.appendChild(this.#movieListWrapper);
    return section;
  }

  renderMovies(movies) {
    movies.forEach((movie) => {
      const { title, poster_path, vote_average } = movie;
      const movieCard = new MovieCard(poster_path, title, vote_average).element;
      $("ul").appendChild(movieCard);
    });
  }
}

export default MovieList;
