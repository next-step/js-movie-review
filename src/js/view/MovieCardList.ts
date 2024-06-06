import { $, removeElements } from "../../utils/dom";
import Api from "../domain/Api";
import MovieCard from "./MovieCard";
import ShowMoreButton from "./ShowMoreButton";
import Skeleton from "./Skeleton";
import MovieModel from "../domain/MovieModel";

const MovieCardList = {
  elements: {
    movieCardList: $(".item-list"),
  },

  render(movies: MovieModel[]) {
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
    MovieCardList.elements.movieCardList.innerHTML = "";
  },

  addSkeleton() {
    MovieCardList.elements.movieCardList.append(...Skeleton.skeletonCards);
  },

  removeSkeleton() {
    removeElements(
      MovieCardList.elements.movieCardList,
      Skeleton.selectors.SKELETON_CARD
    );
  },
};

export default MovieCardList;
