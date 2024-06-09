import { Movie } from "./domain/Movie";
import { MovieView } from "./views/MovieView";
import { HeaderView } from "./views/HeaderView";
import "./css/reset.css";
import "./css/common.css";
import "./css/modal.css";

addEventListener("DOMContentLoaded", () => {
  const movie = new Movie();

  new HeaderView(movie);
  const movieView = new MovieView(movie);
  movieView.loadMore();
});
