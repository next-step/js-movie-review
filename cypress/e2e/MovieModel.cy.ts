import Api from "../../src/js/domain/Api";
import MovieModel from "../../src/js/domain/MovieModel";

describe("영화 기능 테스트", () => {
  it("영화는 id, 썸네일, 제목, 평점, overview 로 이루어져있다.", () => {
    const movie = new MovieModel({
      id: 1,
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
      overview: "",
    });

    expect(movie.id).to.equal(1);
    expect(movie.title).to.equal("테스트");
    expect(movie.rating).to.equal(5);
    expect(movie.thumbnail).to.equal("test.jpg");
    expect(movie.overview).to.equal("");
  });

  it("영화 상세 정보 API를 호출하고 영화 상세 정보 중 genre 를 movie 에 추가한다.", async () => {
    const movieId = 653346;
    const movie = new MovieModel({
      id: movieId,
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
      overview: "",
    });

    cy.intercept(Api.generateMovieDetailUrl(movieId), (req) => {
      req.continue((res) => {
        res.send({
          results: {
            genres: [
              { id: 1, name: "Action" },
              { id: 2, name: "Adventure" },
            ],
          },
        });
      });
    }).as("getMovieDetail");

    await movie.fetchMovieDetail();

    expect(movie.genres).to.deep.include({ id: 1, name: "Action" });
    expect(movie.genres).to.deep.include({ id: 2, name: "Adventure" });
  });
});
