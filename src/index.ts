import "../templates/logo.png";
import "../templates/star_filled.png";
import "../templates/star_empty.png";
import App from "./js/domain/App";
import MovieCardList from "./js/view/MovieCardList";
import MovieListModel from "./js/domain/MovieListModel";
import SearchBox from "./js/view/SearchBox";
import ShowMoreButton from "./js/view/ShowMoreButton";

const main = () => {
  const app = new App();
  const movieList = new MovieListModel();

  addEventListener("DOMContentLoaded", async () => {
    MovieCardList.addSkeleton();

    await app.init(movieList);

    MovieCardList.removeSkeleton();
    MovieCardList.render(movieList.movies);
  });

  ShowMoreButton.elements.button?.addEventListener("click", async () => {
    await ShowMoreButton.handleClick(app, movieList);
  });

  SearchBox.elements.searchInput?.addEventListener("input", (e: InputEvent) => {
    SearchBox.handleInputSearchQuery(e, app);
  });
  SearchBox.elements.searchButton?.addEventListener("click", () => {
    SearchBox.handleSubmitSearchQuery(app, movieList);
  });
  SearchBox.elements.searchInput?.addEventListener(
    "keypress",
    async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await SearchBox.handleSubmitSearchQuery(app, movieList);
      }
    }
  );
};

main();
