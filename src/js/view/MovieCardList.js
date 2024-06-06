import { $, removeElements } from "../../utils/dom.js";
import Api from "../domain/Api.ts";
import MovieCard from "./MovieCard.js";
import ShowMoreButton from "./ShowMoreButton.js";
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

    if (movies.length < Api.NUM_MOVIES_PER_PAGE) {
      ShowMoreButton.hide();
    } else {
      ShowMoreButton.show();
    }
  },

  clear() {
    this.elements.movieCardList.innerHTML = "";
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
