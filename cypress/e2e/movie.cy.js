import END_POINT from "../../src/constants/api";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  it("영화 목록은 한번에 20개씩 보여준다.", () => {
    cy.get(".item-list li").should("have.length", 20);
  });

  it("더보기 버튼을 클릭하면 20개씩 추가로 보여준다.", () => {
    cy.get(".item-list li").should("have.length", 20);
    cy.contains("더 보기").click();
    cy.get(".item-list li").should("have.length", 40);
  });

  it("더보기 클릭 후 영화 목록을 불러오기 전 스켈레톤 UI를 보여준다.", () => {
    cy.intercept(Cypress.env("API_URL") + END_POINT.POPULAR_MOVIES(2), (req) => {
      req.continue((res) => {
        res.setDelay(1000);
      });
    }).as("getMovies");

    cy.contains("더 보기").click();

    cy.get(".skeleton-box").should("be.visible");
    cy.wait("@getMovies");
    cy.get(".skeleton-box").should("not.exist");
  });
});
