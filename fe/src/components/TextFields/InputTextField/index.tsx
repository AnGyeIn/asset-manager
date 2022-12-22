import { SxProps, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Input } from "../../../models/input";
import { enterKeyDown } from "../../../utils/eventUtils";
import { getCamelCaseFrom } from "../../../utils/stringUtils";

type Props<I> = {
  input: I;
  setInput: Dispatch<SetStateAction<I>>;
  label?: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onCompleted?: () => void;
  labelKey?: keyof I;
  sx?: SxProps;
  disabled?: boolean;
};
const InputTextField = <I extends Input>({
  input,
  setInput,
  label,
  showLabel = false,
  fullWidth = false,
  required = false,
  onCompleted,
  labelKey: inLabelKey,
  sx,
  disabled = false,
}: Props<I>) => {
  const labelKey = useMemo(
    () =>
      inLabelKey !== undefined
        ? inLabelKey
        : (getCamelCaseFrom(label!) as keyof I),
    [inLabelKey, label]
  );
  const value = useMemo(() => input[labelKey], [input, labelKey]);

  const onChange = useCallback(
    ({ target: { value: newValueStr } }: ChangeEvent<HTMLInputElement>) =>
      setInput((prevInput) => {
        const newValue =
          typeof value === "number" ? Number(newValueStr) : newValueStr;
        return prevInput[labelKey] !== newValue
          ? {
              ...prevInput,
              [labelKey]: newValue,
            }
          : prevInput;
      }),
    [setInput, labelKey, value]
  );

  const onCompletedByEnterKeyDown = useCallback(
    onCompleted ? enterKeyDown(onCompleted) : () => {},
    [onCompleted]
  );

  return (
    <TextField
      inputProps={{ sx }}
      label={showLabel ? label : undefined}
      fullWidth={fullWidth}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onCompleted}
      onKeyDown={onCompletedByEnterKeyDown}
      disabled={disabled}
    />
  );
};

export default memo(InputTextField);
