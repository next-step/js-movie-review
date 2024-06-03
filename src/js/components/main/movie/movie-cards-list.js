import { movieCard } from "./movie-card";

export const movieCardsList = {
  render() {
    const element = document.createElement("ul");
    element.classList.add("item-list");

    return element;
  },

  loadMovieList(movies) {
    const itemList = document.querySelector(".item-list");

    movies.forEach((movie) => {
      const item = movieCard.generateMovieItem(movie);
      itemList.appendChild(item);
    });
  }
};
