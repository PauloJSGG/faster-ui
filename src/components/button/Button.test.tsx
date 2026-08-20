import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

const variants = [
  "primary",
  "outline",
  "ghost",
  "link",
  "dangerPrimary",
  "dangerOutline",
  "dangerGhost",
  "dangerLink",
] as const;

describe("Button", () => {
  it("renders text", () => {
    render(<Button text="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it.each(variants)("renders the %s variant as a named button", (variant) => {
    render(<Button variant={variant} text="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders an icon next to the label", () => {
    render(
      <Button
        text="Save"
        icon={<span data-testid="icon" />}
        iconPosition="left"
      />,
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick once when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button text="Save" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button text="Save" disabled onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
