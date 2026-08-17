import { Input } from "./Input";

describe("Input", () => {
  it("mounts and accepts typed input", () => {
    cy.mount(<Input placeholder="Name" />);
    cy.get("input").should("be.visible").type("Ada");
    cy.get("input").should("have.value", "Ada");
  });
});
