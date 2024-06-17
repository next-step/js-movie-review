import ErrorMessage from "../../src/js/ErrorMessage";
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
  ratingScore: ".rating-score",
};

describe("사용자 영화 평점 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", Api.generatePopularMoviesUrl(1), {
      fixture: "movieList.json",
    }).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");

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
          fixture: "movieUserRatingExists.json",
        }).as("getUserRating");
        cy.intercept(
          "POST",
          Api.generatePostMovieUserRatingUrl(Number(movieId)),
          (req) => {
            req.reply((res) => {
              // 요청한 body 가 올바른지 확인
              expect(req.body).to.have.property("value", 2);
              res.send({
                statusCode: 200,
                body: {},
              });
            });
          }
        ).as("postUserRating");

        cy.get(selectors.itemCard).first().click();
      });
  });

  it("사용자 영화 평점을 fetch 하는 동안 스켈레톤이 보여야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.skeleton).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");
    cy.get(selectors.skeleton).should("not.exist");
  });

  it("사용자의 마우스 호버 위치에 따라 별점이 변경되어야 한다.", () => {
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

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

    // hover over the third star
    cy.get(selectors.ratingStar).eq(2).trigger("mouseover");
    cy.get(selectors.ratingStar)
      .eq(2)
      .should("have.attr", "src")
      .should("include", UserMovieRatingForm.PATH_STAR_FILLED);
  });

  it("사용자의 마우스 호버 위치에 따라 rating-score 가 변경되어야 한다.", () => {
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.modal).should("be.visible");

    // hover over the first star
    cy.get(selectors.ratingStar).first().trigger("mouseover");
    cy.get(selectors.ratingScore).should("have.text", "2");

    // hover over the second star
    cy.get(selectors.ratingStar).eq(1).trigger("mouseover");
    cy.get(selectors.ratingScore).should("have.text", "4");

    // hover over the third star
    cy.get(selectors.ratingStar).eq(2).trigger("mouseover");
    cy.get(selectors.ratingScore).should("have.text", "6");
  });

  it("사용자가 별점을 클릭하면 올바른 post 요청이 발생해야 한다.", () => {
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.modal).should("be.visible");

    // 2점 클릭
    cy.get(selectors.ratingStar).first().click();

    cy.wait("@postUserRating").its("request").should("exist");
  });

  it("사용자가 별점을 클릭하면 별들의 색깔이 올바르게 변경되어야 한다.", () => {
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.modal).should("be.visible");

    // 2점 클릭
    cy.get(selectors.ratingStar).first().click();
    cy.get(selectors.ratingStar)
      .first()
      .should("have.attr", "src")
      .should("include", UserMovieRatingForm.PATH_STAR_FILLED);
  });

  it("사용자가 별점을 클릭하면 rating-score 가 변경되어야 한다.", () => {
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.modal).should("be.visible");

    // 2점 클릭
    cy.get(selectors.ratingStar).first().click();
    cy.get(selectors.ratingScore).should("have.text", "2");
  });

  it("사용자 별점을 post 하는 요청이 실패하면, 에러 메시지를 보여준다.", () => {
    cy.get(selectors.itemCard)
      .first()
      .invoke("attr", "data-id")
      .then((movieId) => {
        cy.intercept(
          "POST",
          Api.generatePostMovieUserRatingUrl(Number(movieId)),
          (req) => {
            req.reply((res) => {
              res.send({
                statusCode: 500,
                body: {},
              });
            });
          }
        ).as("postUserRating");

        cy.wait("@getMovieDetail");
        cy.wait("@getUserRating");

        cy.get(selectors.modal).should("be.visible");

        // 2점 클릭
        cy.get(selectors.ratingStar).eq(3).click();

        cy.wait("@postUserRating");

        cy.on("window:alert", (str) => {
          expect(str).to.equal(ErrorMessage.FAILED_TO_POST_RATING);
        });
      });
  });
});

describe("사용자의 영화 평가 이력이 있는 경우", () => {
  beforeEach(() => {
    cy.intercept("GET", Api.generatePopularMoviesUrl(1), {
      fixture: "movieList.json",
    }).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");

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
          fixture: "movieUserRatingExists.json",
        }).as("getUserRating");

        cy.get(selectors.itemCard).first().click();
      });
  });

  it("사용자가 과거에 평가한 이력이 있다면, 별들의 색깔이 영화의 평점에 맞게 초기화 된다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    // first star should be filled
    cy.get(selectors.ratingStar)
      .first()
      .should("have.attr", "src")
      .should("include", UserMovieRatingForm.PATH_STAR_FILLED);
  });

  it("사용자가 과거에 평가한 이력이 있다면, rating-score 가 영화의 평점에 맞게 초기화 된다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.ratingScore).should("have.text", "2");
  });
});

describe("사용자의 영화 평가 이력이 없는 경우", () => {
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

  it("사용자가 과거에 평가한 이력이 없다면, 별들의 색깔은 모두 비어있어야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.ratingStar).each(($star) => {
      cy.wrap($star)
        .should("have.attr", "src")
        .should("include", UserMovieRatingForm.PATH_STAR_EMPTY);
    });
  });

  it("사용자가 과거에 평가한 이력이 없다면, rating-score 는 빈 문자열이어야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.wait("@getUserRating");

    cy.get(selectors.ratingScore).should("be.empty");
  });
});
