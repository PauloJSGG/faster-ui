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

function TallDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Terms"
        footer={<button type="button">Accept</button>}
      >
        <div>
          {Array.from({ length: 40 }, (_, index) => (
            <p key={index}>Section {index + 1}</p>
          ))}
        </div>
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

  it("keeps a tall dialog inside the viewport and scrolls the body", () => {
    cy.mount(<TallDialog />);
    cy.contains("button", "Open").click();

    // The panel must be clamped, which is what gives the body something to
    // scroll within. An unclamped panel simply grows past the viewport.
    cy.get("dialog > div").then(($panel) => {
      expect($panel[0].getBoundingClientRect().height).to.be.at.most(
        Cypress.config("viewportHeight"),
      );
    });

    cy.get("dialog div")
      .filter((_, el) => getComputedStyle(el).overflowY === "auto")
      .as("body");

    cy.get("@body").then(($body) => {
      const body = $body[0];
      expect(body.scrollHeight).to.be.greaterThan(body.clientHeight);
    });

    cy.get("@body").scrollTo("bottom");
    cy.get("@body").should(($body) => {
      expect($body[0].scrollTop).to.be.greaterThan(0);
    });

    // Title and footer sit outside the scrolling region, so they survive it.
    cy.contains("h2", "Terms").should("be.visible");
    cy.contains("button", "Accept").should("be.visible");
  });
});
