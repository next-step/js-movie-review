import Api from "../../src/js/domain/Api.js";

describe("Api 기능 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야 한다.", () => {
    // given
    const currentPage = 1;
    const url = Api.generateUrl(currentPage);

    // when
    cy.request(url).as("movies");

    // then
    cy.get("@movies").its("status").should("eq", 200);
    cy.get("@movies")
      .its("body.results")
      .should("have.length", Api.NUM_MOVIES_PER_PAGE);
  });
});
