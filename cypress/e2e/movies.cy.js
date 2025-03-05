import {
  DESKTOP_MOVIES_PER_LOAD,
  MOBILE_MOVIES_PER_LOAD,
  VIEWPORT_DESKTOP,
  VIEWPORT_MOBILE,
} from "../support/constants";

describe("Movie App E2E Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/popular?*", {
      fixture: "popularMovies.json",
    }).as("getPopularMovies");
    cy.intercept("GET", "**/now_playing?*", {
      fixture: "nowPlayingMovies.json",
    }).as("getNowPlayingMovies");
    cy.intercept("GET", "**/search/movie?language=ko-KR&page=1&query=harry*", {
      fixture: "harry.json",
    }).as("searchHarry");
    cy.intercept("GET", "**/search/movie?language=ko-KR&page=1&query=empty*", {
      fixture: "empty.json",
    }).as("searchEmpty");
    cy.intercept("GET", "**/search/movie?language=ko-KR&page=1&query=error*", {
      forceNetworkError: true,
    }).as("searchError");

    cy.visit("http://localhost:5173");

    cy.get("#movie-list-container").as("movieContainer");
    cy.get(".search-input").as("searchInput");
    cy.get(".search-bar").as("searchForm");
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
      cy.viewport(...VIEWPORT_DESKTOP);
      cy.wait("@getPopularMovies");

      cy.get(".movie-grid .movie-item").should(
        "have.length",
        DESKTOP_MOVIES_PER_LOAD
      );
    });

    it("loads initial 3 movies on mobile", () => {
      cy.viewport(...VIEWPORT_MOBILE);
      cy.reload();
      cy.wait("@getPopularMovies");

      cy.get(".movie-grid .movie-item").should(
        "have.length",
        MOBILE_MOVIES_PER_LOAD
      );
    });

    it("shows loadMore button if there are more movies to load", () => {
      cy.get("[data-category='popular']").click();
      cy.viewport(...VIEWPORT_DESKTOP);
      cy.wait("@getPopularMovies");
      cy.get("#load-more-btn").should("be.visible");
    });

    it("dynamically loads additional movies until all movies are displayed and then hides the load more button", () => {
      cy.wait("@getPopularMovies");
      cy.viewport(...VIEWPORT_DESKTOP);

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
        forceNetworkError: true,
      }).as("getPopularError");
      cy.visit("http://localhost:5173");

      cy.wait("@getPopularError");

      cy.on("window:alert", (text) => {
        expect(text).to.contain(
          "영화를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      });
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

  describe("Search Functionality Tests", () => {
    it("calls the search API when user types in the search field", () => {
      cy.get("@searchInput").type("harry");
      cy.get("@searchForm").submit();
      cy.wait("@searchHarry");
    });

    it("updates the query parameter when user types", () => {
      cy.get("@searchInput").type("harry");
      cy.get("@searchForm").submit();
      cy.wait("@searchHarry");

      cy.location("search").should("contain", "harry");
    });

    it("calls the search API with the correct query parameter", () => {
      cy.get("@searchInput").clear().type("harry");
      cy.get("@searchForm").submit();

      cy.wait("@searchHarry").then((interception) => {
        expect(interception.request.url).to.contain("query=harry");
      });
    });

    it("pre-populates the search field if a query parameter is already in the URL", () => {
      cy.visit({
        url: "http://localhost:5173",
        qs: { search: "something" },
      });

      cy.get("@searchInput").should("have.value", "something");
    });

    it("displays 'No data result' when no movies are found", () => {
      cy.get("@searchInput").clear().type("empty{enter}");

      cy.contains("검색 결과가 없습니다.").should("exist");
      cy.get(".movie-grid .movie-item").should("not.exist");
    });

    it("shows error alert when the search API fails", () => {
      cy.get("@searchInput").clear().type("error");
      cy.get("@searchForm").submit();
      cy.wait("@searchError");

      cy.on("window:alert", (text) => {
        expect(text).to.contain("검색 중 오류가 발생했습니다.");
      });
    });
  });
});
