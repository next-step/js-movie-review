describe("영화 리뷰 테스트", () => {
  beforeEach(() => {
    // given
    cy.visit("http://localhost:8081");
  });

  it("초기 페이지 로딩 시 20개의 영화 목록을 불러온다.", () => {
    // then
    cy.get(".item-list li").should("have.length", 20);
  });

  it("더보기 버튼을 클릭하면 그 다음의 영화 목록 20개를 불러온다.", () => {
    // when
    cy.get(".load-more").should("exist").click();
    // then
    cy.get(".item-list li").should("have.length", 40);
  });

  it("영화 목록 아이템을 로딩 중일 때 Skeleton UI가 노출 된다.", () => {
    // then
    cy.get(".skeleton-item").should("have.length", 20);
    // when
    cy.wait(1000);
    // then
    cy.get(".skeleton-item").should("have.length", 0);
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
    // given
    cy.intercept(
      {
        method: "GET",
        url: `${BASE_URL}/popular?${param}`,
      },
      { fixture: "movie-popular.json" }
    ).as("popularMovies");

    cy.visit("http://localhost:8081");
  });

  it("마지막 페이지 도달 시 더보기 버튼이 표시되지 않는다.", async () => {
    // when
    cy.wait("@popularMovies");

    // then
    cy.get(".load-more").should("not.exist");
  });
});
