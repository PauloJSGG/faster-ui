import { Button } from "./Button";

describe("Button", () => {
  it("mounts, is visible, and handles click", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Button text="Save" onClick={onClick} />);
    cy.contains("button", "Save").should("be.visible").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("does not fire click when disabled", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Button text="Save" disabled onClick={onClick} />);
    cy.contains("button", "Save").should("be.disabled").click({ force: true });
    cy.get("@onClick").should("not.have.been.called");
  });
});
