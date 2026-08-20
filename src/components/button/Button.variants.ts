import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "fui:box-border fui:m-0 fui:inline-flex fui:appearance-none fui:items-center fui:justify-center fui:gap-button fui:rounded-md fui:border-0 fui:bg-transparent fui:font-sans fui:text-center fui:font-medium fui:leading-normal fui:tracking-normal fui:antialiased fui:cursor-pointer fui:disabled:cursor-not-allowed fui:[&_svg]:block",
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
          "fui:enabled:hover:border-primary-hover fui:enabled:hover:text-primary-hover",
          "fui:enabled:active:border-primary-active fui:enabled:active:text-primary-active",
          "fui:disabled:border-neutral-border-disabled fui:disabled:text-neutral-text-disabled",
        ],
        ghost: [
          "fui:text-neutral",
          "fui:enabled:hover:bg-neutral-hover",
          "fui:enabled:active:bg-neutral-active",
          "fui:disabled:text-neutral-text-disabled",
        ],
        link: [
          "fui:text-primary",
          "fui:enabled:hover:text-primary-hover",
          "fui:enabled:active:text-primary-active",
          "fui:disabled:text-primary-ghost-disabled",
        ],
        dangerPrimary: [
          "fui:bg-danger fui:text-white",
          "fui:enabled:hover:bg-danger-hover",
          "fui:enabled:active:bg-danger-active",
          "fui:disabled:bg-danger-disabled",
        ],
        dangerOutline: [
          "fui:text-danger fui:border fui:border-danger",
          "fui:enabled:hover:border-danger-hover fui:enabled:hover:text-danger-hover",
          "fui:enabled:active:text-danger-active fui:enabled:active:border-danger-active",
          "fui:disabled:border-danger-outline-disabled fui:disabled:text-danger-outline-disabled",
        ],
        dangerGhost: [
          "fui:text-danger",
          "fui:enabled:hover:bg-danger-ghost-hover",
          "fui:enabled:active:bg-danger-ghost-active fui:enabled:active:text-danger-active",
          "fui:disabled:text-danger-outline-disabled",
        ],
        dangerLink: [
          "fui:text-danger",
          "fui:enabled:hover:text-danger-hover",
          "fui:enabled:active:text-danger-active",
          "fui:disabled:text-danger-outline-disabled",
        ],
      },
      size: {
        sm: "fui:h-button-sm fui:p-button-sm fui:min-w-button-sm fui:min-h-button-sm fui:text-sm",
        md: "fui:h-button-md fui:p-button-md fui:min-w-button-md fui:min-h-button-md fui:text-md",
        lg: "fui:h-button-lg fui:p-button-lg fui:min-w-button-lg fui:min-h-button-lg fui:text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
