import { getMovieSearchKeyowrdApiUrl } from "./MovieApiInfomation.js";
import MovieApiQuery from "./MovieApiQuery.js";

class MovieSearchApiQuery extends MovieApiQuery {
  #keyword;

  constructor(request) {
    super(request);
    this.#keyword = request.keyword;
  }

  getApiUrl() {
    return getMovieSearchKeyowrdApiUrl;
  }

  toQueryString() {
    return `query=${this.#keyword}&includeAdult=${this.includeAdult}&page=${
      this.page
    }&language=ko-KR`;
  }
}

export default MovieSearchApiQuery;
