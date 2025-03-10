describe("푸터 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("푸터 컴포넌트가 렌더링되어야 한다.", () => {
    cy.get("footer").should("exist");
  });

  it("푸터 컴포넌트에 저작권 정보가 포함되어야 한다.", () => {
    cy.get("footer").should("contain", "우아한테크코스 All Rights Reserved.");
  });
});
