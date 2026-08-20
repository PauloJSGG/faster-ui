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
  dialogBodyVariants,
  dialogCloseVariants,
  dialogDividerVariants,
  dialogFooterVariants,
  dialogPanelVariants,
  dialogRootVariants,
  dialogTitleVariants,
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
  showDivider?: boolean;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      children,
      size,
      className,
      title,
      footer,
      showDivider = false,
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
        className={dialogRootVariants()}
        onCancel={handleCancel}
        onClick={handleClick}
        onClose={handleClose}
      >
        <div className={cn(dialogPanelVariants({ size }), className)}>
          {title && (
            <h2 id={titleId} className={dialogTitleVariants()}>
              {title}
            </h2>
          )}
          {title && showDivider && <hr className={dialogDividerVariants()} />}
          <IconButton
            className={dialogCloseVariants()}
            icon={<CloseIcon />}
            aria-label="Close"
            variant="ghost"
            size="sm"
            onClick={requestClose}
          />
          <div className={dialogBodyVariants()}>{children}</div>
          {footer && <hr className={dialogDividerVariants()} />}
          {footer && <div className={dialogFooterVariants()}>{footer}</div>}
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = "Dialog";
