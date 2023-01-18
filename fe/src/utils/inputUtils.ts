import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { Input } from "../models/input";

export const isInputChanged = <I extends Input>(
  input: I,
  stored: MutableRefObject<I>,
  ignoreCase = false
) =>
  Object.keys(input).some((key) => {
    const value = input[key];
    const storedValue = stored.current[key];
    return !ignoreCase &&
      typeof value === "string" &&
      typeof storedValue === "string"
      ? value.toUpperCase() !== storedValue.toUpperCase()
      : value !== storedValue;
  });

export const getInputFieldSetter =
  <I extends object, V = I[keyof I]>(
    setInput: Dispatch<SetStateAction<I>>,
    fieldName: keyof I,
    getAdditional = (newValue?: V | null) => ({})
  ) =>
  (newValue?: V | null) =>
    setInput((prevInput) =>
      prevInput[fieldName] !== newValue
        ? {
            ...prevInput,
            [fieldName]: newValue,
            ...getAdditional(newValue),
          }
        : prevInput
    );

export const getInputFieldSetterWithEvent = <
  I extends Input,
  V = I[keyof I],
  E = any
>(
  setInput: Dispatch<SetStateAction<I>>,
  fieldName: keyof I,
  getAdditional = (newValue?: V | null) => ({})
) => {
  const setInputField = getInputFieldSetter<I, V>(
    setInput,
    fieldName,
    getAdditional
  );
  return (_: E, newValue?: V | null) => setInputField(newValue);
};

export const getInputFieldSetterFromValueChangeEvent = <I extends Input>(
  setInput: Dispatch<SetStateAction<I>>,
  fieldName: keyof I,
  getAdditional = (newValue?: string | null) => ({})
) => {
  const setInputField = getInputFieldSetter<I, string>(
    setInput,
    fieldName,
    getAdditional
  );
  return ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setInputField(value);
};

export const getInputFieldSetterFromCheckedChangeEvent = <I extends Input>(
  setInput: Dispatch<SetStateAction<I>>,
  fieldName: keyof I,
  getAdditional = (newChecked?: boolean | null) => ({})
) => {
  const setInputField = getInputFieldSetter<I, boolean>(
    setInput,
    fieldName,
    getAdditional
  );
  return ({ target: { checked } }: ChangeEvent<HTMLInputElement>) =>
    setInputField(checked);
};
