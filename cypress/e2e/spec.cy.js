describe("template spec", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야한다.", () => {
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";
    const param = new URLSearchParams({
      language: "ko-KR",
    });

    cy.request({
      url: `${baseUrl}?${param}`,
      auth: {
        bearer: Cypress.env("API_KEY"),
      },
    }).as("movies");

    cy.get("@movies").its("status").should("eq", 200);
    cy.get("@movies").its("body.results").should("have.length", 20);
  });
});
