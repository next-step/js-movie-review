describe("메인 페이지", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        req.reply({
          fixture: "popular-movies.json",
          delayMs: 500,
        });
      }
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 20개의 영화가 불러와진다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies).to.have.length(20);

      const popularMovieItems = cy.get("ul.thumbnail-list > li");
      popularMovieItems.should("have.length", 20);
    });
  });

  it("더보기 버튼 클릭 시 스켈레톤이 보였다가 사라지고, 새 영화 카드 20개가 추가로 보인다.", () => {
    cy.get("ul.thumbnail-list > li").should("have.length", 20);

    cy.get("button").contains("더 보기").click();

    cy.get("ul.thumbnail-list > li.card-skeleton").should(
      "have.length.greaterThan",
      0
    );

    cy.wait("@getPopularMovies");

    cy.get("ul.thumbnail-list > li.card-skeleton").should("have.length", 0);

    cy.get("ul.thumbnail-list > li").should("have.length", 40);
  });
});
