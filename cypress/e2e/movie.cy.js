import endedPopularMovies from "../fixtures/ended-popular-movies.json";

describe("영화 목록", () => {
  beforeEach(() => {
    const url = "http://localhost:8080";
    cy.visit(url);

    cy.get("movie-app")
      .as("movieApp")
      .shadow()
      .find("movie-container")
      .as("movieContainer")
      .shadow()
      .find("movie-list")
      .as("movieList")
      .shadow()
      .find("movie-card")
      .as("movieCard");
  });

  it("최초 로드시 20개의 영화 카드를 보여준다.", () => {
    cy.get("@movieCard").should("have.length", 20);
  });

  it("더보기 버튼 클릭시 20개의 영화를 추가로 보여준다.", () => {
    cy.get("@movieContainer").shadow().find(".show-more").as("showMoreButton");

    cy.get("@movieCard").should("have.length", 20);
    cy.get("@showMoreButton").contains("더보기").click();
    cy.get("@movieCard").should("have.length", 40);
  });

  it("로딩중일 때는 스켈레톤 카드를 보여준다.", () => {
    cy.intercept("GET", "**/popular*", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000); // Delay the response to simulate loading
      });
    }).as("getPopularMoviesDelayed");

    cy.reload();
    cy.get("@movieCard").shadow().find(".skeleton").should("exist");
    cy.wait("@getPopularMoviesDelayed");

    cy.get("@movieCard").should("have.length", 20);
  });

  it("영화 목록을 더이상 불러올 수 없으면 '더보기' 버튼이 사라진다.", () => {
    cy.intercept("GET", "**/popular*", endedPopularMovies).as(
      "getEndedPopularMovies",
    );
    cy.get("@movieContainer").shadow().find(".show-more").as("showMoreButton");
    cy.get("@showMoreButton").should("exist");
    cy.get("@showMoreButton").click();

    cy.wait("@getEndedPopularMovies");
    cy.get("@movieContainer").shadow().find("show-more").should("not.exist");
  });
});
