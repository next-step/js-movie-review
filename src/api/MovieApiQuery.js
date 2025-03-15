class MovieApiQuery {
  #includeAdult;
  #includeVideo;
  #page;
  #sortBy;

  constructor(request) {
    this.#includeAdult = request.includeAdult;
    this.#includeVideo = request.includeVideo;
    this.#page = request.page;
    this.#sortBy = request.sortBy;
  }

  toQueryString() {
    return `include_adult=${this.#includeAdult}&include_video=${
      this.#includeVideo
    }&language=ko-KR&page=${this.#page}&sort_by=${this.#sortBy}`;
  }

  nextPage() {
    this.#page += 1;
  }
}

export default MovieApiQuery;
