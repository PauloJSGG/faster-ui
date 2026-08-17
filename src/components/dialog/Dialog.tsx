import {
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { CloseIcon } from "@/icons/CloseIcon";
import { IconButton } from "@/components/button/IconButton";
import {
  dialogDividerVariants,
  dialogFooterVariants,
  dialogSectionVariants,
  dialogVariants,
} from "@/components/dialog/Dialog.variants";
import { useControllableState } from "@/hooks/useControllableState";
import { cn } from "@/utils/cn";

export type DialogProps = Omit<ComponentProps<"dialog">, "open"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  title?: string;
  footer?: ReactNode;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      children,
      size,
      className,
      title,
      footer,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      onCancel,
      onClose,
      onClick,
      ...props
    },
    forwardedRef,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const isOpen = open ?? false;

    const setDialogRef = useCallback(
      (node: HTMLDialogElement | null) => {
        dialogRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    useLayoutEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen) {
        if (!dialog.open) dialog.showModal();
        return;
      }

      if (dialog.open) dialog.close();
    }, [isOpen]);

    const requestClose = () => {
      setOpen(false);
    };

    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
      onCancel?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      requestClose();
    };

    const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
      onClose?.(event);
      if (isOpen) requestClose();
    };

    const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (event.target === event.currentTarget) requestClose();
    };

    return (
      <dialog
        {...props}
        ref={setDialogRef}
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "fui:box-border fui:fixed fui:inset-0 fui:z-50 fui:m-0 fui:hidden fui:max-h-none fui:w-full fui:max-w-none fui:items-center fui:justify-center fui:border-none fui:bg-transparent fui:font-sans fui:leading-normal fui:text-foreground fui:antialiased fui:p-[24px] fui:backdrop:bg-black/50 fui:open:flex",
        )}
        onCancel={handleCancel}
        onClick={handleClick}
        onClose={handleClose}
      >
        <div className={cn(dialogVariants({ size }), className)}>
          {title && (
            <h2
              id={titleId}
              className={cn(
                dialogSectionVariants(),
                "fui:m-0 fui:text-2xl fui:font-bold",
              )}
            >
              {title}
            </h2>
          )}
          {title && <hr className={dialogDividerVariants()} />}
          <IconButton
            className="fui:absolute fui:right-4 fui:top-4 fui:enabled:hover:bg-transparent"
            icon={<CloseIcon />}
            aria-label="Close"
            variant="ghost"
            size="sm"
            onClick={requestClose}
          />
          <div className={dialogSectionVariants()}>{children}</div>
          {footer && <hr className={dialogDividerVariants()} />}
          {footer && <div className={dialogFooterVariants()}>{footer}</div>}
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = "Dialog";
