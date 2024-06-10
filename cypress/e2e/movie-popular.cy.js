describe("영화 리스트 e2e 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/popular?page=1*`,
      },
      { fixture: "movie-popular.json" }
    ).as("getMoiveList");
    cy.intercept(
      {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/popular?page=2*`,
      },
      { fixture: "movie-second-popular.json" }
    ).as("getSecontMoiveList");
    cy.visit("http://localhost:8080/");
  });

  it("더보기 버튼이 렌더링 된다.", () => {
    cy.get("button.btn").should("be.visible");
  });

  it("루트 경로로 접속 시 데이터를 제대로 불러 오는지 테스트", () => {
    cy.wait("@getMoiveList").then((interception) => {
      const nextPageMovieItemsLength =
        interception.response.body.results.length;

      cy.wrap(nextPageMovieItemsLength).should("eq", 20);
      // cy.should('eq', nextPageMovieItemsLength)
      // cy.get("#app > main > section > button").scrollIntoView();
    });
  });

  it("스크롤을 최하단으로 내리고 더보기를 눌렀을 때 20개를 더 불러 오는지 확인", () => {
    cy.wait("@getMoiveList").then(() => {
      // cy.should('eq', nextPageMovieItemsLength)
      cy.get("#app > main > section > button").scrollIntoView();
      cy.get("button.btn").click();

      cy.wait("@getSecontMoiveList").then((interception) => {
        const nextPageMovieItemsLength =
          interception.response.body.results.length;
        console.log("nextPageMovieItemsLength", nextPageMovieItemsLength);

        cy.wrap(nextPageMovieItemsLength).should("eq", 20);
      });
    });
  });
});
