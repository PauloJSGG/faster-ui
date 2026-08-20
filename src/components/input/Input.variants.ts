import { cva } from "class-variance-authority";

export const inputWrapperVariants = cva(
  [
    "fui:group fui:box-border fui:flex fui:w-full fui:items-stretch fui:overflow-hidden fui:rounded-md fui:border fui:bg-background fui:text-foreground fui:leading-normal fui:antialiased fui:transition-colors fui:m-input",
    "fui:has-[:disabled]:cursor-not-allowed fui:has-[:disabled]:border-neutral-200",
  ],
  {
    variants: {
      size: {
        sm: "fui:h-input-sm fui:text-sm",
        md: "fui:h-input-md fui:text-md",
        lg: "fui:h-input-lg fui:text-lg",
      },
      error: {
        true: [
          "fui:border-danger",
          "fui:focus-within:border-danger",
        ],
        false: [
          "fui:border-border",
          "fui:not-has-[:disabled]:not-focus-within:hover:border-primary-hover",
          "fui:focus-within:border-primary fui:focus-within:shadow-input-focus",
        ],
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

export const inputFieldVariants = cva([
  "fui:box-border fui:m-0 fui:h-full fui:min-w-0 fui:flex-1 fui:appearance-none fui:border-0 fui:bg-transparent fui:p-0 fui:[font:inherit] fui:text-inherit fui:outline-none",
  "fui:placeholder:text-neutral-400 fui:placeholder:opacity-100",
  "fui:disabled:cursor-not-allowed fui:disabled:text-neutral-300",
  "fui:[&::-webkit-outer-spin-button]:[-webkit-appearance:none] fui:[&::-webkit-inner-spin-button]:[-webkit-appearance:none] fui:[&::-webkit-inner-spin-button]:m-0",
]);

export const inputStepperVariants = cva(
  "fui:box-border fui:pointer-events-auto fui:flex fui:shrink-0 fui:flex-col fui:justify-center fui:gap-0.5",
);

export const inputStepperButtonVariants = cva([
  "fui:box-border fui:m-0 fui:flex fui:cursor-pointer fui:appearance-none fui:items-center fui:justify-center fui:border-0 fui:bg-transparent fui:p-0 fui:text-neutral-500 fui:[&_svg]:block",
  "fui:enabled:hover:text-neutral-600",
  "fui:disabled:cursor-not-allowed fui:disabled:text-neutral-300",
]);

export const inputAddonVariants = cva(
  [
    "fui:box-border fui:inline-flex fui:shrink-0 fui:items-center fui:bg-neutral-50 fui:text-neutral-500",
    "fui:group-has-[:disabled]:bg-neutral-100 fui:group-has-[:disabled]:text-neutral-400",
  ],
  {
    variants: {
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

export const inputIconVariants = cva(
  [
    "fui:box-border fui:m-0 fui:pointer-events-none fui:inline-flex fui:shrink-0 fui:appearance-none fui:border-0 fui:bg-transparent fui:p-0 fui:text-neutral-400 fui:[&_svg]:block fui:[&_svg]:size-full",
    "fui:group-has-[:disabled]:text-neutral-300",
  ],
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
