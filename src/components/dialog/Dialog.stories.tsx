import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/button/Button";
import { Dialog } from "./Dialog";

const sizes = ["sm", "md", "lg"] as const;

function DialogDemo({
  open: _open,
  defaultOpen: _defaultOpen,
  onOpenChange,
  ...props
}: ComponentProps<typeof Dialog>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button text="Open dialog" onClick={() => setOpen(true)} />
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

function DialogSizesDemo(props: ComponentProps<typeof Dialog>) {
  const [openSize, setOpenSize] = useState<(typeof sizes)[number] | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {sizes.map((size) => (
        <Button key={size} text={size} onClick={() => setOpenSize(size)} />
      ))}
      <Dialog
        {...props}
        size={openSize ?? "md"}
        open={openSize !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setOpenSize(null);
        }}
      >
        <div>{openSize}</div>
      </Dialog>
    </div>
  );
}

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: <div>Dialog content</div>,
    size: "md",
    title: "Title",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    open: { control: false },
    defaultOpen: { control: false },
    onOpenChange: { control: false },
    className: { control: false },
    footer: { control: false },
  },
  render: (args) => <DialogDemo {...args} />,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: { control: false },
  },
  render: (args) => <DialogSizesDemo {...args} />,
};

export const WithTitle: Story = {
  args: {
    title: "Confirm action",
    children: <div>This change cannot be undone.</div>,
  },
};

function DialogFooterDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
      }}
    >
      <Button text="Open dialog" onClick={() => setOpen(true)} />
      {status ? <p>{status}</p> : null}
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item"
        footer={
          <>
            <Button
              variant="outline"
              text="Cancel"
              onClick={() => setOpen(false)}
            />
            <Button
              variant="dangerPrimary"
              text="Delete"
              onClick={() => {
                setStatus("Item deleted");
                setOpen(false);
              }}
            />
          </>
        }
      >
        <div>This item will be permanently removed.</div>
      </Dialog>
    </div>
  );
}

export const WithFooter: Story = {
  args: {
    size: "sm"
  },

  render: () => <DialogFooterDemo />
};
