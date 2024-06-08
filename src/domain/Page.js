import MovieAPI from "../api/movieAPI.js";
import Movie from "./Movie.js";

class Page {
  #currentPage = 1; //상수화
  #movieList = [];
  #api;

  constructor() {
    this.#api = new MovieAPI();
  }

  async load() {
    const { results } = await this.#api.getMovies(this.#currentPage);
    const resultList = results.map((movie) => {
      const { title, poster_path, vote_average } = movie;
      return new Movie({
        title: title,
        image: poster_path,
        rating: vote_average,
      });
    });
    this.#movieList = [...this.#movieList, ...resultList];
    this.#currentPage += 1;

    return resultList;
  }

  get movieList() {
    return [...this.#movieList];
  }
}

export default Page;
