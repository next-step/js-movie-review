import { $ } from "../../utils/dom.js";
import MovieCardList from "./MovieCardList.js";

const ShowMoreButton = {
  elements: {
    button: $(".show-more"),
  },

  async handleClick(app, movieList) {
    MovieCardList.addSkeleton();

    await app.fetchNextPage(movieList);

    MovieCardList.removeSkeleton();

    const newMovies = movieList.getMoviesByPage(app.currentPage);
    MovieCardList.render(newMovies);
  },

  show() {
    this.elements.button?.classList.remove("hidden");
  },

  hide() {
    this.elements.button?.classList.add("hidden");
  },
};

export default ShowMoreButton;
