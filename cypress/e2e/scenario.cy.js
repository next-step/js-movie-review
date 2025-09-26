describe("사용자 시나리오", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular?*page=1", {
      fixture: "movie-popular-list.json",
    }).as("getPopularMovies");
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular?*page=2", {
      fixture: "more-movie-popular-list.json",
    }).as("getPopularMoviesMore");
    cy.visit("http://localhost:5173");
  });
  it("사용자가 페이지에 진입하면 20개의 영화 포스터를 볼 수 있습니다", () => {
    // given
    cy.wait("@getPopularMovies");

    // when

    // then
    cy.get(".thumbnail-list > li .item").should("have.length", 20);
  });
  it("사용자가 더보기 버튼을 누르면 그 다음의 영화 목록을 볼 수 있습니다.", () => {
    // given
    cy.wait("@getPopularMovies");

    // when
    cy.get(".more").click();
    cy.wait("@getPopularMoviesMore");

    // then
    cy.get(".thumbnail-list > li .item").should("have.length", 40);
  });
});
