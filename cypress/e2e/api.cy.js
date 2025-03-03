describe("API 테스트를 생성한다", () => {
  beforeEach("TEST 별, GET 호출", () => {
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=en-US&page=1",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-1-page.json",
      },
    ).as("mockedGETPage1");
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=en-US&page=2",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-2-page.json",
      },
    ).as("mockedGETPage2");
    cy.intercept(
      {
        method: "GET",
        url: "3/movie/popular?language=en-US&page=3",
        hostname: "api.themoviedb.org",
      },
      {
        fixture: "movie-popular-3-page.json",
      },
    ).as("mockedGETPage3");
  });
  it("API GET 테스트", () => {
    cy.visit("http://localhost:5173");
    // cy.wait("@mockedGET");
    cy.wait("@mockedGETPage1").then((interception) => {
      // cy.get("thing").should("have.length");
      console.log(interception.response.body);
    });
    cy.wait("@mockedGETPage2").then((interception) => {
      // cy.get("thing").should("have.length");
      console.log(interception.response.body);
    });
    cy.wait("@mockedGETPage3").then((interception) => {
      // cy.get("thing").should("have.length");
      console.log(interception.response.body);
    });
  });
});
