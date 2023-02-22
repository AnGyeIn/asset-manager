import { TableCell, TableRow } from "@mui/material";
import { memo, useMemo } from "react";
import { centeredBoxStyleHorizontal } from "../../../../../../styles/boxStyles";
import { getCurrencyStringFrom } from "../../../../../../utils/stringUtils";

type Props = {
  totalValue: number;
};
const TotalValueTableRow = ({ totalValue }: Props) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell sx={centeredBoxStyleHorizontal}>합계</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {useMemo(() => getCurrencyStringFrom(totalValue), [totalValue])}
      </TableCell>
    </TableRow>
  );
};

export default memo(TotalValueTableRow);
