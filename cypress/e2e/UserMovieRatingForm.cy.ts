import Api from "../../src/js/domain/Api";
import UserMovieRatingForm from "../../src/js/view/UserMovieRatingForm";

const selectors = {
  itemCard: ".item-card",
  modal: ".modal",
  modalCloseBtn: ".modal-close",
  movieTitle: ".movie-title",
  modalBody: ".modal-body",
  skeleton: ".skeleton",
  userRating: ".user-rating",
  ratingStar: ".rating-star",
};

describe("사용자 영화 평점 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", Api.generatePopularMoviesUrl(1), {
      fixture: "movieList.json",
    }).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");

    // 첫번째 영화 카드의 id 를 가져와서 영화 상세 정보를 요청하는 API 를 intercept 한다.
    cy.get(selectors.itemCard)
      .first()
      .invoke("attr", "data-id")
      .then((movieId) => {
        cy.intercept("GET", Api.generateMovieDetailUrl(Number(movieId)), {
          delay: 1000,
          fixture: "movieDetail.json",
        }).as("getMovieDetail");
        cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId)), {
          delay: 1000,
          fixture: "movieUserRatingNonExists.json",
        }).as("getUserRating");

        cy.get(selectors.itemCard).first().click();
      });
  });

  it("사용자 영화 평점을 fetch 하는 동안 스켈레톤이 보여야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.skeleton).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.get(selectors.skeleton).should("not.exist");
  });

  it("사용자의 마우스 호버 위치에 따라 별점이 변경되어야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");

    // hover over the first star
    cy.get(selectors.ratingStar).first().trigger("mouseover");
    cy.get(selectors.ratingStar)
      .first()
      .should("have.attr", "src")
      .should("include", UserMovieRatingForm.PATH_STAR_FILLED);

    // hover over the second star
    cy.get(selectors.ratingStar).eq(1).trigger("mouseover");
    cy.get(selectors.ratingStar)
      .eq(1)
      .should("have.attr", "src")
      .should("include", UserMovieRatingForm.PATH_STAR_FILLED);
  });
});
