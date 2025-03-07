/* eslint-disable no-undef */

describe("UI 컴포넌트를 테스트한다.", () => {
  beforeEach("TEST 별, GET 호출", () => {
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=ko-KR&page=1",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-1-page.json",
      },
    ).as("mockedGETPage1");
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=ko-KR&page=2",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-2-page.json",
      },
    ).as("mockedGETPage2");
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=ko-KR&page=3",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-3-page.json",
      },
    ).as("mockedGETPage3");

    cy.intercept(
      {
        method: "GET",
        url: "3/movie/top_rated?language=ko-KR&page=1",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-top-rated.json",
      },
    ).as("mockedGETTopRatedPage");

    cy.visit("http://localhost:5173");
  });

  it("Header 컴포넌트를 테스트한다", () => {
    cy.get("header").should("contains.text", "자세히 보기");
  });

  it("Main - Thumbnail list 컴포넌트를 테스트한다", () => {
    cy.get(".thumbnail-list").find("li").should("have.length", 20);
  });

  it("Main - 더보기 버튼 컴포넌트를 테스트한다", () => {
    cy.get(".add-more").click();
    cy.get(".thumbnail-list").find("li").should("have.length", 40);
  });

  it("Search - 검색 결과를 출력한다", () => {
    cy.get(".search").type("더{enter}");
    cy.get(".thumbnail-list").find("li").should("have.length", 2);
  });
});
