class MovieApiQuery {
  #apiUrl;
  #includeAdult;
  #page;

  constructor(request) {
    console.log(request);
    this.#apiUrl = this.getApiUrl();
    this.#includeAdult = request.includeAdult;
    this.#page = request.page;
  }

  get apiUrl() {
    return this.#apiUrl;
  }

  get page() {
    return this.#page;
  }

  get includeAdult() {
    return this.#includeAdult;
  }

  updatePage(page) {
    this.#page = page;
  }

  toQueryString() {
    throw new Error(
      "toQueryString() 메소드는 자식 클래스에서 구현되어야 합니다."
    );
  }

  getApiUrl() {
    throw new Error("getApiUrl() 메소드는 자식 클래스에서 구현되어야 합니다.");
  }
}

export default MovieApiQuery;
