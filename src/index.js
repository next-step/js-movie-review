import "./css/common.css";
import "./css/reset.css";
import { MovieList } from "./js/domain/MovieList";
import { MovieCardsList } from "./js/view/MovieCardsList";

addEventListener("DOMContentLoaded", async () => {
  const movieList = new MovieList();
  await movieList.generateMovies({ page: 1 });
  MovieCardsList.render(movieList.movies);
});
