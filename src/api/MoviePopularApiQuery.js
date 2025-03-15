import { getMoviePopularApiUrl } from "./MovieApiInfomation.js";
import MovieApiQuery from "./MovieApiQuery.js";

class MoviePopularApiQuery extends MovieApiQuery {
  #includeVideo;
  #sortBy;

  constructor(request) {
    super(request);
    this.#includeVideo = request.includeVideo;
    this.#sortBy = request.sortBy;
  }

  getApiUrl() {
    return getMoviePopularApiUrl;
  }

  toQueryString() {
    return `include_adult=${this.includeAdult}&include_video=${
      this.#includeVideo
    }&language=ko-KR&page=${this.page}&sort_by=${this.#sortBy}`;
  }
}

export default MoviePopularApiQuery;
