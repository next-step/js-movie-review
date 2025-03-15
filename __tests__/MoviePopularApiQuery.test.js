import MoviePopularApiQuery from "../src/api/MoviePopularApiQuery.js";

describe("MoviePopularApiQuery Class 테스트", () => {
  it("MoviePopularApiQuery를 생성하고 api url을 검증한다.", () => {
    const movieApiQuery = new MoviePopularApiQuery({
      includeAdult: false,
      includeVideo: false,
      page: 1,
      sortBy: "popularity.desc",
    });

    expect(movieApiQuery.toQueryString).toEqual(
      "?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc"
    );
    expect(movieApiQuery.getApiUrl).toEqual(
      "https://api.themoviedb.org/3/discover/movie"
    );
  });
});
