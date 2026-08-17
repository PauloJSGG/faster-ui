import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "@/icons/SearchIcon";
import { Input } from "./Input";

function ControlledInput(props: ComponentProps<typeof Input>) {
  const [value, setValue] = useState("");

  return (
    <Input
      {...props}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
    />
  );
}

const sizes = ["sm", "md", "lg"] as const;

const searchIcon = <SearchIcon />;

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Text input",
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    prefix: { control: "text" },
    suffix: { control: "text" },
    error: { control: "text" },
    leftIcon: { control: false },
    rightIcon: { control: false },
    type: {
      control: "select",
      options: ["text", "number", "email", "password", "search", "tel", "url"],
    },
    className: { control: false },
    onClear: { control: false },
  },
  render: (args) => <ControlledInput {...args} />,
  /*
   * Inline styles rather than utilities: only component source is scanned for
   * classes, so a Tailwind class written here would never be compiled.
   */
  decorators: [
    (Story) => (
      <div style={{ width: "192px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Basic: Story = {
  name: "Input-Basic",
};

export const Sizes: Story = {
  name: "Input-Sizes",
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", width: "320px" }}>
      {sizes.map((size) => (
        <ControlledInput key={size} {...args} size={size} placeholder={size} />
      ))}
    </div>
  ),
};

export const Prefix: Story = {
  name: "Input-Prefix",
  args: {
    prefix: "https://",
    placeholder: "example.com",
  },
};

export const Suffix: Story = {
  name: "Input-Suffix",
  args: {
    suffix: ".com",
    placeholder: "example",
  },
};

export const PrefixAndSuffix: Story = {
  name: "Input-Prefix & Suffix",
  args: {
    prefix: "https://",
    suffix: ".com",
    placeholder: "example",
  },
};

export const LeftIcon: Story = {
  name: "Input-Left icon",
  args: {
    leftIcon: searchIcon,
    placeholder: "Search",
  },
};

export const RightIcon: Story = {
  name: "Input-Right icon",
  args: {
    rightIcon: searchIcon,
    placeholder: "Search",
  },
};

export const Number: Story = {
  name: "Input-Number",
  args: {
    type: "number",
    placeholder: "0",
  },
};

export const Error: Story = {
  name: "Input-Error",
  args: {
    error: "This field is required",
  },
};
