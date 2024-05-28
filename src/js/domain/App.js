import MovieList from "./MovieList.js";

class App {
  #currentPage = 0;
  #movieList;

  constructor() {
    this.#movieList = new MovieList();
  }

  async init() {
    await this.fetchNextPage();
  }

  get movies() {
    return this.#movieList.movies;
  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(page) {
    this.#currentPage = page;
  }

  async fetchNextPage() {
    this.#currentPage++;
    await this.#movieList.fetchMovies(this.#currentPage);
  }
}

export default App;
