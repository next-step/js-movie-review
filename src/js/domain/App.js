import MovieList from "./MovieList.js";

class App {
  #currentPage = 0;
  #movieList;

  constructor() {
    this.#movieList = new MovieList();
  }

  get movieList() {
    return this.#movieList;
  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(page) {
    this.#currentPage = page;
  }

  async init() {
    await this.fetchNextPage();
  }

  async fetchNextPage() {
    this.#currentPage++;
    await this.movieList.fetchMovies(this.#currentPage);
  }
}

export default App;
