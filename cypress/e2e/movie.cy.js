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
