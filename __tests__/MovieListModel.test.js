import MovieListModel from "../src/domain/MovieListModel.js";
import MovieModel from "../src/domain/MovieModel.js";

describe("MovieListModel Class 테스트", () => {
  it("영화정보를 초기세팅 한다.", () => {
    const response = {
      total_pages: 1000,
      total_results: 20000,
      page: 1,
      results: [
        {
          id: 1,
          poster_path: "/test.png",
          title: "테스트",
          vote_average: 4.234,
        },
      ],
    };
    const movieListModel = new MovieListModel(response);

    expect(movieListModel.movieModels).toEqual([
      new MovieModel({
        id: 1,
        poster_path: "/test.png",
        title: "테스트",
        vote_average: "4.234",
      }),
    ]);
    expect(movieListModel.page).toEqual(1);
    expect(movieListModel.isLastPage()).toEqual(false);
    expect(movieListModel.totalResults).toEqual(20000);
  });
});
