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

interface Props<I> {
  input: I;
  setInput: Dispatch<SetStateAction<I>>;
  label: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onCompleted?: () => void;
}
const TextFieldOfInput = ({
  input,
  setInput,
  label,
  showLabel = false,
  fullWidth = false,
  required = false,
  onCompleted,
}: Props<AnyInput>) => {
  const value = useMemo(() => input[label], [input, label]);

  const onChange = useCallback(
    ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement>) =>
      setInput((prevInput) => ({
        ...prevInput,
        [label]: typeof value === "number" ? Number(newValue) : newValue,
      })),
    [value]
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
