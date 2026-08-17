import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./IconButton";

const icon = <span data-testid="icon" />;

describe("IconButton", () => {
  it("renders with aria-label", () => {
    render(<IconButton icon={icon} aria-label="Add" />);
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("calls onClick once when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<IconButton icon={icon} aria-label="Add" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<IconButton icon={icon} aria-label="Add" disabled />);
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });
});
