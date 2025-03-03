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
        const totalMovies = data.results.length;

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

  describe("Error Handling Tests", () => {
    it("displays error message when the fetch fails", () => {
      cy.intercept("GET", "**/popular?*", {
        statusCode: 500,
        body: {},
      }).as("getPopularError");
      cy.wait("@getPopularError");

      cy.contains(
        "영화를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      ).should("be.visible");
    });
  });

  describe("Header Rendering Tests", () => {
    it("renders the correct header with first movie's data", () => {
      cy.fixture("popularMovies.json").then((data) => {
        const firstMovie = data.results[0];
        const expectedTitle = firstMovie.title;
        const expectedRating = firstMovie.vote_average.toFixed(1);
        const expectedBackdrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${firstMovie.backdrop_path}`;

        cy.get("#header-container").within(() => {
          cy.contains(expectedTitle).should("exist");
          cy.contains(expectedRating).should("exist");
        });

        cy.get("header")
          .should("have.attr", "style")
          .and("contain", expectedBackdrop);
      });
    });
  });
});
