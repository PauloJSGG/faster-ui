import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("mounts, is visible, and handles click", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <IconButton icon={<span />} aria-label="Add" onClick={onClick} />,
    );
    cy.get("button[aria-label='Add']").should("be.visible").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("does not fire click when disabled", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <IconButton icon={<span />} aria-label="Add" disabled onClick={onClick} />,
    );
    cy.get("button[aria-label='Add']")
      .should("be.disabled")
      .click({ force: true });
    cy.get("@onClick").should("not.have.been.called");
  });
});
