import MovieSearchApiQuery from "../src/api/MovieSearchApiQuery.js";

describe("MoviePopularApiQuery Class 테스트", () => {
  it("MoviePopularApiQuery를 생성하고 api url을 검증한다.", () => {
    const movieApiQuery = new MovieSearchApiQuery({
      includeAdult: false,
      keyword: "소닉",
      page: 1,
    });

    expect(movieApiQuery.toQueryString).toEqual(
      "?query=소닉&includeAdult=false&page=1&language=ko-KR"
    );
    expect(movieApiQuery.getApiUrl).toEqual(
      "https://api.themoviedb.org/3/search/movie"
    );
  });
});
