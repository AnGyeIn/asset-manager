import { SxProps, TableCell } from "@mui/material";
import { memo, ReactNode } from "react";

type Props = {
  sx?: SxProps;
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
};
const TableHeaderCell = ({ sx = {}, children, colSpan, rowSpan }: Props) => {
  return (
    <TableCell
      sx={{ ...sx, textAlign: "center" }}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </TableCell>
  );
};

export default memo(TableHeaderCell);
