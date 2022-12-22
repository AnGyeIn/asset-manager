import { RemoveCircleOutline } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import {
  memo,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import api from "../../../../../../api";
import { DayOfWeek, daysOfWeek } from "../../../../../../models/calendar";
import {
  RepeatedAccountBookEntry,
  RepeatedAccountBookEntryUpdate,
} from "../../../../../../models/repeatedAccountBookEntry";
import { RootState } from "../../../../../../models/store";
import { centeredBoxStyleHorizontal } from "../../../../../../styles/boxStyles";
import { enterKeyDown } from "../../../../../../utils/eventUtils";
import {
  getInputFieldSetter,
  getInputFieldSetterFromChangeEvent,
  getInputFieldSetterWithEvent,
  isInputChanged,
} from "../../../../../../utils/inputUtils";
import { getCurrencyStringFrom, getNormalizedString } from "../../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../../utils/toastUtils";
import { isValidNumber } from "../../../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../../../CircularProgresses/CenteredCircularProgress";
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
  const { titles, descriptions } = useSelector(
    (state: RootState) => state.titlesDescriptions
  );

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
    getInputFieldSetter<RepeatedAccountBookEntryUpdate, number>(
      setInput,
      "date",
      () => ({ dayOfWeek: undefined })
    ),
    []
  );

  const setDayOfWeek = useCallback(
    getInputFieldSetterWithEvent<
      RepeatedAccountBookEntryUpdate,
      DayOfWeek,
      SyntheticEvent
    >(setInput, "dayOfWeek", (newDayOfWeek) =>
      newDayOfWeek
        ? {
            date: NaN,
            dayOfWeek: newDayOfWeek,
          }
        : {
            dayOfWeek: undefined,
          }
    ),
    []
  );

  const setAmount = useCallback(
    getInputFieldSetter<RepeatedAccountBookEntryUpdate, number>(
      setInput,
      "amount"
    ),
    []
  );

  const selectTitle = useCallback(
    getInputFieldSetterWithEvent<
      RepeatedAccountBookEntryUpdate,
      string,
      SyntheticEvent
    >(setInput, "title"),
    []
  );

  const typeTitle = useCallback(
    getInputFieldSetterFromChangeEvent<RepeatedAccountBookEntryUpdate>(
      setInput,
      "title"
    ),
    []
  );

  const selectDescription = useCallback(
    getInputFieldSetterWithEvent<
      RepeatedAccountBookEntryUpdate,
      string,
      SyntheticEvent
    >(setInput, "description"),
    []
  );

  const typeDescription = useCallback(
    getInputFieldSetterFromChangeEvent<RepeatedAccountBookEntryUpdate>(
      setInput,
      "description"
    ),
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
        <Autocomplete
          fullWidth
          options={titles}
          getOptionLabel={getNormalizedString}
          value={input.title}
          onChange={selectTitle}
          onBlur={saveRepeatedAccountBookEntry}
          onKeyDown={saveRepeatedAccountBookEntryByEnterKeyDown}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                sx: {
                  height: "1rem",
                },
              }}
              onChange={typeTitle}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          fullWidth
          options={descriptions}
          getOptionLabel={getNormalizedString}
          value={input.description}
          onChange={selectDescription}
          onBlur={saveRepeatedAccountBookEntry}
          onKeyDown={saveRepeatedAccountBookEntryByEnterKeyDown}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                sx: {
                  height: "1rem",
                },
              }}
              onChange={typeDescription}
            />
          )}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(RepeatedAccountBookEntryTableRow);
