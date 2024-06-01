import Api from "../../src/js/domain/Api.js";
import MovieList from "../../src/js/domain/MovieList.js";

describe("영화 목록 기능 테스트", () => {
  it("영화 목록 API를 호출하고 영화 목록을 저장한다.", async () => {
    const currentPage = 1;
    const movieList = new MovieList();

    await movieList.fetchMovies(currentPage);

    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE);
  });
});
