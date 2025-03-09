describe("헤더 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더 컴포넌트가 렌더링되어야 한다.", () => {
    cy.get("header").should("exist");
  });

  it("헤더 컴포넌트에 로고가 포함되어야 한다.", () => {
    cy.get("header .logo").should("exist");
  });

  it("헤더 컴포넌트에는 제목과 평점이 포함되어야 한다.", () => {
    cy.get("header .title").should("have.text", "인사이드 아웃2");
    cy.get("header .rate-value").should("have.text", "9.5");
  });
});
