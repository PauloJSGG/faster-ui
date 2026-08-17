import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { iconButtonVariants } from "@/components/button/IconButton.variants";

export type IconButtonProps = Omit<ComponentProps<"button">, "children"> & {
  icon: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  shape?: "round" | "square";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
};

export function IconButton({
  icon,
  variant,
  shape,
  size,
  className,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(iconButtonVariants({ variant, shape, size }), className)}
      {...props}
    >
      <span className="fui:inline-flex" aria-hidden>
        {icon}
      </span>
    </button>
  );
}
