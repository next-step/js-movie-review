describe("API 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 영화를 받아온다.", () => {
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";
    const param = new URLSearchParams({
      api_key: Cypress.env("TMDB_API_KEY"),
      language: "ko-KR",
      page: 1,
    });

    cy.request(`${baseUrl}?${param}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.have.length(20);
    });
  });
});

describe("영화 리뷰 웹 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("영화 카드는 썸네일, 별점, 제목을 갖는다.", () => {
    cy.get(".item-card").each(($el) => {
      cy.wrap($el).within(() => {
        cy.get(".item-thumbnail").should("be.visible");
        cy.get(".item-title").should("be.visible");
        cy.get(".item-score").should("be.visible");
      });
    });
  });

  it("영화 목록은 한 페이지에 20개씩 나온다.", () => {
    cy.get(".item-list li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 20개의 영화가 추가로 생성된다.", () => {
    cy.get(".show-more").click();
    cy.get(".item-list li").should("have.length", 40);
  });

  it("영화 목록을 불러오는 동안 스켈레톤 UI를 보여준다.", () => {
    cy.get(".skeleton-card").should("have.length", 20);
    cy.wait(1000);
    cy.get(".skeleton-card").should("have.length", 0);
  });
});
