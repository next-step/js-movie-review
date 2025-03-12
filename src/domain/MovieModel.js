class MovieModel {
  static IMAGE_URL = "https://image.tmdb.org/t/p/w440_and_h660_face";

  #id;
  #posterPath;
  #title;
  #voteAverage;

  constructor(result) {
    this.#id = result.id;
    this.#posterPath = MovieModel.IMAGE_URL + result.poster_path;
    this.#title = result.title;
    this.#voteAverage = this.#formatToTwoDecimals(result.vote_average);
  }

  get id() {
    return this.#id;
  }

  get posterPath() {
    return this.#posterPath;
  }

  get title() {
    return this.#title;
  }

  get voteAverage() {
    return this.#voteAverage;
  }

  #formatToTwoDecimals(voteAverage) {
    return Number(voteAverage).toFixed(1);
  }
}

export default MovieModel;
