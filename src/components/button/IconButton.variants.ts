import { cva } from "class-variance-authority";

/*
 * The size variants set the box with `size-*`, so the browser's default button
 * padding has to be zeroed here or the icon never centres. See
 * Button.variants.ts for why the rest of the preflight stand-in lives in the
 * base string.
 */
export const iconButtonVariants = cva(
  "fui:box-border fui:m-0 fui:inline-flex fui:shrink-0 fui:appearance-none fui:items-center fui:justify-center fui:border-0 fui:bg-transparent fui:p-0 fui:font-sans fui:leading-normal fui:antialiased fui:cursor-pointer fui:disabled:cursor-not-allowed fui:[&_svg]:block",
  {
    variants: {
      variant: {
        primary: [
          "fui:bg-primary fui:text-white",
          "fui:enabled:hover:bg-primary-hover",
          "fui:enabled:active:bg-primary-active",
          "fui:disabled:bg-primary-disabled",
        ],
        outline: [
          "fui:bg-white fui:text-neutral fui:border fui:border-neutral-border",
          "fui:enabled:hover:border-neutral-border fui:enabled:hover:bg-neutral-hover",
          "fui:enabled:active:border-neutral-active fui:enabled:active:bg-neutral-active",
          "fui:disabled:border-neutral-border-disabled fui:disabled:text-neutral-border-disabled",
        ],
        ghost: [
          "fui:text-neutral",
          "fui:enabled:hover:bg-neutral-hover",
          "fui:enabled:active:bg-neutral-active",
          "fui:disabled:text-neutral-text-disabled",
        ],
      },
      shape: {
        square: "fui:rounded-md",
        round: "fui:rounded-full",
      },
      size: {
        sm: "fui:size-icon-button-sm fui:[&_svg]:size-icon-sm",
        md: "fui:size-icon-button-md fui:[&_svg]:size-icon-md",
        lg: "fui:size-icon-button-lg fui:[&_svg]:size-icon-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "square",
      size: "md",
    },
  }
);
