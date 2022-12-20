import { SxProps, TableCell } from "@mui/material";
import { memo, ReactNode } from "react";

interface Props {
  sx?: SxProps;
  children?: ReactNode;
}
const TableHeaderCell = ({ sx = {}, children }: Props) => {
  return <TableCell sx={{ ...sx, textAlign: "center" }}>{children}</TableCell>;
};

export default memo(TableHeaderCell);
