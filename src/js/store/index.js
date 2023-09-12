import { requestAPI } from "../../api";
import { POPULAR } from "../../../utils/constants";

class MovieStore {
  constructor() {
    this.movieListTitle = "지금 인기 있는 영화";
    this.movieList = [];

    this.currentPage = 0;
  }

  async fetchPopularMovieData(showSkeleton) {
    try {
      const newPageNumber = this.currentPage + 1;
      this.currentPage = newPageNumber;

      const newMovieList = await requestAPI(
        `/${POPULAR}?page=${this.currentPage}`
      );

      this.movieList = [...newMovieList?.results];
    } catch (error) {
      showSkeleton(true);
      console.error("error::", error);
    }
  }
}

export { MovieStore };
