import MovieList from "./MovieList";

class App {
  currentPage = 1;

  async init(movieList: MovieList) {
    await movieList.fetchMovies(this.currentPage);
  }

  async fetchNextPage(movieList: MovieList) {
    this.currentPage++;
    await movieList.fetchMovies(this.currentPage);
  }
}

export default App;
