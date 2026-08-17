import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "@/icons/PlusIcon";
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
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    text: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  argTypes: {
    variant: { control: "select", options: [...variants] },
    size: { control: "select", options: [...sizes] },
    text: { control: "text" },
    disabled: { control: "boolean" },
    icon: { control: false },
    iconPosition: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof Button>;

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
        <Button key={variant} {...args} variant={variant} text={variant} />
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
        <Button key={size} {...args} size={size} text={size} />
      ))}
    </Row>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: plusIcon,
    iconPosition: "left",
  },
  argTypes: {
    iconPosition: { control: "radio", options: ["left", "right"] },
  },
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
        <Button
          key={variant}
          {...args}
          variant={variant}
          text={variant}
          disabled
        />
      ))}
    </Row>
  ),
};
