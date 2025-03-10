import MovieModel from "./MovieModel";

class MovieListModel {
  #total_pages;
  #total_results;
  #page;
  #movieModels;

  constructor(response) {
    console.log(response);
    this.#page = response.page;
    this.#total_results = response.total_results;
    this.#total_pages = response.total_pages;
    this.#movieModels = [];
    response.results.forEach((result) => {
      this.#movieModels.push(new MovieModel(result));
    });
  }

  get total_results() {
    return this.#total_results;
  }

  get movieModels() {
    return this.#movieModels;
  }

  get page() {
    return this.#page;
  }

  isLastPage() {
    return this.#total_pages === this.#page;
  }
}

export default MovieListModel;
