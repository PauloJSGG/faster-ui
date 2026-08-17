import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/button/Button.variants";

type ButtonBaseProps = Omit<ComponentProps<"button">, "children"> & {
  variant?:
    | "primary"
    | "outline"
    | "ghost"
    | "link"
    | "dangerPrimary"
    | "dangerOutline"
    | "dangerGhost"
    | "dangerLink";
  size?: "sm" | "md" | "lg";
  text?: string;
};

export type ButtonProps = ButtonBaseProps &
  (
    | { icon: ReactNode; iconPosition?: "left" | "right" }
    | { icon?: never; iconPosition?: never }
  );

export function Button({
  variant,
  size,
  className,
  icon,
  iconPosition,
  text,
  disabled,
  ...props
}: ButtonProps) {
  const iconElement = icon ? (
    <span
      className="fui:inline-flex fui:shrink-0 fui:[&_svg]:block fui:[&_svg]:size-3.5"
      aria-hidden
    >
      {icon}
    </span>
  ) : null;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {iconElement && iconPosition === "left" && iconElement}
      {text && <span>{text}</span>}
      {iconElement && iconPosition === "right" && iconElement}
    </button>
  );
}

Button.displayName = "Button";