import MovieCardList from "./MovieCardList.js";
import { $ } from "../../utils/dom.js";

const SearchBox = {
  elements: {
    searchBox: $(".search-box"),
    searchInput: $(".search-input"),
    searchButton: $(".search-button"),
  },

  async handleInputSearchQuery(e, app) {
    const query = e.target.value;
    app.searchQuery = query;
  },

  async handleSubmitSearchQuery(app, movieList) {
    MovieCardList.clear();

    MovieCardList.addSkeleton();
    await app.searchMovies(movieList);
    MovieCardList.removeSkeleton();

    MovieCardList.render(movieList.movies);
  },
};

export default SearchBox;
