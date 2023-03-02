import { TableCell, TableRow } from "@mui/material";
import { memo, useMemo } from "react";
import { getCurrencyStringFrom } from "../../../../../../../utils/stringUtils";

type Props = {
  stocksAccountId: number;
  cash: number;
  reload: () => void;
};
const CashTableRow = ({ stocksAccountId, cash, reload }: Props) => {
  return (
    <TableRow>
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

export default memo(CashTableRow);
