import Api from "../../src/js/domain/Api";
import Movie from "../../src/js/domain/Movie";

const selectors = {
  searchInput: ".search-input",
  searchButton: ".search-button",
  skeletonCard: ".skeleton-card",
  itemCard: ".item-card",
};

describe("검색창 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("검색어를 입력하면 input 의 value 값이 바뀐다.", () => {
    const query = "Harry Potter";
    cy.get(selectors.searchInput).type(query).should("have.value", query);
  });

  it("검색할 query 를 입력 후 검색 버튼을 클릭하면 스켈레톤이 보이고 검색결과가 나타난다.", () => {
    const query = "Harry Potter";
    cy.intercept(Api.generateSearchMoviesUrl(query, 1), (req) => {
      req.continue((res) => {
        res.setDelay(1000);
      });
    }).as("searchMovies");

    cy.get(selectors.searchInput).type(query);
    cy.get(selectors.searchButton).click();

    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@searchMovies");
    cy.get(selectors.skeletonCard).should("not.exist");
    cy.get(selectors.itemCard).should(
      "have.length.within",
      0,
      Api.NUM_MOVIES_PER_PAGE
    );
  });

  it("검색할 query 를 입력 후 엔터키를 누르면 스켈레톤이 보이고 검색결과가 나타난다.", () => {
    const query = "Harry Potter";
    cy.intercept(Api.generateSearchMoviesUrl(query, 1), (req) => {
      req.continue((res) => {
        res.setDelay(1000);
      });
    }).as("searchMovies");

    cy.get(selectors.searchInput).type(query).type("{enter}");

    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@searchMovies");
    cy.get(selectors.skeletonCard).should("not.exist");
    cy.get(selectors.itemCard).should(
      "have.length.within",
      0,
      Api.NUM_MOVIES_PER_PAGE
    );
  });

  it("empty string 을 입력 후 검색하면 검색 결과가 초기화되고 인기 영화 목록이 보인다.", () => {
    const query = "Harry Potter";
    cy.intercept(Api.generateSearchMoviesUrl(query, 1), (req) => {
      req.continue((res) => {
        res.setDelay(1000);
      });
    }).as("searchMovies");
    cy.intercept(Api.generatePopularMoviesUrl(1), (req) => {
      req.continue((res) => {
        // delay the response for 1 second
        res.setDelay(1000);
      });
    }).as("getPopularMovies");

    cy.get(selectors.searchInput).type(query);
    cy.get(selectors.searchButton).click();
    cy.wait("@searchMovies");

    // empty string 입력 및 검색
    cy.get(selectors.searchInput).clear();
    cy.get(selectors.searchButton).click();
    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@getPopularMovies");
    cy.get(selectors.skeletonCard).should("not.exist");

    // 인기 영화 목록이 보여야 한다.
    cy.get(selectors.itemCard).should("have.length", Api.NUM_MOVIES_PER_PAGE);
  });
});
