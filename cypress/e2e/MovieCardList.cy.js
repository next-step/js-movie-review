const selectors = {
  "item-card": ".item-card",
  "show-more": ".show-more",
};

describe("영화 카드 목록 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("앱 최초 로드시 20개의 영화 카드가 보여야 한다.", () => {
    cy.get(selectors["item-card"]).should("have.length", 20);
  });

  it("더보기 버튼을 클릭하면 20개의 영화 카드가 추가로 보여야 한다.", () => {
    cy.get(selectors["show-more"]).click();
    cy.get(selectors["item-card"]).should("have.length", 40);
  });
});
