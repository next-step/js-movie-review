/*
1. API 자체를 호출하는 테스트
2. fixture를 사용하는 테스트
*/

const API_TOKEN = Cypress.env("VITE_API_TOKEN");

describe("API 비동기 호출 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    expect(API_TOKEN).to.exist;
  });

  // it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
  //   const url =
  //     "https://api.themoviedb.org/3/movie/popular?language=ko-KO&page=1";

  //   cy.request({
  //     method: "GET",
  //     url: url,
  //     headers: {
  //       accept: "application/json",
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //     failOnStatusCode: false,
  //   }).as("popularMovies");

  //   cy.get("@popularMovies").then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body.results).to.have.length(20);
  //   });
  // });
});

describe("fixture 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173");

    expect(API_TOKEN).to.exist;
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies).to.have.length(20);

      const popularMovieItems = cy.get(".item-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });
});
