import { useState, type ComponentProps, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/button/Button";
import { Dialog } from "./Dialog";

type DialogStoryArgs = ComponentProps<typeof Dialog> & {
  showFooter?: boolean;
};

const sizes = ["sm", "md", "lg"] as const;

function playgroundFooter(onClose: () => void) {
  return (
    <>
      <Button variant="outline" text="Cancel" onClick={onClose} />
      <Button text="Confirm" onClick={onClose} />
    </>
  );
}

type PlaygroundKind =
  | "default"
  | "noTitle"
  | "footer"
  | "sm"
  | "md"
  | "lg"
  | "longTitle";

const longTitle =
  "A title long enough to wrap over several lines, plus an unbreakable token: pneumonoultramicroscopicsilicovolcanoconiosis";

function DialogPlaygroundCatalog() {
  const [kind, setKind] = useState<PlaygroundKind | null>(null);

  const close = () => setKind(null);

  const setups: Record<
    PlaygroundKind,
    {
      label: string;
      title?: string;
      size: (typeof sizes)[number];
      children: string;
      footer?: ReactNode;
    }
  > = {
    default: {
      label: "Default",
      title: "Title",
      size: "md",
      children: "Dialog content",
    },
    noTitle: {
      label: "No title",
      size: "md",
      children: "Dialog content",
    },
    footer: {
      label: "With footer",
      title: "Confirm",
      size: "sm",
      children: "This change cannot be undone.",
      footer: playgroundFooter(close),
    },
    sm: { label: "Small", title: "Small", size: "sm", children: "sm" },
    md: { label: "Medium", title: "Medium", size: "md", children: "md" },
    lg: { label: "Large", title: "Large", size: "lg", children: "lg" },
    longTitle: {
      label: "Long title",
      title: longTitle,
      size: "sm",
      children: "The title wraps clear of the close button.",
    },
  };

  const active = kind ? setups[kind] : null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {(Object.keys(setups) as PlaygroundKind[]).map((key) => (
        <Button
          key={key}
          text={setups[key].label}
          onClick={() => setKind(key)}
        />
      ))}
      {active ? (
        <Dialog
          open
          size={active.size}
          title={active.title}
          footer={active.footer}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) close();
          }}
        >
          {active.children}
        </Dialog>
      ) : null}
    </div>
  );
}

function DialogDemo({
  open: _open,
  defaultOpen: _defaultOpen,
  onOpenChange,
  showFooter = false,
  footer: _footer,
  title,
  children,
  ...props
}: DialogStoryArgs) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <Button text="Open dialog" onClick={() => setOpen(true)} />
      <Dialog
        {...props}
        title={title || undefined}
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
        footer={showFooter ? playgroundFooter(close) : undefined}
      >
        {children}
      </Dialog>
    </>
  );
}

function DialogSizesDemo({
  open: _open,
  defaultOpen: _defaultOpen,
  onOpenChange: _onOpenChange,
  showFooter: _showFooter,
  footer: _footer,
  title,
  size: _size,
  children: _children,
  ...props
}: DialogStoryArgs) {
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
        title={title || undefined}
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
    controls: {
      include: ["size", "title", "children", "showFooter"],
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Dialog content",
    size: "md",
    title: "Title",
    showFooter: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: [...sizes],
      table: { category: "Layout" },
    },
    title: { control: "text", table: { category: "Content" } },
    children: { control: "text", table: { category: "Content" } },
    showFooter: { control: "boolean", table: { category: "State" } },
  },
  render: (args) => <DialogDemo {...args} />,
} satisfies Meta<DialogStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => <DialogPlaygroundCatalog />,
};

export const Sizes: Story = {
  argTypes: {
    size: { control: false },
    showFooter: { control: false },
  },
  render: (args) => <DialogSizesDemo {...args} />,
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
    size: "sm",
  },
  argTypes: {
    showFooter: { control: false },
    title: { control: false },
    children: { control: false },
  },
  render: () => <DialogFooterDemo />,
};

export const LongTitle: Story = {
  args: {
    size: "sm",
    title: longTitle,
    children: "The title wraps clear of the close button.",
  },
};

function DialogScrollDemo() {
  const [open, setOpen] = useState(false);

  const body: ReactNode = (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {Array.from({ length: 40 }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          Section {index + 1} of a document taller than the viewport.
        </p>
      ))}
    </div>
  );

  return (
    <>
      <Button text="Open dialog" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Terms of service"
        footer={<Button text="Accept" onClick={() => setOpen(false)} />}
      >
        {body}
      </Dialog>
    </>
  );
}

export const ScrollingContent: Story = {
  argTypes: {
    showFooter: { control: false },
    title: { control: false },
    children: { control: false },
    size: { control: false },
  },
  render: () => <DialogScrollDemo />,
};
