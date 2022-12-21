import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { memo } from "react";
import { RepeatedAccountBookEntry } from "../../../../../models/repeatedAccountBookEntry";
import TableHeaderCell from "../../../../TableCells/TableHeaderCell";

type Props = {
  repeatedAccountBookEntries: RepeatedAccountBookEntry[];
  reload: () => void;
}
const RepeatedAccountBookEntriesTable = ({
  repeatedAccountBookEntries,
  reload,
}: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ width: "3rem" }} />
            <TableHeaderCell sx={{ width: "5rem" }}>반복</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>수입/지출</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>항목</TableHeaderCell>
            <TableHeaderCell>비고</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(RepeatedAccountBookEntriesTable);
