import { Movie } from "./domain/Movie";
import { MovieView } from "./views/MovieView";
import "./css/reset.css";
import "./css/common.css";

addEventListener("DOMContentLoaded", () => {
  const movie = new Movie();
  new MovieView(movie);
});
