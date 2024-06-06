import Api from "../apis";

class Movie {
  #list;

  constructor() {
    this.page = 1;
    this.#list = [];
    this.api = new Api();
  }

  async load() {
    const { results, total_pages } = await this.api.getMovies(this.page);
    if (this.page >= total_pages) return;
    this.#list = results;
    this.page += 1;
  }

  get list() {
    return this.#list;
  }
}

export default Movie;
