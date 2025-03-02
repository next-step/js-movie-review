describe("영화 목록 조회 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("지금 인기 있는 영화 목록을 조회할 수 있다.", () => {
    cy.get("main > section > h2").should("have.text", "지금 인기 있는 영화");
  });

  it("영화 목록은 20개의 영화를 포함한다.", () => {
    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("영화 목록의 각 아이템은 썸네일이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li > img.thumbnail").should("exist");
  });

  it("영화 목록의 각 아이템은 평점이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li .rate").should("exist");
  });

  it("영화 목록의 각 아이템은 제목이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li .item-title").should("exist");
  });
});
