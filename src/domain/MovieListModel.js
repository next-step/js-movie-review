import MovieModel from "./MovieModel.js";

class MovieListModel {
  #totalPages;
  #totalResults;
  #page;
  #movieModels;

  constructor(response) {
    this.#page = response.page;
    this.#totalPages = response.total_results;
    this.#totalPages = response.total_pages;
    this.#movieModels = [];
    this.#movieModels = response.results.map(
      (result) => new MovieModel(result)
    );
  }

  get totalResults() {
    return this.#totalResults;
  }

  get movieModels() {
    return this.#movieModels;
  }

  get page() {
    return this.#page;
  }

  isLastPage() {
    return this.#totalResults === this.#page;
  }
}

export default MovieListModel;
