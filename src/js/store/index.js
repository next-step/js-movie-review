import { requestAPI } from "../../api";

export const PAGE_ITEM = 20;
export const LAST_PAGE = 500;

const ERROR_MESSAGES = list =>
  Object.freeze({
    7: "API KEY를 제대로 입력해주세요.",
    422: `${list}, 500 페이지 이상은 데이터를 불러올 수 없습니다.`,
  });

class MovieStore {
  constructor() {
    this.movieGenre = "popular";
    this.movieGenreTitle = "지금 인기 있는 영화";
    this.movieList = [];

    this.currentPage = 0;
  }
  async fetchMovieData() {
    try {
      this.currentPage = this.currentPage + 1;

      const newMovieList = await requestAPI(
        `/${this.movieGenre}?page=${this.currentPage}`
      );

      this.movieList = [...newMovieList?.results];
    } catch (error) {
      const errorMessage = ERROR_MESSAGES(this.movieGenre)[error.message];

      throw new Error(errorMessage);
    }
  }
}

export { MovieStore };
