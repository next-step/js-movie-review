import Movie from "./domain/movie.js";
import layout from "./view/layout.js";
import MovieList from "./view/movieList/index.js";
import Skeleton from "./view/skeleton/index.js";

addEventListener("DOMContentLoaded", async () => {
  layout();
  const movie = new Movie();
  const movieList = new MovieList();
  const skeleton = new Skeleton();

  skeleton.renderSkeletons();
  await movie.init();
  skeleton.remove();

  movieList.renderMovies(movie.list);
});
