import Api from "../../src/js/domain/Api";

const selectors = {
  itemCard: ".item-card",
  modal: ".modal",
  modalCloseBtn: ".modal-close",
  movieTitle: ".movie-title",
  modalBody: ".modal-body",
  skeleton: ".skeleton",
};

describe("사용자 영화 평점 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", Api.generatePopularMoviesUrl(1)).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");

    // 첫번째 영화 카드의 id 를 가져와서 영화 상세 정보를 요청하는 API 를 intercept 한다.
    cy.get(selectors.itemCard)
      .first()
      .invoke("attr", "data-id")
      .then((movieId) => {
        cy.intercept("GET", Api.generateMovieDetailUrl(Number(movieId)), {
          delay: 1000,
        }).as("getMovieDetail");
        cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId))).as(
          "getUserRating"
        );

        cy.get(selectors.itemCard).first().click();
      });
  });

  it("사용자 영화 평점을 fetch 하는 동안 스켈레톤이 보여야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.skeleton).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.get(selectors.skeleton).should("not.exist");
  });
});
