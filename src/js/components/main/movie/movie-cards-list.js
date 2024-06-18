import { movieCard } from "./movie-card";

export const movieCardsList = {
  render() {
    const element = document.createElement("ul");
    element.classList.add("item-list");

    return element;
  },

  loadMovieList(movies) {
    const itemList = document.querySelector(".item-list");

    const fragment = document.createDocumentFragment();

    movies.forEach((movie) => {
      const item = movieCard.generateMovieItem(movie);
      fragment.appendChild(item);
    });

    itemList.appendChild(fragment);
  },
};
