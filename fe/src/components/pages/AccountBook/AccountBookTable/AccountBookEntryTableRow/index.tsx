import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, TableCell, TableRow } from "@mui/material";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import api from "../../../../../api";
import { AccountBookEntry } from "../../../../../models/accountBook";
import { AccountBookEntryRowInput } from "../../../../../models/input";
import { horizontalCenteredBoxStyle } from "../../../../../styles/boxStyles";
import { isInputChanged } from "../../../../../utils/inputUtils";
import {
  getCurrencyStringFrom,
  getDateStringFrom,
} from "../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../utils/toastUtils";
import { isValidNumber } from "../../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../../CircularProgresses/CenteredCircularProgress";
import TextFieldOfInput from "../../../../TextFields/TextFieldOfInput";
import TextFieldOfIntegerValidOnly from "../../../../TextFields/TextFieldOfIntegerValidOnly";

interface Props {
  isFirst: boolean;
  accountBookEntry: AccountBookEntry;
  accumulation: number;
  reload: () => void;
}
const AccountBookEntryTableRow = ({
  isFirst,
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
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<AccountBookEntryRowInput>({
    date,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const inputStore = useRef({
    date,
    amount,
    title: title ?? "",
    description: description ?? "",
  });

  const { amountPositiveStr, amountNegativeStr } = useMemo(
    () => ({
      amountPositiveStr: getCurrencyStringFrom(amount > 0 ? amount : NaN),
      amountNegativeStr: getCurrencyStringFrom(amount < 0 ? -amount : NaN),
    }),
    [amount]
  );

  const { amountPositive, amountNegative } = useMemo(
    () => ({
      amountPositive: input.amount > 0 ? input.amount : NaN,
      amountNegative: input.amount < 0 ? -input.amount : NaN,
    }),
    [input.amount]
  );

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
    (newDate: number) =>
      setInput((prevInput) => ({ ...prevInput, date: newDate })),
    []
  );

  const setAmount = useCallback(
    (newAmount: number) =>
      setInput((prevInput) => ({ ...prevInput, amount: newAmount })),
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

  return (
    <TableRow>
      <TableCell>
        {isLoading ? (
          <CenteredCircularProgress sx={{ height: "1.5rem" }} />
        ) : (
          <Box sx={horizontalCenteredBoxStyle}>
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
        {isFirst ? (
          date
        ) : (
          <TextFieldOfIntegerValidOnly
            fullWidth
            value={input.date}
            setValue={setDate}
            min={1}
            max={31}
            onCompleted={updateAccountBookEntry}
            sx={{ textAlign: "center" }}
          />
        )}
      </TableCell>
      <TableCell sx={{ color: "red", textAlign: "right" }}>
        {isFirst ? (
          amountPositiveStr
        ) : (
          <TextFieldOfIntegerValidOnly
            fullWidth
            value={amountPositive}
            setValue={setAmountPositive}
            onCompleted={updateAccountBookEntry}
            formatter={getCurrencyStringFrom}
            sx={{ color: "red", textAlign: "right" }}
          />
        )}
      </TableCell>
      <TableCell sx={{ color: "blue", textAlign: "right" }}>
        {isFirst ? (
          amountNegativeStr
        ) : (
          <TextFieldOfIntegerValidOnly
            fullWidth
            value={amountNegative}
            setValue={setAmountNegative}
            onCompleted={updateAccountBookEntry}
            formatter={getCurrencyStringFrom}
            sx={{ color: "blue", textAlign: "right" }}
          />
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(accumulation), [accumulation])}
      </TableCell>
      <TableCell>
        {isFirst ? (
          title
        ) : (
          <TextFieldOfInput
            fullWidth
            input={input}
            setInput={setInput}
            label={"title"}
            onCompleted={updateAccountBookEntry}
          />
        )}
      </TableCell>
      <TableCell>
        {isFirst ? (
          description
        ) : (
          <TextFieldOfInput
            fullWidth
            input={input}
            setInput={setInput}
            label={"descripiton"}
            onCompleted={updateAccountBookEntry}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(AccountBookEntryTableRow);
