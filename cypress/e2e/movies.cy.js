describe("Fetch Movie data", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get("#movie-list-container").as("movieContainer");
  });

  it("displays the skeleton UI on initial load", () => {
    cy.get("@movieContainer")
      .find(".skeleton")
      .should("exist")
      .and("be.visible");
  });
});
