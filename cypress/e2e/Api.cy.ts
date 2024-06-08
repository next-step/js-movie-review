import ErrorMessage from "../../src/js/ErrorMessage";
import Api from "../../src/js/domain/Api";

describe("Api 기능 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야 한다.", () => {
    const currentPage = 1;
    const url = Api.generatePopularMoviesUrl(currentPage);

    cy.request(url).as("movies");

    cy.get("@movies").its("status").should("eq", 200);
    cy.get("@movies")
      .its("body.results")
      .should("have.length", Api.NUM_MOVIES_PER_PAGE);
  });

  it("영화 목록 API 호출에 실패하면 에러를 발생시킨다.", () => {
    const WRONG_URL = "https://api.themoviedb.org/3/movie/popular/wrong";

    cy.intercept(WRONG_URL, {
      statusCode: 404,
      body: { status_message: "Invalid page." },
    }).as("movies");

    expect(() => {
      cy.request(WRONG_URL).should("throw", ErrorMessage.NOT_VALID_URL);
    });
  });

  it("인증되지 않은 API 키로 영화 목록 API를 호출하면 에러를 발생시킨다.", () => {
    const WRONG_API = "https://api.themoviedb.org/3/movie/popular";

    cy.intercept(WRONG_API, {
      statusCode: 401,
      body: {
        status_message: "Invalid API key: You must be granted a valid key.",
      },
    }).as("movies");

    expect(() => {
      cy.request(WRONG_API).should("throw", ErrorMessage.NOT_VALID_API_KEY);
    });
  });

  it("영화 검색 API를 호출하면 검색 결과를 반환한다.", () => {
    const query = "Harry Potter";
    const currentPage = 1;
    const url = Api.generateSearchMoviesUrl(query, currentPage);

    cy.request(url).as("movies");

    cy.get("@movies").its("status").should("eq", 200);
    cy.get("@movies").its("body.results").should("not.be.empty");
  });

  it("영화 검색 API 호출에 실패하면 에러를 발생시킨다.", () => {
    const query = "Harry Potter";
    const currentPage = 1;
    const url = Api.generateSearchMoviesUrl(query, currentPage);

    cy.intercept(url, {
      statusCode: 404,
      body: { status_message: "Invalid page." },
    }).as("movies");

    expect(() => {
      cy.request(url).should("throw", ErrorMessage.NOT_VALID_URL);
    });
  });

  it("인증되지 않은 API 키로 영화 검색 API를 호출하면 에러를 발생시킨다.", () => {
    const WRONG_API = "https://api.themoviedb.org/3/search/movie";

    cy.intercept(WRONG_API, {
      statusCode: 401,
      body: {
        status_message: "Invalid API key: You must be granted a valid key.",
      },
    }).as("movies");

    expect(() => {
      cy.request(WRONG_API).should("throw", ErrorMessage.NOT_VALID_API_KEY);
    });
  });

  it("영화 상세 정보 API를 호출하면 상세 정보를 반환한다.", () => {
    const movieId = 929590;
    const url = Api.generateMovieDetailUrl(movieId);

    cy.request(url).as("movie");

    cy.get("@movie").its("status").should("eq", 200);
    cy.get("@movie").its("body").should("not.be.empty");
  });
});
