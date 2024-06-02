describe("영화 리뷰 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("마운트 시 영화 목록의 1페이지를 불러온다.", () => {
    cy.get(".item-list li").should("have.length", 20);
  });
});
