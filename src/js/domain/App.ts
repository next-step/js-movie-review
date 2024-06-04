import MovieList from "./MovieList";

class App {
  currentPage = 1;
  searchQuery = "";

  async init(movieList: MovieList) {
    await this.fetchMovieList(movieList);
  }

  async fetchMovieList(movieList: MovieList) {
    if (this.searchQuery) {
      await movieList.searchMovies(this.searchQuery, this.currentPage);
      return;
    }

    await movieList.fetchMovies(this.currentPage);
  }

  async fetchNextPage(movieList: MovieList) {
    this.currentPage++;

    await this.fetchMovieList(movieList);
  }

  async searchMovies(movieList: MovieList) {
    this.currentPage = 1;
    movieList.clearMovies();

    this.fetchMovieList(movieList);
  }
}

export default App;
