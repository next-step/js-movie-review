import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import { generateMovieCard } from "./js/components/MovieCard.js";
import "../templates/logo.png";

const app = new App();

addEventListener("DOMContentLoaded", async () => {
  await app.init();

  const movieList = $(".item-list");

  const movieCards = app.movies.map((movie) => generateMovieCard(movie));
  movieList.append(...movieCards);
});
