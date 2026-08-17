import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("shows prefix text", () => {
    render(<Input prefix="https://" placeholder="example.com" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("shows error message and marks the field invalid", () => {
    render(<Input placeholder="Email" error="This field is required" />);

    const input = screen.getByPlaceholderText("Email");
    const error = screen.getByText("This field is required");

    expect(error).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    render(<Input size={size} placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("calls onClear when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();

    render(
      <Input placeholder="Email" value="hello" onChange={() => {}} onClear={onClear} />,
    );

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("clears an uncontrolled input when the clear button is clicked", async () => {
    const user = userEvent.setup();

    render(<Input placeholder="Email" defaultValue="hello" />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveValue("hello");

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(input).toHaveValue("");
  });
});
