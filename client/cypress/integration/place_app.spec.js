describe("Place app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened with all 2399 places", function () {
    cy.contains("Refresh this page (pressing F5) to get all places again.");
    cy.contains("Places found: 2399");
  });

  it("user can change the page size", function () {
    cy.contains("Submit page size");
    cy.get("#input-page-size").type(5);
    cy.get("#button-page-size").click();

    cy.contains("Displaying 5 places per page");
    cy.get("#table-places").find("tbody").find("tr").should("have.length", 5);
  });

  it("user can change the current page", function () {
    cy.contains("Go to page");
    cy.get("#input-requested-page").type(2);
    cy.get("#button-requested-page").click();

    cy.contains("Currently on page: 2");
  });

  it("user can input and submit tag list with ANY", function () {
    cy.contains("Submit tags seperated by commas");
    cy.contains("Any or All");
    cy.get("#input-tag-list").type("Vietnamese,Asian");
    cy.get("#button-tag-list").click();
    // cy.get("#select-any-all").click().findByText("Any").click();
    cy.get("#select-any-all").first().type("{enter}");
    cy.get("#button-any-all").click();

    cy.contains("Places found: 112");
  });

  it("user can input and submit tag list with ALL", function () {
    cy.contains("Submit tags seperated by commas");
    cy.contains("Any or All");
    cy.get("#input-tag-list").type("Vietnamese,Asian");
    cy.get("#button-tag-list").click();
    // cy.get("#select-any-all").click().findByText("Any").click();
    cy.get("#select-any-all").first().type("{downArrow}{enter}");
    cy.get("#button-any-all").click();

    cy.contains("Places found: 16");
  });
});
