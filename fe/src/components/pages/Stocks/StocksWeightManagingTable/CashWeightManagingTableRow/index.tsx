import { TableCell, TableRow } from "@mui/material";
import { memo, useMemo } from "react";
import { centeredBoxStyleHorizontal } from "../../../../../styles/boxStyles";
import { getCurrencyStringFrom } from "../../../../../utils/stringUtils";
import { getColoredNumberStyle } from "../../../../../utils/styleUtils";

type Props = {
  totalCash: number;
  totalStocksCash: number;
  totalValue: number;
  targetWeight: number;
};
const CashWeightManagingTableRow = ({
  totalCash,
  totalStocksCash,
  totalValue,
  targetWeight,
}: Props) => {
  const currWeight = useMemo(
    () => (totalCash / totalValue) * 100,
    [totalCash, totalValue]
  );

  const adjustment = useMemo(
    () => totalValue * ((targetWeight - currWeight) / 100),
    [totalValue, targetWeight, currWeight]
  );

  const transferNeeded = useMemo(
    () => adjustment + totalStocksCash,
    [adjustment, totalStocksCash]
  );

  return (
    <TableRow>
      <TableCell />
      <TableCell sx={centeredBoxStyleHorizontal}>현금</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(totalCash), [totalCash])}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {`${useMemo(() => currWeight.toFixed(2), [currWeight])}%`}
      </TableCell>
      <TableCell sx={centeredBoxStyleHorizontal}>
        {`${useMemo(() => targetWeight.toFixed(2), [targetWeight])}%`}
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
        {useMemo(
          () => getCurrencyStringFrom(Math.round(adjustment)),
          [adjustment]
        )}
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
        {useMemo(
          () => getCurrencyStringFrom(Math.round(transferNeeded)),
          [transferNeeded]
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(CashWeightManagingTableRow);
