import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, type ComponentProps } from "react";
import { Dialog } from "./Dialog";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

function ControlledDialog({
  defaultOpen = false,
  onOpenChange,
  ...props
}: ComponentProps<typeof Dialog> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Dialog
        {...props}
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
      />
    </>
  );
}

describe("Dialog", () => {
  it("stays closed until opened", () => {
    render(
      <Dialog title="Details">
        <div>Body</div>
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });

  it("opens when open is true", () => {
    render(
      <Dialog open title="Details">
        <div>Body</div>
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Details" })).toBeVisible();
    expect(screen.getByText("Body")).toBeVisible();
  });

  it("calls onOpenChange(false) when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Dialog open title="Details" onOpenChange={onOpenChange}>
        <div>Body</div>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes from the close button in a controlled dialog", async () => {
    const user = userEvent.setup();

    render(
      <ControlledDialog defaultOpen title="Details">
        <div>Body</div>
      </ControlledDialog>,
    );

    expect(screen.getByRole("dialog", { name: "Details" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens from a trigger in a controlled dialog", async () => {
    const user = userEvent.setup();

    render(
      <ControlledDialog title="Details">
        <div>Body</div>
      </ControlledDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("dialog", { name: "Details" })).toBeVisible();
  });

  it("opens by default when defaultOpen is true", () => {
    render(
      <Dialog defaultOpen title="Details">
        <div>Body</div>
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Details" })).toBeVisible();
  });

  it("closes an uncontrolled dialog from the close button", async () => {
    const user = userEvent.setup();

    render(
      <Dialog defaultOpen title="Details">
        <div>Body</div>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the backdrop is clicked", () => {
    render(
      <Dialog defaultOpen title="Details">
        <div>Body</div>
      </Dialog>,
    );

    fireEvent.click(document.querySelector("dialog")!);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when cancel is requested", () => {
    render(
      <Dialog defaultOpen title="Details">
        <div>Body</div>
      </Dialog>,
    );

    fireEvent(
      document.querySelector("dialog")!,
      new Event("cancel", { cancelable: true }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders parent-provided footer actions", async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    render(
      <Dialog
        open
        title="Details"
        footer={
          <>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </>
        }
      >
        <div>Body</div>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("renders full-width dividers between title, content, and footer", () => {
    render(
      <Dialog
        open
        title="Details"
        footer={<button type="button">Ok</button>}
      >
        <div>Body</div>
      </Dialog>,
    );

    expect(document.querySelectorAll("hr")).toHaveLength(2);
  });
});
