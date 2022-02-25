before(() => {
  cy.visit("http://localhost:8080/");
});

const tagString = "cat";

describe("Button for adding new tag is rendered", () => {
  it("Should appear in tag container", () => {
    cy.get(".add__new__tag").should("be.visible");
  });
});

describe("Add and remove tags", () => {
  it("Should appear in tag container", () => {
    cy.get("input").type(tagString + "{enter}");

    cy.get(".base__tag").contains(tagString);
  });

  it("Should be no duplicates in tag container", () => {
    cy.get("input").type(tagString + "{enter}");
    cy.get(".search__tag").should("have.length", 2);
  });

  it("Should be deleted from tag container", () => {
    cy.get(".base__tag").contains(tagString).click();
    cy.contains(tagString).should("not.exist");
  });
});
