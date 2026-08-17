import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button text="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls onClick once when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button text="Save" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
