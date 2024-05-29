import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";
import Skeleton from "./js/view/Skeleton.js";

const app = new App();

addEventListener("DOMContentLoaded", async () => {
  Skeleton.render();

  await app.init();

  // remove skeleton cards
  Skeleton.remove();

  MovieCardList.render(app.newMovies);
});

const showMoreButton = $(".show-more");

showMoreButton.addEventListener("click", async () => {
  Skeleton.render();

  await app.fetchNextPage();

  // remove skeleton cards
  Skeleton.remove();

  MovieCardList.render(app.newMovies);
});
