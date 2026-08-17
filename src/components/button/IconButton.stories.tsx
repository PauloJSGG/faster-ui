import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "@/icons/PlusIcon";
import { IconButton } from "./IconButton";

const variants = ["primary", "outline", "ghost"] as const;
const shapes = ["square", "round"] as const;
const sizes = ["sm", "md", "lg"] as const;

const plusIcon = <PlusIcon />;

/*
 * Inline styles rather than utilities: only component source is scanned for
 * classes, so a Tailwind class written here would never be compiled.
 */
const Row = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "12px",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    icon: plusIcon,
    "aria-label": "Add",
    variant: "primary",
    shape: "square",
    size: "md",
    disabled: false,
  },
  argTypes: {
    variant: { control: "select", options: [...variants] },
    shape: { control: "select", options: [...shapes] },
    size: { control: "select", options: [...sizes] },
    disabled: { control: "boolean" },
    icon: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <Row>
      {variants.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} />
      ))}
    </Row>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <Row>
      {sizes.map((size) => (
        <IconButton key={size} {...args} size={size} aria-label={size} />
      ))}
    </Row>
  ),
};

export const Shapes: Story = {
  argTypes: {
    shape: { control: false },
  },
  render: (args) => (
    <Row>
      {shapes.map((shape) => (
        <IconButton key={shape} {...args} shape={shape} aria-label={shape} />
      ))}
    </Row>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <Row>
      {variants.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} disabled />
      ))}
    </Row>
  ),
};
