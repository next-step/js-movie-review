describe("영화 검색 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  describe("검색창 테스트", () => {
    it("메인 페이지 헤더에 검색창이 있어야 한다.", () => {
      cy.get("header .search").should("exist");
    });

    it("검색창에 키워드 입력 후 돋보기 아이콘을 클릭하면 검색 결과 페이지로 이동한다.", () => {
      cy.get("header .search").find("input").type("호빗");
      cy.get("header .search").find(".search-button").click();

      cy.url().should("include", "/search");
    });

    it("검색창에 키워드 입력 후 엔터 버튼을 누르면 검색 결과 페이지로 이동한다.", () => {
      cy.get("header .search").find("input").type("호빗");
      cy.get("header .search").find("input").type("{enter}");

      cy.url().should("include", "/search");
    });
  });

  describe("검색 결과 페이지 테스트", () => {
    it("검색 시 키워드를 검색 결과 페이지에서 표시해야 한다.", () => {
      cy.get("header .search").find("input").type("해리포터");
      cy.get("header .search").find(".search-button").click();

      cy.url().should("include", "/search");

      cy.contains("해리포터").should("exist");
    });

    it("검색 결과가 존재하지 않을 시에는 결과 없음 안내 문구가 표시되어야 한다.", () => {
      cy.get("header .search").find("input").type("훼리풔퉈");
      cy.get("header .search").find(".search-button").click();

      cy.url().should("include", "/search");

      cy.contains("검색 결과가 없습니다").should("exist");
    });
  });
});
