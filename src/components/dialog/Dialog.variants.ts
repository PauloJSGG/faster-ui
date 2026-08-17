import { cva } from "class-variance-authority";

export const dialogVariants = cva(
  "fui:box-border fui:relative fui:flex fui:flex-col fui:rounded-lg fui:bg-white",
  {
    variants: {
      size: {
        sm: "fui:w-dialog-sm",
        md: "fui:w-dialog-md",
        lg: "fui:w-dialog-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const dialogSectionVariants = cva("fui:box-border fui:p-4");

export const dialogFooterVariants = cva(
  "fui:box-border fui:flex fui:justify-end fui:gap-dialog-footer fui:p-4",
);

export const dialogDividerVariants = cva(
  "fui:box-border fui:m-0 fui:h-dialog-divider fui:w-full fui:border-0 fui:bg-dialog-divider fui:p-0",
);
