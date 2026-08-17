import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("mounts, is visible, and handles click", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <IconButton icon={<span />} aria-label="Add" onClick={onClick} />
    );
    cy.get("button[aria-label='Add']").should("be.visible").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });
});
