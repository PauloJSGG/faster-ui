import { cva } from "class-variance-authority";

export const dialogRootVariants = cva(
  "fui:box-border fui:fixed fui:inset-0 fui:z-50 fui:m-0 fui:hidden fui:h-full fui:max-h-none fui:w-full fui:max-w-none fui:items-center fui:justify-center fui:border-none fui:bg-transparent fui:font-sans fui:leading-normal fui:text-foreground fui:antialiased fui:p-[24px] fui:backdrop:bg-black/50 fui:open:flex",
);

export const dialogPanelVariants = cva(
  "fui:box-border fui:relative fui:flex fui:max-h-full fui:flex-col fui:overflow-hidden fui:rounded-lg fui:bg-white",
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

export const dialogCloseVariants = cva([
  "fui:absolute fui:right-4 fui:top-4",
  "fui:enabled:hover:bg-transparent",
  "fui:enabled:active:bg-transparent",
]);

export const dialogTitleVariants = cva(
  "fui:box-border fui:m-0 fui:shrink-0 fui:pt-4 fui:pr-12 fui:pb-4 fui:pl-4 fui:text-2xl fui:font-bold fui:break-words",
);

export const dialogBodyVariants = cva(
  "fui:box-border fui:min-h-0 fui:flex-1 fui:overflow-y-auto fui:p-4",
);

export const dialogFooterVariants = cva(
  "fui:box-border fui:flex fui:shrink-0 fui:justify-end fui:gap-dialog-footer fui:p-4",
);

export const dialogDividerVariants = cva(
  "fui:box-border fui:m-0 fui:h-dialog-divider fui:w-full fui:shrink-0 fui:border-0 fui:bg-dialog-divider fui:p-0",
);
