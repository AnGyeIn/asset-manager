import { RemoveCircleOutline } from "@mui/icons-material";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../../../../../api";
import {
  StocksAccount,
  StocksAccountUpdate,
} from "../../../../../models/stocks";
import { centeredBoxStyleHorizontal } from "../../../../../styles/boxStyles";
import {
  getInputFieldSetter,
  isInputChanged,
} from "../../../../../utils/inputUtils";
import { getCurrencyStringFrom } from "../../../../../utils/stringUtils";
import { getColoredNumberStyle } from "../../../../../utils/styleUtils";
import { toastError, toastInfo } from "../../../../../utils/toastUtils";
import CenteredCircularProgress from "../../../../CircularProgresses/CenteredCircularProgress";
import InputTextField from "../../../../TextFields/InputTextField";
import NumberTextFieldValidOnly from "../../../../TextFields/NumberTextFieldValidOnly";

type Props = {
  stocksAccount: StocksAccount;
  stocksAccountTotalValue: number;
  totalValue: number;
  reload: () => void;
};
const StocksWeightManagingTableRow = ({
  stocksAccount: { stocksAccountId, name, cash, targetWeight },
  stocksAccountTotalValue,
  totalValue,
  reload,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<StocksAccountUpdate>({
    name: name ?? "",
    cash,
    targetWeight,
  });

  const inputStore = useRef<StocksAccountUpdate>({
    name: name ?? "",
    cash,
    targetWeight,
  });

  const { currWeight, adjustment, transferNeeded } = useMemo(() => {
    const _currWeight = (stocksAccountTotalValue / totalValue) * 100;
    const _adjustment = totalValue * ((targetWeight - _currWeight) / 100);
    return {
      currWeight: _currWeight,
      adjustment: _adjustment,
      transferNeeded: _adjustment - cash,
    };
  }, [stocksAccountTotalValue, totalValue, targetWeight, cash]);

  const updateStocksAccount = useCallback(async () => {
    if (!isInputChanged(input, inputStore)) {
      return;
    }
    setIsLoading(true);
    inputStore.current = { ...input };
    const succeeded = await api.patch.stocksAccount(stocksAccountId, input);
    setIsLoading(false);
    if (succeeded) {
      reload();
    } else {
      toastError("Failed to update stocks account.");
    }
  }, [stocksAccountId, input, reload]);

  const deleteStocksAccount = useCallback(async () => {
    setIsLoading(true);
    const succeeded = await api.delete.stocksAccount(stocksAccountId);
    setIsLoading(false);
    if (succeeded) {
      toastInfo("Succeeded to delete stocks account.");
      reload();
    }
  }, [stocksAccountId, reload]);

  const setTargetWeight = useCallback(
    getInputFieldSetter<StocksAccountUpdate, number>(setInput, "targetWeight"),
    []
  );

  return (
    <TableRow>
      <TableCell>
        {isLoading ? (
          <CenteredCircularProgress sx={{ width: "2rem", height: "1rem" }} />
        ) : (
          <Box sx={centeredBoxStyleHorizontal}>
            <RemoveCircleOutline
              color={"error"}
              onClick={deleteStocksAccount}
            />
          </Box>
        )}
      </TableCell>
      <TableCell>
        <Box sx={centeredBoxStyleHorizontal}>
          <InputTextField
            input={input}
            setInput={setInput as Dispatch<SetStateAction<any>>}
            labelKey={"name"}
            fullWidth
            onCompleted={updateStocksAccount}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(
          () => getCurrencyStringFrom(stocksAccountTotalValue),
          [stocksAccountTotalValue]
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {`${useMemo(() => currWeight.toFixed(2), [currWeight])}%`}
      </TableCell>
      <TableCell sx={centeredBoxStyleHorizontal}>
        <NumberTextFieldValidOnly
          value={input.targetWeight}
          setValue={setTargetWeight}
          min={0}
          max={100}
          onCompleted={updateStocksAccount}
          sx={{ width: "3rem", height: "1rem", textAlign: "right" }}
        />
        <Typography sx={{ margin: "0 1%" }}>%</Typography>
      </TableCell>
      <TableCell
        sx={useMemo(
          () => ({
            ...getColoredNumberStyle(adjustment),
            textAlign: "right",
          }),
          [adjustment]
        )}
      >
        {useMemo(() => getCurrencyStringFrom(adjustment), [adjustment])}
      </TableCell>
      <TableCell
        sx={useMemo(
          () => ({
            ...getColoredNumberStyle(transferNeeded),
            textAlign: "right",
          }),
          [transferNeeded]
        )}
      >
        {useMemo(() => getCurrencyStringFrom(transferNeeded), [transferNeeded])}
      </TableCell>
    </TableRow>
  );
};

export default memo(StocksWeightManagingTableRow);
