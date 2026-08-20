import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("updates its value when typed into", async () => {
    const user = userEvent.setup();

    render(<Input placeholder="Email" />);

    const input = screen.getByPlaceholderText("Email");
    await user.type(input, "ada@example.com");

    expect(input).toHaveValue("ada@example.com");
  });

  it("clears a focused field and calls onClear", async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();

    render(<Input placeholder="Email" defaultValue="hello" onClear={onClear} />);

    const input = screen.getByPlaceholderText("Email");
    await user.click(input);
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(input).toHaveValue("");
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("hides the clear button while empty or unfocused", async () => {
    const user = userEvent.setup();

    render(<Input placeholder="Email" />);

    const input = screen.getByPlaceholderText("Email");
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();

    await user.type(input, "a");
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();

    await user.click(document.body);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("steps a controlled number field and never shows Clear", async () => {
    const user = userEvent.setup();

    function ControlledNumber() {
      const [value, setValue] = useState("5");

      return (
        <Input
          type="number"
          placeholder="Amount"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledNumber />);

    const input = screen.getByPlaceholderText("Amount");

    await user.click(input);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(input).toHaveValue(6);

    await user.click(screen.getByRole("button", { name: "Decrease" }));
    expect(input).toHaveValue(5);
  });

  it("marks the field invalid and points aria-describedby at the error", () => {
    render(<Input placeholder="Email" error="This field is required" />);

    const input = screen.getByPlaceholderText("Email");
    const error = screen.getByText("This field is required");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it("can be disabled", () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("renders prefix and suffix text", () => {
    render(
      <Input prefix="https://" suffix=".com" placeholder="example" />,
    );

    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    render(<Input size={size} placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("never shows Clear when clearable is false", async () => {
    const user = userEvent.setup();

    render(
      <Input placeholder="Email" defaultValue="hello" clearable={false} />,
    );

    await user.click(screen.getByPlaceholderText("Email"));

    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });
});
