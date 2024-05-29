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

  get newMovies() {
    return this.movies.slice(
      (this.#currentPage - 1) * MovieList.MOVIES_PER_PAGE
    );
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
