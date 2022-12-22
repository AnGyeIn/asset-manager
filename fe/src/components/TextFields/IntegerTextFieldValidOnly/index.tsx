import { SxProps, TextField } from "@mui/material";
import { ChangeEvent, memo, useCallback, useMemo } from "react";
import { enterKeyDown } from "../../../utils/eventUtils";
import { isValidNumber } from "../../../utils/validationUtils";

type Props = {
  value: number;
  setValue: (newValue: number) => void;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  onCompleted?: () => void;
  min?: number;
  max?: number;
  formatter?: (value: number) => string;
  sx?: SxProps;
  disabled?: boolean;
  error?: boolean;
};
const IntegerTextFieldValidOnly = ({
  value,
  setValue,
  label,
  fullWidth = false,
  required = false,
  onCompleted,
  min,
  max,
  formatter,
  sx,
  disabled = false,
  error = false,
}: Props) => {
  const valueStr = useMemo(
    () =>
      formatter
        ? formatter(value)
        : isValidNumber(value)
        ? value.toString()
        : "",
    [value, formatter]
  );

  const onChange = useCallback(
    ({ target: { value: newValueStr } }: ChangeEvent<HTMLInputElement>) => {
      let newValue = Math.floor(Number(newValueStr.replaceAll(",", "")));
      if (isValidNumber(newValue)) {
        if (isValidNumber(min)) {
          newValue = Math.max(newValue, min!);
        }
        if (isValidNumber(max)) {
          newValue = Math.min(newValue, max!);
        }
        setValue(newValue);
      }
    },
    [setValue, min, max]
  );

  const onCompletedByEnterKeyDown = useCallback(
    onCompleted ? enterKeyDown(onCompleted) : () => {},
    [onCompleted]
  );

  return (
    <TextField
      inputProps={{
        sx,
      }}
      label={label}
      fullWidth={fullWidth}
      required={required}
      value={valueStr}
      onChange={onChange}
      onBlur={onCompleted}
      onKeyDown={onCompletedByEnterKeyDown}
      disabled={disabled}
      error={error}
    />
  );
};

export default memo(IntegerTextFieldValidOnly);
