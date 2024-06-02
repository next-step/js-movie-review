import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App.js";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList.js";
import MovieList from "./js/domain/MovieList.js";
const main = () => {
  const app = new App();
  const movieList = new MovieList();

  addEventListener("DOMContentLoaded", async () => {
    MovieCardList.addSkeleton();

    await app.init(movieList);

    MovieCardList.removeSkeleton();
    MovieCardList.render(movieList.movies);
  });

  const showMoreButton = $(".show-more");

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener("click", async () => {
    MovieCardList.addSkeleton();

    await app.fetchNextPage(movieList);

    MovieCardList.removeSkeleton();

    const newMovies = movieList.getMoviesByPage(app.currentPage);
    MovieCardList.render(newMovies);
  });
};

main();
