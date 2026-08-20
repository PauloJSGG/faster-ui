import { useState, type ComponentProps, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "@/icons/SearchIcon";
import { Input } from "./Input";

type InputStoryArgs = Omit<ComponentProps<typeof Input>, "leftIcon" | "rightIcon"> & {
  leftIcon?: boolean;
  rightIcon?: boolean;
};

const sizes = ["sm", "md", "lg"] as const;
const types = ["text", "number", "email", "password", "search", "tel", "url"] as const;

const searchIcon = <SearchIcon />;

function ControlledInput({
  leftIcon,
  rightIcon,
  defaultValue,
  onChange,
  onClear,
  ...props
}: InputStoryArgs) {
  const [value, setValue] = useState(() => String(defaultValue ?? ""));

  return (
    <Input
      {...props}
      leftIcon={leftIcon ? searchIcon : undefined}
      rightIcon={rightIcon ? searchIcon : undefined}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        onChange?.(event);
      }}
      onClear={() => {
        setValue("");
        onClear?.();
      }}
    />
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ margin: 0, fontSize: "12px", color: "#8E8E8E" }}>{label}</p>
      {children}
    </div>
  );
}

const fieldWidth = (Story: () => ReactNode) => (
  <div style={{ width: "320px" }}>
    <Story />
  </div>
);

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    controls: {
      include: [
        "size",
        "type",
        "placeholder",
        "defaultValue",
        "prefix",
        "suffix",
        "leftIcon",
        "rightIcon",
        "error",
        "clearable",
        "disabled",
        "readOnly",
      ],
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Text input",
    size: "md",
    type: "text",
    prefix: "",
    suffix: "",
    leftIcon: false,
    rightIcon: false,
    error: "",
    clearable: true,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: [...sizes],
      table: { category: "Field" },
    },
    type: {
      control: "select",
      options: [...types],
      table: { category: "Field" },
    },
    placeholder: { control: "text", table: { category: "Field" } },
    defaultValue: { control: "text", table: { category: "Field" } },
    prefix: { control: "text", table: { category: "Addons" } },
    suffix: { control: "text", table: { category: "Addons" } },
    leftIcon: { control: "boolean", table: { category: "Addons" } },
    rightIcon: { control: "boolean", table: { category: "Addons" } },
    error: { control: "text", table: { category: "State" } },
    clearable: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    readOnly: { control: "boolean", table: { category: "State" } },
  },
  render: (args) => <ControlledInput {...args} />,
} satisfies Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    controls: { include: [] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Section label="Default">
        <ControlledInput placeholder="Text input" />
      </Section>
      <Section label="Filled">
        <ControlledInput placeholder="Text input" defaultValue="hello" />
      </Section>
      <Section label="Prefix">
        <ControlledInput prefix="https://" placeholder="example.com" />
      </Section>
      <Section label="Suffix">
        <ControlledInput suffix=".com" placeholder="example" />
      </Section>
      <Section label="Prefix and suffix">
        <ControlledInput
          prefix="https://"
          suffix=".com"
          placeholder="example"
        />
      </Section>
      <Section label="Left icon">
        <ControlledInput leftIcon placeholder="Search" />
      </Section>
      <Section label="Number">
        <ControlledInput type="number" placeholder="0" defaultValue="10" />
      </Section>
      <Section label="Error">
        <ControlledInput
          placeholder="Email"
          error="This field is required"
        />
      </Section>
      <Section label="Disabled">
        <ControlledInput
          prefix="https://"
          placeholder="example.com"
          defaultValue="example"
          disabled
        />
      </Section>
    </div>
  ),
};

export const Sizes: Story = {
  decorators: [fieldWidth],
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {sizes.map((size) => (
        <ControlledInput key={size} {...args} size={size} placeholder={size} />
      ))}
    </div>
  ),
};

export const Number: Story = {
  decorators: [fieldWidth],
  args: {
    type: "number",
    placeholder: "0",
    defaultValue: "10",
  },
  argTypes: {
    type: { control: false },
  },
};

export const Error: Story = {
  decorators: [fieldWidth],
  argTypes: {
    error: { control: false },
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <ControlledInput {...args} error={undefined} placeholder="Valid" />
      <ControlledInput
        {...args}
        error="This field is required"
        placeholder="Invalid"
      />
    </div>
  ),
};
