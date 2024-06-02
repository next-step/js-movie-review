import { MovieList } from "../../domain/MovieList";
import { mainTitle } from "./index";
import { mainMoreButton } from "./main-more-button";
import { MovieCardsList } from "./movie/movie-cards-list";

export const mainItemView = {
  async render() {
    const element = document.createElement("section");
    element.classList.add("item-view");

    const title = mainTitle.render();
    const items = await this.generateMovieList();
    const moreButton = mainMoreButton.render();

    element.appendChild(title);
    element.appendChild(items);
    element.appendChild(moreButton);

    return element;
  },

  async generateMovieList() {
    const movieList = new MovieList();
    await movieList.generateMovies({ page: 1 });

    const list = movieList.movies;

    return MovieCardsList.render(list);
  },
};
