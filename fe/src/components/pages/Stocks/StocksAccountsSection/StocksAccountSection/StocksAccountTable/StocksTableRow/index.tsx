import { RemoveCircleOutline } from "@mui/icons-material";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import api from "../../../../../../../api";
import {
  Stocks,
  StocksLiveInfo,
  StocksUpdate,
} from "../../../../../../../models/stocks";
import { centeredBoxStyleHorizontal } from "../../../../../../../styles/boxStyles";
import {
  getInputFieldSetter,
  getInputFieldSetterFromCheckedChangeEvent,
  isInputChanged,
} from "../../../../../../../utils/inputUtils";
import { getCurrencyStringFrom } from "../../../../../../../utils/stringUtils";
import {
  getColoredBackgroundByNumberStyle,
  getColoredNumberStyle,
} from "../../../../../../../utils/styleUtils";
import { toastError, toastInfo } from "../../../../../../../utils/toastUtils";
import { safeDivision } from "../../../../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../../../../CircularProgresses/CenteredCircularProgress";
import NumberTextFieldValidOnly from "../../../../../../TextFields/NumberTextFieldValidOnly";

type Props = {
  stocks: Stocks;
  stocksLiveInfo: StocksLiveInfo;
  stocksAccountTotalValue: number;
  targetValue: number;
  reload: () => void;
};
const StocksTableRow = ({
  stocks: {
    code,
    floatingStocksNum,
    floatingCostPerStocks,
    stocksNum,
    cost,
    isBeingManaged,
  },
  stocksLiveInfo: { name, value, price },
  stocksAccountTotalValue,
  targetValue,
  reload,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState<StocksUpdate>({
    floatingStocksNum,
    floatingCostPerStocks,
    stocksNum,
    cost,
    isBeingManaged,
  });

  const inputStore = useRef<StocksUpdate>({
    floatingStocksNum,
    floatingCostPerStocks,
    stocksNum,
    cost,
    isBeingManaged,
  });

  const { benefit, benefitRate, totalCost, meanCost } = useMemo(() => {
    const _totalCost = floatingStocksNum * floatingCostPerStocks + cost;
    const _benefit = value - _totalCost;
    return {
      benefit: _benefit,
      benefitRate: safeDivision(_benefit, _totalCost) * 100,
      totalCost: _totalCost,
      meanCost: safeDivision(_totalCost, floatingStocksNum + stocksNum),
    };
  }, [floatingStocksNum, floatingCostPerStocks, cost, value, stocksNum]);

  const weight = useMemo(
    () => safeDivision(value, stocksAccountTotalValue) * 100,
    [value, stocksAccountTotalValue]
  );

  const adjustment = useMemo(() => targetValue - value, [targetValue, value]);

  const updateStocks = useCallback(async () => {
    if (!isInputChanged(input, inputStore)) {
      return;
    }
    setIsLoading(true);
    inputStore.current = { ...input };
    const succeeded = await api.patch.stocks(code, input);
    setIsLoading(false);
    if (succeeded) {
      reload();
    } else {
      toastError(`Failed to update stocks ${name}.`);
    }
  }, [input, code, reload, name]);

  const deleteStocks = useCallback(async () => {
    setIsLoading(true);
    const succeeded = await api.delete.stocks(code);
    setIsLoading(false);
    if (succeeded) {
      toastInfo(`Succeeded to delete stocks ${name}.`);
      reload();
    } else {
      toastError(`Failed to delete stocks ${name}.`);
    }
  }, [code, name, reload]);

  const setFloatingStocksNum = useCallback(
    getInputFieldSetter<StocksUpdate, number>(setInput, "floatingStocksNum"),
    []
  );

  const setFloatingCostPerStocks = useCallback(
    getInputFieldSetter<StocksUpdate, number>(
      setInput,
      "floatingCostPerStocks"
    ),
    []
  );

  const setStocksNum = useCallback(
    getInputFieldSetter<StocksUpdate, number>(setInput, "stocksNum"),
    []
  );

  const setCost = useCallback(
    getInputFieldSetter<StocksUpdate, number>(setInput, "cost"),
    []
  );

  const setIsBeingManaged = useCallback(
    getInputFieldSetterFromCheckedChangeEvent<StocksUpdate>(
      setInput,
      "isBeingManaged"
    ),
    []
  );

  useEffect(() => {
    updateStocks();
  }, [input.isBeingManaged, updateStocks]);

  return (
    <TableRow
      sx={useMemo(() => getColoredBackgroundByNumberStyle(benefit), [benefit])}
    >
      <TableCell>
        {isLoading ? (
          <CenteredCircularProgress sx={{ width: "2rem", height: "1rem" }} />
        ) : (
          <Box sx={centeredBoxStyleHorizontal}>
            <RemoveCircleOutline color={"error"} onClick={deleteStocks} />
          </Box>
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>{code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(benefit), [benefit])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => `${benefitRate.toFixed(2)}%`, [benefitRate])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        <Box sx={centeredBoxStyleHorizontal}>
          <NumberTextFieldValidOnly
            value={input.floatingStocksNum}
            setValue={setFloatingStocksNum}
            min={0}
            onCompleted={updateStocks}
            sx={{ height: "1rem", textAlign: "right" }}
            isInteger={false}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        <Box sx={centeredBoxStyleHorizontal}>
          <NumberTextFieldValidOnly
            value={input.floatingCostPerStocks}
            setValue={setFloatingCostPerStocks}
            min={0}
            formatter={getCurrencyStringFrom}
            onCompleted={updateStocks}
            sx={{ height: "1rem", textAlign: "right" }}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        <Box sx={centeredBoxStyleHorizontal}>
          <NumberTextFieldValidOnly
            value={input.stocksNum}
            setValue={setStocksNum}
            min={0}
            onCompleted={updateStocks}
            sx={{ height: "1rem", textAlign: "right" }}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        <Box sx={centeredBoxStyleHorizontal}>
          <NumberTextFieldValidOnly
            value={input.cost}
            setValue={setCost}
            min={0}
            formatter={getCurrencyStringFrom}
            onCompleted={updateStocks}
            sx={{ height: "1rem", textAlign: "right" }}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(totalCost), [totalCost])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(value), [value])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(meanCost), [meanCost])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(price), [price])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => `${weight.toFixed(2)}%`, [weight])}
      </TableCell>
      <TableCell>
        <Checkbox
          color={"default"}
          checked={input.isBeingManaged}
          onChange={setIsBeingManaged}
        />
      </TableCell>
      <TableCell
        sx={useMemo(
          () => ({ ...getColoredNumberStyle(adjustment), textAlign: "right" }),
          [adjustment]
        )}
      >
        {useMemo(() => getCurrencyStringFrom(adjustment), [adjustment])}
      </TableCell>
    </TableRow>
  );
};

export default memo(StocksTableRow);
