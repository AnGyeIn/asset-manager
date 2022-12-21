import { TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { AnyInput } from "../../../models/input";
import { enterKeyDown } from "../../../utils/eventUtils";
import { getCamelCaseFrom } from "../../../utils/stringUtils";

interface Props<I> {
  input: I;
  setInput: Dispatch<SetStateAction<I>>;
  label?: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onCompleted?: () => void;
  labelKey?: string;
}
const TextFieldOfInput = ({
  input,
  setInput,
  label,
  showLabel = false,
  fullWidth = false,
  required = false,
  onCompleted,
  labelKey: inLabelKey,
}: Props<AnyInput>) => {
  const labelKey = useMemo(
    () => (inLabelKey !== undefined ? inLabelKey : getCamelCaseFrom(label!)),
    [inLabelKey, label]
  );
  const value = useMemo(() => input[labelKey], [input[labelKey]]);

  const onChange = useCallback(
    ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement>) =>
      setInput((prevInput) => ({
        ...prevInput,
        [labelKey]: typeof value === "number" ? Number(newValue) : newValue,
      })),
    [labelKey, value]
  );

  const onCompletedByEnterKeyDown = useCallback(
    onCompleted ? enterKeyDown(onCompleted) : () => {},
    [onCompleted]
  );

  return (
    <TextField
      label={showLabel ? label : undefined}
      fullWidth={fullWidth}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onCompleted}
      onKeyDown={onCompletedByEnterKeyDown}
    />
  );
};

export default memo(TextFieldOfInput);
