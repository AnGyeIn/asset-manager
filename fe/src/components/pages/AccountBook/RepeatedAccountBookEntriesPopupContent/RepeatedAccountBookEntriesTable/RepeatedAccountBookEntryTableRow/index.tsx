import { RemoveCircleOutline } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import {
  Dispatch,
  memo,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../../../../../../api";
import { DayOfWeek, daysOfWeek } from "../../../../../../models/calendar";
import {
  RepeatedAccountBookEntry,
  RepeatedAccountBookEntryUpdate,
} from "../../../../../../models/repeatedAccountBookEntry";
import { centeredBoxStyleHorizontal } from "../../../../../../styles/boxStyles";
import { enterKeyDown } from "../../../../../../utils/eventUtils";
import { isInputChanged } from "../../../../../../utils/inputUtils";
import { getCurrencyStringFrom } from "../../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../../utils/toastUtils";
import { isValidNumber } from "../../../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../../../CircularProgresses/CenteredCircularProgress";
import InputTextField from "../../../../../TextFields/InputTextField";
import IntegerTextFieldValidOnly from "../../../../../TextFields/IntegerTextFieldValidOnly";

type Props = {
  repeatedAccountBookEntry: RepeatedAccountBookEntry;
  reload: () => void;
};
const RepeatedAccountBookEntryTableRow = ({
  repeatedAccountBookEntry: {
    repeatedAccountBookEntryId,
    date,
    dayOfWeek,
    amount,
    title,
    description,
  },
  reload,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<RepeatedAccountBookEntryUpdate>({
    date,
    dayOfWeek,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const inputStore = useRef<RepeatedAccountBookEntryUpdate>({
    date,
    dayOfWeek,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const isNew = useMemo(
    () => !isValidNumber(repeatedAccountBookEntryId),
    [repeatedAccountBookEntryId]
  );

  const isInvalid = useMemo(
    () => !isValidNumber(input.date) && input.dayOfWeek === undefined,
    [input.date, input.dayOfWeek]
  );

  const updateRepeatedAccountBookEntry = useCallback(async () => {
    if (!isInputChanged(input, inputStore)) {
      return;
    }
    setIsLoading(true);
    inputStore.current = { ...input };
    const succeeded = await api.patch.repeatedAccountBookEntry(
      repeatedAccountBookEntryId,
      input
    );
    setIsLoading(false);
    if (succeeded) {
      reload();
    } else {
      toastError(
        `Failed to update repeated account book entry on every ${
          input.dayOfWeek ?? input.date
        }.`
      );
    }
  }, [repeatedAccountBookEntryId, input, reload]);

  const createRepeatedAccountBookEntry = useCallback(async () => {
    setIsLoading(true);
    const newRepeatedAccountBookEntryId =
      await api.post.repeatedAccountBookEntry(input);
    setIsLoading(false);
    if (isValidNumber(newRepeatedAccountBookEntryId)) {
      toastInfo(
        `Succeeded to register new repeated account book entry on every ${
          input.dayOfWeek ?? input.date
        }.`
      );
      reload();
    } else {
      toastError("Failed to register new repeated account book entry.");
    }
  }, [input, reload]);

  const saveRepeatedAccountBookEntry = useCallback(() => {
    if (isInvalid) {
      return;
    }
    if (isNew) {
      createRepeatedAccountBookEntry();
    } else {
      updateRepeatedAccountBookEntry();
    }
  }, [
    isInvalid,
    isNew,
    updateRepeatedAccountBookEntry,
    createRepeatedAccountBookEntry,
  ]);

  const saveRepeatedAccountBookEntryByEnterKeyDown = useCallback(
    enterKeyDown(saveRepeatedAccountBookEntry),
    [saveRepeatedAccountBookEntry]
  );

  const deleteRepeatedAccountBookEntry = useCallback(async () => {
    setIsLoading(true);
    const succeeded = await api.delete.repeatedAccountBookEntry(
      repeatedAccountBookEntryId
    );
    setIsLoading(false);
    if (succeeded) {
      toastInfo(
        `Succeded to unregister repeated account book entry on every ${
          date ?? dayOfWeek
        }.`
      );
      reload();
    }
  }, [repeatedAccountBookEntryId, date, dayOfWeek, reload]);

  const setDate = useCallback(
    (newDate: number) =>
      setInput((prevInput) => ({
        ...prevInput,
        date: newDate,
        dayOfWeek: undefined,
      })),
    []
  );

  const setDayOfWeek = useCallback(
    (_: SyntheticEvent, newDayOfWeek: DayOfWeek | null) =>
      setInput((prevInput) =>
        newDayOfWeek === null
          ? {
              ...prevInput,
              dayOfWeek: undefined,
            }
          : {
              ...prevInput,
              date: NaN,
              dayOfWeek: newDayOfWeek,
            }
      ),
    []
  );

  const setAmount = useCallback(
    (newAmount: number) =>
      setInput((prevInput) => ({ ...prevInput, amount: newAmount })),
    []
  );

  return (
    <TableRow>
      <TableCell>
        {!isNew &&
          (isLoading ? (
            <CenteredCircularProgress sx={{ width: "2rem", height: "1rem" }} />
          ) : (
            <Box sx={centeredBoxStyleHorizontal}>
              <RemoveCircleOutline
                color={"error"}
                onClick={deleteRepeatedAccountBookEntry}
              />
            </Box>
          ))}
      </TableCell>
      <TableCell>
        <Box sx={centeredBoxStyleHorizontal}>
          <IntegerTextFieldValidOnly
            value={input.date ?? NaN}
            setValue={setDate}
            min={1}
            max={31}
            onCompleted={saveRepeatedAccountBookEntry}
            label={"Date"}
            sx={{
              width: "2rem",
              height: "1rem",
              textAlign: "center",
            }}
            error={isInvalid}
          />
          <Autocomplete
            options={daysOfWeek}
            value={input.dayOfWeek}
            onChange={setDayOfWeek}
            sx={{ margin: "0 1%", width: "12rem" }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  sx: {
                    height: "1rem",
                  },
                }}
                onBlur={saveRepeatedAccountBookEntry}
                onKeyDown={saveRepeatedAccountBookEntryByEnterKeyDown}
                label={"Day of Week"}
                error={isInvalid}
              />
            )}
          />
        </Box>
      </TableCell>
      <TableCell>
        <IntegerTextFieldValidOnly
          fullWidth
          value={input.amount}
          setValue={setAmount}
          onCompleted={saveRepeatedAccountBookEntry}
          formatter={getCurrencyStringFrom}
          sx={{
            height: "1rem",
            color: input.amount < 0 ? "blue" : "red",
            textAlign: "right",
          }}
        />
      </TableCell>
      <TableCell>
        <InputTextField
          fullWidth
          input={input}
          setInput={setInput as Dispatch<unknown>}
          label={"title"}
          onCompleted={saveRepeatedAccountBookEntry}
          sx={{ height: "1rem" }}
        />
      </TableCell>
      <TableCell>
        <InputTextField
          fullWidth
          input={input}
          setInput={setInput as Dispatch<unknown>}
          label={"description"}
          onCompleted={saveRepeatedAccountBookEntry}
          sx={{ height: "1rem" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(RepeatedAccountBookEntryTableRow);
