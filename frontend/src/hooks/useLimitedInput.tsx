import { useCallback, useRef } from "react";

type UseLimitedInputOptions = {
  maxLength: number;
  setValue: (value: string) => void;
  onLimit: () => void;
};

export function useLimitedInput({ maxLength, setValue, onLimit }: UseLimitedInputOptions) {
  const warnedRef = useRef(false);

  return useCallback(
    (value: string) => {
      if (value.length > maxLength) {
        if (!warnedRef.current) {
          onLimit();
          warnedRef.current = true;
        }
        setValue(value.slice(0, maxLength));
        return;
      }

      warnedRef.current = false;
      setValue(value);
    },
    [maxLength, onLimit, setValue]
  );
}
