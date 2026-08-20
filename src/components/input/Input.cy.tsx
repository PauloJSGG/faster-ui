import { Input } from "./Input";

describe("Input", () => {
  it("accepts typed input and clears it", () => {
    cy.mount(<Input placeholder="Name" />);

    cy.get("input").should("be.visible").type("Ada");
    cy.get("input").should("have.value", "Ada");

    cy.get("input").click();
    cy.get("button[aria-label='Clear']").click();
    cy.get("input").should("have.value", "");
  });

  it("renders a prefix", () => {
    cy.mount(<Input prefix="https://" placeholder="example.com" />);
    cy.contains("https://").should("be.visible");
  });

  it("steps a number field from the chevrons", () => {
    cy.mount(<Input type="number" placeholder="Amount" defaultValue="5" />);

    cy.get("button[aria-label='Increase']").click();
    cy.get("input").should("have.value", "6");
  });
});
