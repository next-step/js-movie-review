class MovieApiQuery {
  #includeAdult;
  #includeVideo;
  #page;
  #sortBy;

  constructor(includeAdult, includeVideo, page, sortBy) {
    this.#includeAdult = includeAdult;
    this.#includeVideo = includeVideo;
    this.#page = page;
    this.#sortBy = sortBy;
  }

  toQueryString() {
    return `include_adult=${this.#includeAdult}&include_video=${
      this.#includeVideo
    }&page=${this.#page}&sort_by=${this.#sortBy}`;
  }

  nextPage() {
    this.#page += 1;
  }
}

export default MovieApiQuery;
