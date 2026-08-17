import { useCallback, useEffect, useRef, useState } from 'react';

interface UseControllableStateProps<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateProps<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useState<T | undefined>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(value as T)
          : nextValue;

      if (!isControlled) {
        setUncontrolledProp(resolvedValue);
      }
      onChangeRef.current?.(resolvedValue);
    },
    [isControlled, value]
  );

  return [value, setValue, isControlled] as const;
}