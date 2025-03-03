describe("Movie App E2E Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/popular?*", {
      fixture: "popularMovies.json",
    }).as("getPopularMovies");
    cy.intercept("GET", "**/now_playing?*", {
      fixture: "nowPlayingMovies.json",
    }).as("getNowPlayingMovies");

    cy.visit("http://localhost:5173");

    cy.get("#movie-list-container").as("movieContainer");
  });

  describe("Skeleton UI Tests", () => {
    it("shows skeleton UI on initial load", () => {
      cy.get("@movieContainer").find(".skeleton").should("exist");

      cy.wait("@getPopularMovies");
      cy.get(".skeleton").should("not.exist");
    });
  });

  describe("Tabs Functionality Tests", () => {
    it("selects 'popular' tab by default", () => {
      cy.get("[data-category='popular'] .tab-item").should(
        "have.class",
        "selected"
      );
    });

    it("changes tab on click and remembers selection", () => {
      cy.get("[data-category='now_playing']").click();
      cy.get("[data-category='now_playing'] .tab-item").should(
        "have.class",
        "selected"
      );

      cy.reload();
      cy.get("[data-category='now_playing'] .tab-item").should(
        "have.class",
        "selected"
      );
    });

    it("load movies via selected tab changes", () => {
      cy.get("[data-category='popular']").click();
      cy.wait("@getPopularMovies");

      cy.get("[data-category='now_playing']").click();
      cy.wait("@getNowPlayingMovies");
    });
  });
});
