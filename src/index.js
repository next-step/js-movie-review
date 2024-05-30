import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";
import Skeleton from "./js/view/Skeleton.js";
import Api from "./js/domain/Api.js";

const app = new App();

addEventListener("DOMContentLoaded", async () => {
  Skeleton.render();
  await app.init();
  Skeleton.remove();

  const movies = app.movieList.movies;

  MovieCardList.render(movies);
});

const showMoreButton = $(".show-more");

showMoreButton.addEventListener("click", async () => {
  Skeleton.render();
  await app.fetchNextPage();
  Skeleton.remove();

  // render new movies
  const newMovies = app.movieList.movies.slice(
    (app.currentPage - 1) * Api.NUM_MOVIES_PER_PAGE
  );

  MovieCardList.render(newMovies);
});
