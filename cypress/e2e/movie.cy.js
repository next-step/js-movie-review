describe("영화 리뷰 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("마운트 시 영화 목록의 1페이지를 불러온다.", () => {
    cy.get(".item-list li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 그 다음의 영화 목록 20개를 불러온다.", () => {
    cy.get(".load-more").should("exist").click();
    cy.get(".item-list li").should("have.length", 40);
  });
});

describe("영화 리뷰 테스트", () => {
  beforeEach(() => {
    const BASE_URL = "https://api.themoviedb.org/3/movie";
    const param = new URLSearchParams({
      api_key: Cypress.env("API_KEY"),
      language: "ko-KR",
      page: 1,
    });
    cy.intercept(
      {
        method: "GET",
        url: `${BASE_URL}/popular?${param}`,
      },
      { fixture: "movie-popular.json" }
    ).as("popularMovies");

    cy.visit("http://localhost:8080");
  });

  it("페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.", async () => {
    cy.wait("@popularMovies");

    cy.get(".load-more").should("not.exist");
  });
});
