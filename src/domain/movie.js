import Api from "../apis";

class Movie {
  #list;
  #totalPages;

  constructor() {
    this.page = 1;
    this.#list = [];
    this.#totalPages = 0;
  }

  async init() {
    const { results, total_pages } = await new Api().getMovies(this.page);
    console.log(results);
    console.log(total_pages);
    this.#list = results;
    this.#totalPages = total_pages;
  }

  async loadMore() {
    if (this.page >= this.#totalPages) return;
    this.page += 1;
    const newMovies = await new Api().getMovies(this.page);
    this.#list = this.movies.concat(newMovies);
  }

  get list() {
    return this.#list;
  }
}

export default Movie;
