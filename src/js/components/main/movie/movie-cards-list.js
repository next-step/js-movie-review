import { movieCard } from "./movie-card";

export const MovieCardsList = {
  render(movies) {
    const element = document.createElement("ul");
    element.classList.add("item-list");

    movies.forEach((movie) => {
      const item = movieCard.generateMovieItem(movie);
      element.appendChild(item);
    });

    return element;
  },
};
