import MovieModel from "./MovieModel.js";

const FIRST_INDEX = 0;
class MovieListModel {
  #totalPages;
  #totalResults;
  #page;
  #movieModels;

  constructor(response) {
    this.#page = response.page;
    this.#totalResults = response.total_results;
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

  get firstMovie() {
    return this.#movieModels[FIRST_INDEX];
  }

  isLastPage() {
    return this.#totalPages === this.#page;
  }
}

export default MovieListModel;
