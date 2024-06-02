import { $, removeElements } from "../../utils/dom.js";
import MovieCard from "./MovieCard.js";
import Skeleton from "./Skeleton.js";

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

  addSkeleton() {
    this.elements.movieCardList.append(...Skeleton.skeletonCards);
  },

  removeSkeleton() {
    removeElements(this.elements.movieCardList, [
      Skeleton.selectors.SKELETON_CARD,
    ]);
  },
};

export default MovieCardList;
