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

  describe("Movie List & Load More Tests", () => {
    it("loads initial 9 movies on desktop", () => {
      cy.viewport(1024, 768);
      cy.wait("@getPopularMovies");

      cy.get(".movie-grid .movie-item").should("have.length", 9);
    });

    it("loads initial 3 movies on mobile", () => {
      cy.viewport(375, 667);
      cy.reload();
      cy.wait("@getPopularMovies");

      cy.get(".movie-grid .movie-item").should("have.length", 3);
    });

    it("shows loadMore button if there are more movies to load", () => {
      cy.viewport(1024, 768);
      cy.wait("@getPopularMovies");
      cy.get("#load-more-btn").should("be.visible");
    });

    it("dynamically loads additional movies until all movies are displayed and then hides the load more button", () => {
      cy.viewport(1024, 768);
      cy.wait("@getPopularMovies");

      cy.fixture("popularMovies.json").then((data) => {
        const totalMovies = data.result.length;

        cy.get(".movie-grid .movie-item").should("have.length", 9);
        cy.get("#load-more-btn").click();

        const firstLoadCount = Math.min(9 + 9, totalMovies);
        cy.get(".movie-grid .movie-item").should("have.length", firstLoadCount);

        if (totalMovies > firstLoadCount) {
          cy.get("#load-more-btn").click();
          cy.get(".movie-grid .movie-item").should("have.length", totalMovies);
        }

        cy.get("#load-more-btn").should("not.exist");
      });
    });
  });
});
