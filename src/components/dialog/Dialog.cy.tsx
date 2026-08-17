import { useState } from "react";
import { Dialog } from "./Dialog";

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Dialog open={open} onOpenChange={setOpen} title="Details">
        <div>Body</div>
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("opens and closes from the trigger and close button", () => {
    cy.mount(<ControlledDialog />);

    cy.contains("button", "Open").click();
    cy.get("dialog").should("have.attr", "open");
    cy.contains("Body").should("be.visible");

    cy.get("button[aria-label='Close']").click();
    cy.get("dialog").should("not.have.attr", "open");
  });
});
