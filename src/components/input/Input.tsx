import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import {
  inputAddonVariants,
  inputErrorVariants,
  inputFieldVariants,
  inputIconVariants,
  inputInnerVariants,
  inputStepperButtonVariants,
  inputStepperVariants,
  inputWrapperVariants,
} from "@/components/input/Input.variants";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { ChevronUpIcon } from "@/icons/ChevronUpIcon";
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

    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(
      () => String(defaultValue ?? "") !== "",
    );
    const [isFocusWithin, setIsFocusWithin] = useState(false);

    const hasValue = isControlled ? String(value) !== "" : uncontrolledHasValue;
    const isNumber = type === "number";
    /*
     * A number field hands its right edge to the stepper, so the clear button
     * would have to sit on top of it.
     */
    const showClear = clearable && !isNumber && hasValue && isFocusWithin;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(event.target.value !== "");
      }

      onChange?.(event);
    };

    const handleClear = () => {
      onClear?.();

      if (!isControlled && inputRef.current) {
        inputRef.current.value = "";
        setUncontrolledHasValue(false);
      }
    };

    const step = (direction: "up" | "down") => {
      const input = inputRef.current;
      if (!input || input.disabled || input.readOnly) return;

      try {
        if (direction === "up") input.stepUp();
        else input.stepDown();
      } catch {
        // `step="any"` has no next value to move to, so there is nothing to do.
        return;
      }

      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
        return;
      }

      setIsFocusWithin(false);
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
            <span className={inputAddonVariants({ size })}>{prefix}</span>
          )}

          <div
            className={inputInnerVariants({ size })}
            onFocus={() => setIsFocusWithin(true)}
            onBlur={handleBlur}
          >
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
              onChange={handleChange}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              className={inputFieldVariants()}
              {...props}
            />

            {showClear && (
              <button
                type="button"
                className={cn(
                  inputIconVariants({ size }),
                  "fui:pointer-events-auto fui:cursor-pointer fui:hover:text-neutral-500 fui:active:text-neutral-600",
                )}
                aria-label="Clear"
                /*
                 * Keeps the press from moving focus off the input, which would
                 * unmount this button before the click could land.
                 */
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleClear}
              >
                <CrossIcon />
              </button>
            )}

            {isNumber && (
              <span className={inputStepperVariants()}>
                <button
                  type="button"
                  className={inputStepperButtonVariants()}
                  aria-label="Increase"
                  tabIndex={-1}
                  disabled={props.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => step("up")}
                >
                  <ChevronUpIcon />
                </button>
                <button
                  type="button"
                  className={inputStepperButtonVariants()}
                  aria-label="Decrease"
                  tabIndex={-1}
                  disabled={props.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => step("down")}
                >
                  <ChevronDownIcon />
                </button>
              </span>
            )}

            {rightIcon && (
              <span className={inputIconVariants({ size })} aria-hidden>
                {rightIcon}
              </span>
            )}
          </div>

          {suffix && (
            <span className={inputAddonVariants({ size })}>{suffix}</span>
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
