describe("API 테스트를 생성한다", () => {
  beforeEach("TEST 별, GET 호출", () => {
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=en-US&page=1",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "fixture.json",
      },
    ).as("mockedGET");
  });
  it("API GET 테스트", () => {
    cy.visit("http://localhost:5173");
    // cy.wait("@mockedGET");
    cy.wait("@mockedGET").then((interception) => {
      // cy.get("thing").should("have.length");
      console.log(interception.response.body);
    });
  });
});
