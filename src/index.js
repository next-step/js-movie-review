import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";

const app = new App();

addEventListener("DOMContentLoaded", async () => {
  await app.init();

  MovieCardList.render(app.movies);
});

const showMoreButton = $(".show-more");

showMoreButton.addEventListener("click", async () => {
  await app.fetchNextPage();

  MovieCardList.render(app.movies);
});
