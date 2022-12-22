import { MutableRefObject } from "react";

export const isInputChanged = <I extends object>(
  input: I,
  stored: MutableRefObject<I>,
  ignoreCase = false
) =>
  Object.keys(input).some((key) => {
    const value = input[key as keyof I];
    const storedValue = stored.current[key as keyof I];
    return !ignoreCase &&
      typeof value === "string" &&
      typeof storedValue === "string"
      ? value.toUpperCase() !== storedValue.toUpperCase()
      : value !== storedValue;
  });
