import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, useMemo } from "react";
import { AccountBookEntry } from "../../../../models/accountBook";
import TableHeaderCell from "../../../TableCells/TableHeaderCell";
import AccountBookEntryTableRow from "./AccountBookEntryTableRow";

type Props = {
  accountBookEntries: AccountBookEntry[];
  reload: () => void;
}
const AccountBookTable = ({ accountBookEntries, reload }: Props) => {
  const accumulationList = useMemo(() => {
    let acc = 0;
    return accountBookEntries.map(({ amount }) => (acc += amount));
  }, [accountBookEntries]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ width: "3rem" }} />
            <TableHeaderCell sx={{ width: "4rem" }}>날짜</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>수입</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>지출</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>계</TableHeaderCell>
            <TableHeaderCell sx={{ width: "20rem" }}>항목</TableHeaderCell>
            <TableHeaderCell>비고</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBookEntries.map((accountBookEntry, index) => (
            <AccountBookEntryTableRow
              key={`account-book-entry-table-row-${accountBookEntry.accountBookEntryId}`}
              isFirst={index === 0}
              accountBookEntry={accountBookEntry}
              accumulation={accumulationList[index]}
              reload={reload}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(AccountBookTable);
