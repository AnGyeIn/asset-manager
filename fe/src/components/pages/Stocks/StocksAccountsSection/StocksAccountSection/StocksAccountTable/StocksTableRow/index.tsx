import { TableCell, TableRow } from "@mui/material";
import { memo, useMemo } from "react";
import { Stocks, StocksLiveInfo } from "../../../../../../../models/stocks";
import { getCurrencyStringFrom } from "../../../../../../../utils/stringUtils";
import { getColoredBackgroundByNumberStyle, getColoredNumberStyle } from "../../../../../../../utils/styleUtils";
import {
  safeDivision,
  zeroIfInvalidNumber,
} from "../../../../../../../utils/validationUtils";

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
  const { benefit, benefitRate, totalCost, meanCost } = useMemo(() => {
    const _totalCost =
      zeroIfInvalidNumber(floatingStocksNum) *
        zeroIfInvalidNumber(floatingCostPerStocks) +
      zeroIfInvalidNumber(cost);
    const _benefit = value - _totalCost;
    return {
      benefit: _benefit,
      benefitRate: safeDivision(_benefit, _totalCost) * 100,
      totalCost: _totalCost,
      meanCost: safeDivision(
        _totalCost,
        zeroIfInvalidNumber(floatingStocksNum) + zeroIfInvalidNumber(stocksNum)
      ),
    };
  }, [floatingStocksNum, floatingCostPerStocks, cost, value, stocksNum]);

  const weight = useMemo(
    () => safeDivision(value, stocksAccountTotalValue),
    [value, stocksAccountTotalValue]
  );

  const adjustment = useMemo(() => targetValue - value, [targetValue, value]);

  return (
    <TableRow
      sx={useMemo(() => getColoredBackgroundByNumberStyle(benefit), [benefit])}
    >
      <TableCell sx={{ textAlign: "center" }}>{code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(benefit), [benefit])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => `${benefitRate.toFixed(2)}%`, [benefitRate])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* TODO: TextField */}
        {useMemo(
          () => zeroIfInvalidNumber(floatingStocksNum),
          [floatingStocksNum]
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* TODO: TextField */}
        {useMemo(
          () =>
            getCurrencyStringFrom(zeroIfInvalidNumber(floatingCostPerStocks)),
          [floatingCostPerStocks]
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* TODO: TextField */}
        {useMemo(() => zeroIfInvalidNumber(stocksNum), [stocksNum])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* TODO: TextField */}
        {useMemo(
          () => getCurrencyStringFrom(zeroIfInvalidNumber(cost)),
          [cost]
        )}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(totalCost), [totalCost])}
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
        {/* TODO: Checkbox */}
        {isBeingManaged}
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
