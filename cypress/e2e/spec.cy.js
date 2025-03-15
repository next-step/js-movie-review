describe("Header 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Header 떴는지 확인", () => {
    cy.get("h2").should("contain", "지금 인기있는 영화");
  });
});

describe("영화목록", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("영화 목록에 li가 20개 있는지 확인", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("더보기 클릭 시 추가 20개 총 40개의 영화가 뜨는지 확인", () => {
    cy.get(".more-btn").click();
    cy.get(".thumbnail-list li").should("have.length", 40);
  });
});

describe("영화검색", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("소닉 검색 시 영화 목록에 li가 8개 있는지 확인", () => {
    cy.get(".search-input").type("소닉");
    cy.get(".search-icon").click();
    cy.get(".thumbnail-list li").should("have.length", 8);
  });
});
