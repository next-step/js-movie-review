import Api from "./Api.js";
import MovieList from "./MovieList.js";

class App {
  currentPage = 0;
  #movieList;

  constructor() {
    this.#movieList = new MovieList();
  }

  get movieList() {
    return this.#movieList;
  }

  get newMovies() {
    return this.movieList.movies.slice(
      (this.currentPage - 1) * Api.NUM_MOVIES_PER_PAGE
    );
  }

  async init() {
    await this.fetchNextPage();
  }

  async fetchNextPage() {
    this.currentPage++;
    await this.movieList.fetchMovies(this.currentPage);
  }
}

export default App;
