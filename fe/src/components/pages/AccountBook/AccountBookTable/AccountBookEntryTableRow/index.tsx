import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
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
import api from "../../../../../api";
import {
  AccountBookEntry,
  AccountBookEntryUpdate,
} from "../../../../../models/accountBook";
import { RootState } from "../../../../../models/store";
import { centeredBoxStyleHorizontal } from "../../../../../styles/boxStyles";
import { enterKeyDown } from "../../../../../utils/eventUtils";
import {
  getInputFieldSetter,
  getInputFieldSetterFromValueChangeEvent,
  getInputFieldSetterWithEvent,
  isInputChanged,
} from "../../../../../utils/inputUtils";
import {
  getCurrencyStringFrom,
  getDateStringFrom,
  getNormalizedString,
} from "../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../utils/toastUtils";
import { isValidNumber } from "../../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../../CircularProgresses/CenteredCircularProgress";
import NumberTextFieldValidOnly from "../../../../TextFields/NumberTextFieldValidOnly";

type Props = {
  isFirst?: boolean;
  accountBookEntry: AccountBookEntry;
  accumulation: number;
  reload: () => void;
};
const AccountBookEntryTableRow = ({
  isFirst = false,
  accountBookEntry: {
    accountBookEntryId,
    year,
    month,
    date,
    amount,
    title,
    description,
  },
  accumulation,
  reload,
}: Props) => {
  const { titles, descriptions } = useSelector(
    (state: RootState) => state.titlesDescriptions
  );

  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<AccountBookEntryUpdate>({
    date,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const inputStore = useRef<AccountBookEntryUpdate>({
    date,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const { amountPositive, amountNegative } = useMemo(
    () => ({
      amountPositive: input.amount > 0 ? input.amount : NaN,
      amountNegative: input.amount < 0 ? -input.amount : NaN,
    }),
    [input.amount]
  );

  const isPast = useMemo(() => {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth() + 1;
    const currDate = today.getDate();
    return (
      year < currYear ||
      (year === currYear &&
        (month < currMonth || (month === currMonth && date <= currDate)))
    );
  }, [year, month, date]);

  const insertAccountBookEntry = useCallback(async () => {
    setIsLoading(true);
    const yearMonthDate = {
      year,
      month,
      date,
    };
    const newAccountBookEntryId = await api.post.accountBookEntry(
      yearMonthDate
    );
    setIsLoading(false);
    if (isValidNumber(newAccountBookEntryId)) {
      toastInfo(
        `Succeeded to insert new account book entry on ${getDateStringFrom(
          yearMonthDate
        )}.`
      );
      reload();
    } else {
      toastError("Failed to insert new account book entry.");
    }
  }, [year, month, date, reload]);

  const deleteAccountBookEntry = useCallback(async () => {
    setIsLoading(true);
    const succeeded = await api.delete.accountBookEntry(accountBookEntryId);
    setIsLoading(false);
    if (succeeded) {
      toastInfo(
        `Succeeded to delete account book entry on ${getDateStringFrom({
          year,
          month,
          date,
        })}.`
      );
      reload();
    } else {
      toastError("Failed to delete account book entry.");
    }
  }, [accountBookEntryId, year, month, date, reload]);

  const setDate = useCallback(
    getInputFieldSetter<AccountBookEntryUpdate, number>(setInput, "date"),
    []
  );

  const setAmount = useCallback(
    getInputFieldSetter<AccountBookEntryUpdate, number>(setInput, "amount"),
    []
  );

  const setAmountPositive = useCallback(
    (newValue: number) => setAmount(Math.abs(newValue)),
    [setAmount]
  );

  const setAmountNegative = useCallback(
    (newValue: number) => setAmount(-Math.abs(newValue)),
    [setAmount]
  );

  const selectTitle = useCallback(
    getInputFieldSetterWithEvent<
      AccountBookEntryUpdate,
      string,
      SyntheticEvent
    >(setInput, "title"),
    []
  );

  const typeTitle = useCallback(
    getInputFieldSetterFromValueChangeEvent<AccountBookEntryUpdate>(
      setInput,
      "title"
    ),
    []
  );

  const selectDescription = useCallback(
    getInputFieldSetterWithEvent<
      AccountBookEntryUpdate,
      string,
      SyntheticEvent
    >(setInput, "description"),
    []
  );

  const typeDescription = useCallback(
    getInputFieldSetterFromValueChangeEvent<AccountBookEntryUpdate>(
      setInput,
      "description"
    ),
    []
  );

  const updateAccountBookEntry = useCallback(async () => {
    if (!isInputChanged(input, inputStore)) {
      return;
    }
    setIsLoading(true);
    inputStore.current = { ...input };
    const succeeded = await api.patch.accountBookEntry(
      accountBookEntryId,
      input
    );
    setIsLoading(false);
    if (succeeded) {
      reload();
    } else {
      toastError(
        `Failed to update account book entry on ${getDateStringFrom({
          year,
          month,
          date,
        })}.`
      );
    }
  }, [accountBookEntryId, input, reload, year, month, date]);

  const updateOrInsertAccountBookEntryByEnterKeyDown = useCallback(
    enterKeyDown(updateAccountBookEntry, insertAccountBookEntry),
    [updateAccountBookEntry, insertAccountBookEntry]
  );

  return (
    <TableRow sx={{ backgroundColor: isPast ? "lightgray" : "white" }}>
      <TableCell>
        {isLoading ? (
          <CenteredCircularProgress sx={{ height: "1rem" }} />
        ) : (
          <Box sx={centeredBoxStyleHorizontal}>
            <AddCircleOutline
              color={"success"}
              onClick={insertAccountBookEntry}
            />
            {!isFirst && (
              <RemoveCircleOutline
                color={"error"}
                onClick={deleteAccountBookEntry}
              />
            )}
          </Box>
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <NumberTextFieldValidOnly
          fullWidth
          value={input.date}
          setValue={setDate}
          min={1}
          max={31}
          onCompleted={updateAccountBookEntry}
          sx={{ height: "1rem", textAlign: "center" }}
          disabled={isFirst}
        />
      </TableCell>
      <TableCell sx={{ color: "red", textAlign: "right" }}>
        <NumberTextFieldValidOnly
          fullWidth
          value={amountPositive}
          setValue={setAmountPositive}
          onCompleted={updateAccountBookEntry}
          formatter={getCurrencyStringFrom}
          sx={{ height: "1rem", color: "red", textAlign: "right" }}
          disabled={isFirst}
        />
      </TableCell>
      <TableCell sx={{ color: "blue", textAlign: "right" }}>
        <NumberTextFieldValidOnly
          fullWidth
          value={amountNegative}
          setValue={setAmountNegative}
          onCompleted={updateAccountBookEntry}
          formatter={getCurrencyStringFrom}
          sx={{ height: "1rem", color: "blue", textAlign: "right" }}
          disabled={isFirst}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(accumulation), [accumulation])}
      </TableCell>
      <TableCell>
        <Autocomplete
          fullWidth
          options={titles}
          getOptionLabel={getNormalizedString}
          value={input.title}
          onChange={selectTitle}
          onBlur={updateAccountBookEntry}
          onKeyDown={updateOrInsertAccountBookEntryByEnterKeyDown}
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
          disabled={isFirst}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          fullWidth
          options={descriptions}
          getOptionLabel={getNormalizedString}
          value={input.description}
          onChange={selectDescription}
          onBlur={updateAccountBookEntry}
          onKeyDown={updateOrInsertAccountBookEntryByEnterKeyDown}
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
          disabled={isFirst}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(AccountBookEntryTableRow);
