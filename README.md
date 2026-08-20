# faster-ui

A React + Tailwind CSS v4 component library. Classes ship under the `fui:` prefix so they do not collide with a host app’s Tailwind build.

```bash
npm install @paulojsgg/faster-ui
```

```tsx
import "@paulojsgg/faster-ui/index.css";
import { Button, IconButton, Input, Dialog } from "@paulojsgg/faster-ui";
```

Requires React 18 or 19.

## Button

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"primary"` \| `"outline"` \| `"ghost"` \| `"link"` \| `"dangerPrimary"` \| `"dangerOutline"` \| `"dangerGhost"` \| `"dangerLink"` | `"primary"` |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` |
| `text` | `string` | — |
| `icon` | `ReactNode` | — |
| `iconPosition` | `"left"` \| `"right"` | — |

`iconPosition` is only valid when `icon` is set. Native `<button>` props are forwarded.

```tsx
import { Button } from "@paulojsgg/faster-ui";

export function Example() {
  return (
    <>
      <Button text="Save" />
      <Button variant="outline" size="sm" text="Cancel" />
    </>
  );
}
```

## IconButton

| Prop | Type | Default |
| --- | --- | --- |
| `icon` | `ReactNode` | required |
| `aria-label` | `string` | required |
| `variant` | `"primary"` \| `"outline"` \| `"ghost"` | `"primary"` |
| `shape` | `"square"` \| `"round"` | `"square"` |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` |

```tsx
import { IconButton } from "@paulojsgg/faster-ui";

export function Example() {
  return (
    <IconButton
      aria-label="Add"
      variant="ghost"
      shape="round"
      icon={
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden>
          <path
            d="M7.6 1.2H6.4v5.2H1.2v1.2h5.2v5.2h1.2V7.6h5.2V6.4H7.6V1.2Z"
            fill="currentColor"
          />
        </svg>
      }
    />
  );
}
```

## Input

Native `<input>` plus:

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` |
| `prefix` | `string` | — |
| `suffix` | `string` | — |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |
| `error` | `string` | — |
| `clearable` | `boolean` | `true` |
| `onClear` | `() => void` | — |

Clear appears when the field is focused and non-empty. `type="number"` uses steppers instead of Clear.

```tsx
import { useState } from "react";
import { Input } from "@paulojsgg/faster-ui";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <Input
      placeholder="example.com"
      prefix="https://"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
      error={value.includes(" ") ? "No spaces" : undefined}
    />
  );
}
```

## Dialog

Native `<dialog>` with `open` replaced by a controlled/uncontrolled API.

| Prop | Type | Default |
| --- | --- | --- |
| `open` | `boolean` | — |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean) => void` | — |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` |
| `title` | `string` | — |
| `footer` | `ReactNode` | — |
| `showDivider` | `boolean` | `false` |

Closes from the corner button, backdrop click, or Escape.

```tsx
import { useState } from "react";
import { Button, Dialog } from "@paulojsgg/faster-ui";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button text="Open" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item"
        footer={
          <>
            <Button variant="outline" text="Cancel" onClick={() => setOpen(false)} />
            <Button variant="dangerPrimary" text="Delete" onClick={() => setOpen(false)} />
          </>
        }
      >
        This item will be permanently removed.
      </Dialog>
    </>
  );
}
```
