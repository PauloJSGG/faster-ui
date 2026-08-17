import { cva } from "class-variance-authority";

/*
 * These class strings are applied straight to the elements rather than through
 * `cn`, so nothing here may conflict between a base string and its own variants
 * - there is no merge step to resolve it. The border width sits in the base and
 * only the colour varies.
 */
export const inputWrapperVariants = cva(
  "fui:box-border fui:flex fui:w-full fui:items-stretch fui:overflow-hidden fui:rounded-md fui:border fui:bg-background fui:text-foreground fui:leading-normal fui:antialiased fui:transition-colors fui:m-input fui:has-[:disabled]:cursor-not-allowed fui:has-[:disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "fui:h-input-sm fui:text-sm",
        md: "fui:h-input-md fui:text-md",
        lg: "fui:h-input-lg fui:text-lg",
      },
      error: {
        true: "fui:border-danger fui:focus-within:border-danger",
        false: "fui:border-border fui:focus-within:border-primary",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  },
);

export const inputInnerVariants = cva(
  "fui:box-border fui:flex fui:min-w-0 fui:flex-1 fui:items-center",
  {
    variants: {
      size: {
        sm: "fui:p-input-sm fui:gap-input-sm",
        md: "fui:p-input-md fui:gap-input-md",
        lg: "fui:p-input-lg fui:gap-input-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const inputErrorVariants = cva(
  "fui:m-0 fui:text-sm fui:leading-normal fui:text-danger",
);

/*
 * `[font:inherit]` is the one piece of the preflight stand-in a utility cannot
 * express: form controls do not inherit typography, so without it the field
 * renders in the browser's 13px Arial while the wrapper around it is sized in
 * the design system's scale.
 */
export const inputFieldVariants = cva(
  "fui:box-border fui:m-0 fui:h-full fui:min-w-0 fui:flex-1 fui:appearance-none fui:border-0 fui:bg-transparent fui:p-0 fui:[font:inherit] fui:text-inherit fui:outline-none fui:placeholder:text-neutral-400 fui:placeholder:opacity-100 fui:disabled:cursor-not-allowed",
);

export const inputAddonVariants = cva(
  "fui:box-border fui:inline-flex fui:shrink-0 fui:items-center fui:bg-neutral-100 fui:text-neutral-400",
  {
    variants: {
      side: {
        prefix: "fui:border-r fui:border-border",
        suffix: "fui:border-l fui:border-border",
      },
      size: {
        sm: "fui:p-input-sm",
        md: "fui:p-input-md",
        lg: "fui:p-input-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/*
 * Shared by the decorative icon spans and the clear <button>, which is why the
 * button reset is here too. The button re-enables pointer events through `cn`.
 */
export const inputIconVariants = cva(
  "fui:box-border fui:m-0 fui:pointer-events-none fui:inline-flex fui:shrink-0 fui:appearance-none fui:border-0 fui:bg-transparent fui:p-0 fui:text-neutral-400 fui:[&_svg]:block fui:[&_svg]:size-full",
  {
    variants: {
      size: {
        sm: "fui:size-icon-sm",
        md: "fui:size-icon-md",
        lg: "fui:size-icon-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
