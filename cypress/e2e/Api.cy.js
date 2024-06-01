import ErrorMessage from "../../src/js/ErrorMessage.js";
import Api from "../../src/js/domain/Api.js";

describe("Api 기능 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야 한다.", () => {
    const currentPage = 1;
    const url = Api.generateUrl(currentPage);

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
      cy.request(Api.get(WRONG_URL)).to.throw(ErrorMessage.NOT_VALID_URL);
    });
  });
});
