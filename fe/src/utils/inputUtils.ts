import { MutableRefObject } from "react";
import { AnyInput } from "../models/input";

export const isInputChanged = <I extends AnyInput>(
  input: I,
  stored: MutableRefObject<I>,
  ignoreCase = false
) =>
  Object.keys(input).some((key) => {
    let value = input[key];
    let storedValue = stored.current[key];
    if (
      !ignoreCase &&
      typeof value === "string" &&
      typeof storedValue === "string"
    ) {
      value = value.toUpperCase();
      storedValue = storedValue.toUpperCase();
    }
    return value !== storedValue;
  });
