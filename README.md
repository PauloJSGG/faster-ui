# faster-ui

A React component library and design system built with Tailwind CSS v4.

[![npm](https://img.shields.io/npm/v/@paulojsgg/faster-ui)](https://www.npmjs.com/package/@paulojsgg/faster-ui)

## Installation

```bash
npm install @paulojsgg/faster-ui
```

`react` and `react-dom` are peer dependencies (v18 or v19), so they use whatever version your app already has.

## Styles

Import the stylesheet once, at your application's root entry — `main.tsx`,
`layout.tsx`, or wherever your global CSS is loaded:

```tsx
import "@paulojsgg/faster-ui/index.css";
```

That is the whole setup. Your app needs no Tailwind installation and no design
tokens of its own; `index.css` is a single precompiled file containing the
utilities the components use and the tokens behind them.

Import it **before** your own styles. The rules are plain single-class
utilities, so anything you load afterwards wins a specificity tie and stays in
charge.

### It will not touch your styles

Tailwind's preflight is not shipped. Preflight resets every element on the page,
which in your application means wiping your own base styles — so instead each
component carries what it needs (`box-sizing`, the form-control reset, zeroed
margins) as utilities on itself.

Everything the stylesheet emits is namespaced by Tailwind's `prefix()` feature.
Utility classes are `fui:bg-primary`, not `bg-primary`, and custom properties are
`--fui-color-primary`, not `--color-primary`. Neither can collide with your own
Tailwind build, whichever order the two stylesheets load in.

## Design tokens

Override any token by redeclaring it after the import. The names carry the
`fui` prefix, and the semantic tokens read from the primitives, so retuning one
primitive moves everything built on it:

```css
@import "@paulojsgg/faster-ui/index.css";

:root {
  --fui-color-primary-600: #6366f1;
  --fui-radius-md: 8px;
}
```

Primitives are scales (`--fui-color-primary-600`, `--fui-color-neutral-300`),
semantics are roles (`--fui-color-primary`, `--fui-color-border`), and the
component tokens are sizes (`--fui-height-button-md`, `--fui-width-dialog-sm`).

### Overriding a component's classes

`className` is merged onto the component, and you write it in your own
unprefixed utilities:

```tsx
<Button className="bg-indigo-500" text="Custom" />
```

Worth knowing how this resolves. Because your class and ours are different names
— `bg-indigo-500` against `fui:bg-primary` — `tailwind-merge` cannot recognise
them as a conflicting pair, so both survive on the element and the cascade
decides. Both score one class, so it comes down to stylesheet order, and yours
wins as long as `index.css` is imported before your own CSS. If you would rather
not depend on load order, set the token instead of overriding the class.

## Usage

```tsx
import { useState } from "react";
import { Button, Dialog, IconButton, Input } from "@paulojsgg/faster-ui";
import "@paulojsgg/faster-ui/index.css";

export function Example() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <Button text="Invite a teammate" onClick={() => setOpen(true)} />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="sm"
        title="Invite a teammate"
        footer={
          <>
            <Button variant="ghost" text="Cancel" onClick={() => setOpen(false)} />
            <Button text="Send invite" onClick={() => setOpen(false)} />
          </>
        }
      >
        <Input
          size="md"
          placeholder="teammate@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onClear={() => setEmail("")}
        />
      </Dialog>
    </>
  );
}
```

### Components

- `Button` — variants: `primary`, `outline`, `ghost`, `link`, and `danger*` equivalents; sizes `sm`, `md`, `lg`.
- `IconButton` — icon-only button; variants `primary`, `outline`, `ghost`; shapes `square`, `round`. Requires `aria-label`.
- `Input` — supports `prefix`, `suffix`, `leftIcon`, `rightIcon`, `error`, and `clearable`.
- `Dialog` — modal built on the native `<dialog>` element; controlled via `open` or uncontrolled via `defaultOpen`.

The `cn` class-merging helper and the `useControllableState` hook are also exported.

## Development

```bash
npm install
npm run storybook      # component explorer
npm test               # Jest unit tests
npm run cy:run         # Cypress component tests
npm run lint
npm run typecheck
npm run verify:package # build, then validate the publishable package
```

## Releasing

Releases are fully automated. Every push to `main` runs the test suite, and if it
passes, [semantic-release](https://semantic-release.org) determines the next
version from the commit messages, publishes to npm, and creates a GitHub release.

Commit messages must follow
[Conventional Commits](https://www.conventionalcommits.org), because they decide
the version bump:

| Commit prefix                  | Release   |
| ------------------------------ | --------- |
| `fix:`                         | patch     |
| `feat:`                        | minor     |
| `BREAKING CHANGE:` in the body | major     |
| `chore:`, `docs:`, `test:`     | no release |

Publishing uses npm [trusted publishing](https://docs.npmjs.com/trusted-publishers)
over OIDC, so there is no npm token stored in the repository, and every release is
published with provenance. See [RELEASING.md](RELEASING.md) for the one-time setup.
