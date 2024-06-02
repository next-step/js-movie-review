describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  it("영화 목록은 한번에 20개씩 보여준다.", () => {
    cy.get(".item-list li").should("have.length", 20);
  });

  it("더보기 버튼을 클릭하면 20개씩 추가로 보여준다.", () => {
    cy.get(".item-list li").should("have.length", 20);
    cy.contains("더 보기").click();
    cy.get(".item-list li").should("have.length", 40);
  });
});
