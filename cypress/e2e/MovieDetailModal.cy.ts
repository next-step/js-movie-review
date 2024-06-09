import Api from "../../src/js/domain/Api";

const selectors = {
  itemCard: ".item-card",
  modal: ".modal",
  modalCloseBtn: ".modal-close",
  movieTitle: ".movie-title",
  modalBody: ".modal-body",
  skeleton: ".skeleton",
};

describe("영화 상세 모달 기능 테스트", () => {
  beforeEach(() => {
    const url = Api.generatePopularMoviesUrl(1);
    cy.intercept("GET", url).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");

    // 첫번째 영화 카드의 id 를 가져와서 영화 상세 정보를 요청하는 API 를 intercept 한다.
    cy.get(selectors.itemCard)
      .first()
      .invoke("attr", "data-id")
      .then((movieId) => {
        const url = Api.generateMovieDetailUrl(Number(movieId));
        cy.intercept("GET", url, {
          delay: 1000,
        }).as("getMovieDetail");

        cy.get(selectors.itemCard).first().click();
      });
  });

  it("영화 카드를 클릭하면 영화 상세 모달이 보여야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
  });

  it("영화의 상세 모달은 클릭한 영화에 대한 상세 정보를 요청하는 API 를 호출한다.", () => {
    cy.wait("@getMovieDetail").its("request").should("exist");
  });

  it("ESC 키를 누르면 영화 상세 모달이 닫혀야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");

    cy.get("body").type("{esc}");
    cy.get(selectors.modal).should("not.be.visible");
  });

  it("dimmed 영역을 클릭하면 영화 상세 모달이 닫혀야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");

    cy.get(selectors.modal).click("topRight");
    cy.get(selectors.modal).should("not.be.visible");
  });

  it("닫기 버튼을 클릭하면 영화 상세 모달이 닫혀야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");

    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modal).should("not.be.visible");
  });

  it("모달 내부를 클릭해도 event propagation에 의해 영화 상세 모달이 닫히지 않는다.", () => {
    cy.get(selectors.modal).click("center");
    cy.get(selectors.modal).should("be.visible");
  });

  it("영화 상세 모달이 닫힐 때 modal의 title 과 body 가 초기화 되어야 한다.", () => {
    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modal).should("not.be.visible");

    cy.get(selectors.movieTitle).should("be.empty");

    cy.get(selectors.modalBody).should("be.empty");
  });

  it("영화 상세 정보를 가져오는 동안 스켈레톤이 보여야 한다.", () => {
    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.skeleton).should("be.visible");
    cy.wait("@getMovieDetail");
    cy.get(selectors.skeleton).should("not.exist");
  });
});
