import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";
const main = () => {
  const app = new App();

  addEventListener("DOMContentLoaded", async () => {
    MovieCardList.addSkeleton();

    await app.init();

    MovieCardList.removeSkeleton();
    MovieCardList.render(app.movieList.movies);
  });

  const showMoreButton = $(".show-more");

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener("click", async () => {
    MovieCardList.addSkeleton();

    await app.fetchNextPage();

    MovieCardList.removeSkeleton();
    MovieCardList.render(app.newMovies);
  });
};

main();
