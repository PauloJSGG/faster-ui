import {
  forwardRef,
  useId,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import {
  inputAddonVariants,
  inputErrorVariants,
  inputFieldVariants,
  inputIconVariants,
  inputInnerVariants,
  inputWrapperVariants,
} from "@/components/input/Input.variants";
import { CrossIcon } from "@/icons/CrossIcon";

export type InputProps = Omit<ComponentProps<"input">, "prefix" | "size"> & {
  prefix?: string;
  suffix?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  onClear?: () => void;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      prefix,
      suffix,
      leftIcon,
      rightIcon,
      error,
      size,
      type = "text",
      id,
      clearable = true,
      onClear,
      value,
      defaultValue,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const errorId = `${id ?? generatedId}-error`;
    const hasError = Boolean(error);
    const describedBy =
      [hasError ? errorId : undefined, ariaDescribedBy].filter(Boolean).join(" ") ||
      undefined;

    const handleClear = () => {
      onClear?.();

      if (value === undefined && inputRef.current) {
        inputRef.current.value = "";
      }
    };

    return (
      <div
        className={cn(
          "fui:box-border fui:flex fui:w-full fui:flex-col fui:font-sans fui:leading-normal fui:text-foreground fui:antialiased",
          className,
        )}
      >
        <div className={inputWrapperVariants({ error: hasError, size })}>
          {prefix && (
            <span className={inputAddonVariants({ side: "prefix", size })}>
              {prefix}
            </span>
          )}

          <div className={inputInnerVariants({ size })}>
            {leftIcon && (
              <span className={inputIconVariants({ size })} aria-hidden>
                {leftIcon}
              </span>
            )}

            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              id={id}
              type={type}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              className={inputFieldVariants()}
              {...props}
            />

            {clearable && (
              <button
                type="button"
                className={cn(
                  inputIconVariants({ size }),
                  "fui:pointer-events-auto fui:cursor-pointer",
                )}
                aria-label="Clear"
                disabled={props.disabled}
                onClick={handleClear}
              >
                <CrossIcon />
              </button>
            )}

            {rightIcon && (
              <span className={inputIconVariants({ size })} aria-hidden>
                {rightIcon}
              </span>
            )}
          </div>

          {suffix && (
            <span className={inputAddonVariants({ side: "suffix", size })}>
              {suffix}
            </span>
          )}
        </div>

        {hasError && (
          <p id={errorId} className={inputErrorVariants()}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
