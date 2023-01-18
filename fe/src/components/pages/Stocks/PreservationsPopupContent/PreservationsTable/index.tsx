import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo } from "react";
import { Preservation } from "../../../../../models/stocks";
import TableHeaderCell from "../../../../TableCells/TableHeaderCell";
import PreservationTableRow from "./PreservationTableRow";

type Props = {
  preservations: Preservation[];
  reload: () => void;
};
const PreservationsTable = ({ preservations, reload }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ width: "2rem" }} />
            <TableHeaderCell sx={{ width: "8rem" }}>금액</TableHeaderCell>
            <TableHeaderCell>비고</TableHeaderCell>
            <TableHeaderCell sx={{ width: "2rem" }}>적용</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {preservations.map((preservation) => (
            <PreservationTableRow
              key={`preservation-table-row-${preservation.preservationId}`}
              preservation={preservation}
              reload={reload}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(PreservationsTable);
