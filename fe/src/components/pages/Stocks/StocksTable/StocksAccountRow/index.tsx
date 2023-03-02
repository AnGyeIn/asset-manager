import { TableCell, TableRow } from "@mui/material";
import { memo, useMemo } from "react";
import { StocksAccount, StocksLiveInfo } from "../../../../../models/stocks";
import { getCurrencyStringFrom } from "../../../../../utils/stringUtils";

type Props = {
  stocksAccount: StocksAccount;
};
const StocksAccountRow = ({
  stocksAccount: { name, cash, stocksList },
}: Props) => {
  return (
    <TableRow>
      <TableCell
        rowSpan={useMemo(() => stocksList.length + 1, [stocksList])}
        sx={{ textAlign: "center" }}
      >
        {name}
      </TableCell>
      <TableCell />
      <TableCell>예수금</TableCell>
      <TableCell colSpan={7} />
      <TableCell sx={{ textAlign: "right" }}>
        {/* TODO: TextField */}
        {useMemo(() => getCurrencyStringFrom(cash), [cash])}
      </TableCell>
      <TableCell colSpan={5} />
    </TableRow>
  );
};

export default memo(StocksAccountRow);
