import Movie from "./domain/movie.js";
import { $ } from "./utils/querySelector.js";
import layout from "./view/layout.js";
import MovieCard from "./view/movieCard/index.js";

addEventListener("DOMContentLoaded", async () => {
  const movie = new Movie();

  layout();
  await movie.init();
  console.log(movie.list);

  movie.list.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieCard = new MovieCard(poster_path, title, vote_average).element;
    $("ul").appendChild(movieCard);
  });
});
