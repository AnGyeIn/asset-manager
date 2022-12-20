import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, TableCell, TableRow, TextField } from "@mui/material";
import { memo, useCallback, useState } from "react";
import api from "../../../../../api";
import { AccountBookEntry } from "../../../../../models/accountBook";
import { AccountBookEntryRowInput } from "../../../../../models/input";
import { horizontalCenteredBoxStyle } from "../../../../../styles/boxStyles";
import {
  getCurrencyStringFrom,
  getDateStringFrom,
} from "../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../utils/toastUtils";
import CenteredCircularProgress from "../../../../CircularProgresses/CenteredCircularProgress";
import TextFieldOfInput from "../../../../TextFields/TextFieldOfInput";

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
    if (newAccountBookEntryId >= 0) {
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
        <TextField />
      </TableCell>
      <TableCell sx={{ color: "red", textAlign: "right" }}>
        {amount > 0 ? getCurrencyStringFrom(amount) : ""}
      </TableCell>
      <TableCell sx={{ color: "blue", textAlign: "right" }}>
        {amount < 0 ? getCurrencyStringFrom(-amount) : ""}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {getCurrencyStringFrom(accumulation)}
      </TableCell>
      <TableCell>
        <TextFieldOfInput
          input={input}
          setInput={setInput}
          label={"title"}
          // onCompleted={}
        />
      </TableCell>
      <TableCell>
        <TextFieldOfInput
          input={input}
          setInput={setInput}
          label={"descripiton"}
          // onCompleted={}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(AccountBookEntryTableRow);
