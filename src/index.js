import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $, removeElements } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";
import Skeleton from "./js/view/Skeleton.js";

const main = () => {
  const app = new App();

  addEventListener("DOMContentLoaded", async () => {
    Skeleton.render();
    await app.init();

    const movies = app.movieList.movies;

    removeElements(MovieCardList.elements.movieCardList, [
      Skeleton.selectors.SKELETON_CARD,
    ]);

    MovieCardList.render(movies);
  });

  const showMoreButton = $(".show-more");

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener("click", async () => {
    Skeleton.render();

    await app.fetchNextPage();

    removeElements(MovieCardList.elements.movieCardList, [
      Skeleton.selectors.SKELETON_CARD,
    ]);

    MovieCardList.render(app.newMovies);
  });
};

main();
