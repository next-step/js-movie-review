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

    const genres = [
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
    ];

    cy.intercept(Api.generateMovieDetailUrl(movieId), (req) => {
      req.continue((res) => {
        res.send({
          genres,
        });
      });
    }).as("getMovieDetail");

    await movie.fetchMovieDetail();

    expect(movie.genres).to.deep.equals(genres.map((genre) => genre.name));
  });

  it("사용자가 평가한 평점을 가져오는 API를 호출하고 만약 이미 평가한 이력이 있다면 userRating 에 저장한다.", async () => {
    const movieId = 653346;
    const movie = new MovieModel({
      id: movieId,
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
      overview: "",
    });
    const userRating = 3;

    cy.intercept(Api.generateMovieUserRatingUrl(movieId), (req) => {
      req.continue((res) => {
        res.send({
          id: movieId,
          rated: {
            value: userRating,
          },
        });
      });
    });

    await movie.fetchMovieUserRating();

    expect(movie.userRating).to.equal(userRating);
  });

  it("사용자가 평가한 평점을 가져오는 API를 호출하고 만약 평가한 이력이 없다면 userRating 는 null 이다.", async () => {
    const movieId = 653346;
    const movie = new MovieModel({
      id: movieId,
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
      overview: "",
    });

    cy.intercept(Api.generateMovieUserRatingUrl(movieId), (req) => {
      req.continue((res) => {
        res.send({
          id: movieId,
          rated: false,
        });
      });
    });

    await movie.fetchMovieUserRating();

    expect(movie.userRating).to.be.null;
  });

  it("사용자가 영화를 평가하는 API를 호출하고 userRating 에 저장한다.", async () => {
    const movieId = 653346;
    const movie = new MovieModel({
      id: movieId,
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
      overview: "",
    });
    const userRating = 4.5;

    cy.intercept(Api.generatePostMovieUserRatingUrl(movieId), {
      statusCode: 201,
      body: {
        message: "Success",
      },
    }).as("postMovieUserRating");

    await movie.postMovieUserRating(userRating);

    expect(movie.userRating).to.equal(userRating);
  });
});
