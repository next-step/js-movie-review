import MovieCardList from "./MovieCardList.js";

const SearchBox = {
  elements: {
    searchBox: document.querySelector(".search-box"),
    searchInput: document.querySelector(".search-input"),
    searchButton: document.querySelector(".search-button"),
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
