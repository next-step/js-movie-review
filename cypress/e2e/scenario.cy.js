describe("사용자 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("사용자가 페이지에 진입하면 20개의 영화 포스터를 볼 수 있습니다", () => {
    // given

    // when

    // then
    cy.get(".thumbnail-list > li .item").should("have.length", 20);
  });
});
