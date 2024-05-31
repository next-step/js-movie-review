import { MovieCard } from "./MovieCard";

export const MovieCardsList = {
  render(movies) {
    const itemList = document.querySelector(".item-list");
    movies.forEach((movie) => {
      const movieCard = MovieCard.generateMovieItem(movie);
      itemList.appendChild(movieCard);
    });
  },
};
