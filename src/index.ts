import "../templates/logo.png";
import "../templates/star_filled.png";
import App from "./js/domain/App";
import { $ } from "./utils/dom.js";
import MovieCardList from "./js/view/MovieCardList";
import MovieList from "./js/domain/MovieList";
import SearchBox from "./js/view/SearchBox";

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

  SearchBox.elements.searchInput.addEventListener("input", (e: InputEvent) => {
    SearchBox.handleInputSearchQuery(e, app);
  });
  SearchBox.elements.searchButton.addEventListener("click", () => {
    SearchBox.handleSubmitSearchQuery(app, movieList);
  });
  SearchBox.elements.searchInput.addEventListener(
    "keydown",
    async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        await SearchBox.handleSubmitSearchQuery(app, movieList);
      }
    }
  );
};

main();
