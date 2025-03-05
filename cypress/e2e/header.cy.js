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

  it("헤더 컴포넌트에 인기 영화 정보가 포함되어야 한다.", () => {
    cy.get("header .top-rated-movie").should("exist");
  });
});
