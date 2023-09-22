describe("영화 목록", () => {
  beforeEach("영화 목록 페이지가 잘 보여진다.", () => {
    cy.visit("http://localhost:8080");
  });

  it("영화 목록이 잘 보여진다.", () => {
    cy.get(".item-card").should("be.visible");
  });

  it("더보기 버튼을 누르면 데이터가 추가된다. (data 내 페이지 정보가 증가)", () => {
    cy.intercept({
      method: "GET",
      url: `${process.env.TMDB_API_BASE_URL}&page=2`,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    }).as("getPage2");

    cy.get("button.btn.primary").click();
  });
});
