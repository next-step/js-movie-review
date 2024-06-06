import MovieListModel from "./MovieListModel";

class App {
  currentPage = 1;
  searchQuery = "";

  async init(movieList: MovieListModel) {
    await this.fetchMovieList(movieList);
  }

  async fetchMovieList(movieList: MovieListModel) {
    if (this.searchQuery) {
      await movieList.searchMovies(this.searchQuery, this.currentPage);
      return;
    }

    await movieList.fetchMovies(this.currentPage);
  }

  async fetchNextPage(movieList: MovieListModel) {
    this.currentPage++;

    await this.fetchMovieList(movieList);
  }

  async searchMovies(movieList: MovieListModel) {
    this.currentPage = 1;
    movieList.clearMovies();

    await this.fetchMovieList(movieList);
  }
}

export default App;
