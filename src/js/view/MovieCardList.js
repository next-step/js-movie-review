import { $ } from "../../utils/dom.js";
import MovieCard from "./MovieCard.js";

const MovieCardList = {
  elements: {
    movieCardList: $(".item-list"),
  },

  render(movies) {
    const movieCards = movies.map((movie) =>
      MovieCard.generateMovieCard(movie)
    );

    if (!this.elements.movieCardList) {
      return;
    }

    this.elements.movieCardList.append(...movieCards);
  },
};

export default MovieCardList;
