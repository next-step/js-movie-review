class MovieModel {
  static IMAGE_URL = "https://image.tmdb.org/t/p/w440_and_h660_face";

  #id;
  #poster_path;
  #title;
  #vote_average;

  constructor(result) {
    this.#id = result.id;
    this.#poster_path = MovieModel.IMAGE_URL + result.poster_path;
    this.#title = result.title;
    this.#vote_average = this.#cal_vote_average(result.vote_average);
  }

  get id() {
    return this.#id;
  }

  get poster_path() {
    return this.#poster_path;
  }

  get title() {
    return this.#title;
  }

  get vote_average() {
    return this.#vote_average;
  }

  #cal_vote_average(vote_average) {
    return Number(vote_average).toFixed(1);
  }
}

export default MovieModel;
