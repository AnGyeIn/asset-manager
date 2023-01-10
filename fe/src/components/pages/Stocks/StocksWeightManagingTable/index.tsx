import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { StocksAccount } from "../../../../models/stocks";
import { RootState } from "../../../../models/store";
import TableHeaderCell from "../../../TableCells/TableHeaderCell";
import StocksWeightManagingTableRow from "./StocksWeightManagingTableRow";

type Props = {
  stocksAccounts: StocksAccount[];
  stocksAccountsTotalValues: number[];
  reload: () => void;
};
const StocksWeightManagingTable = ({
  stocksAccounts,
  stocksAccountsTotalValues,
  reload,
}: Props) => {
  const { availableBalance } = useSelector((state: RootState) => state.balance);

  const totalCash = useMemo(
    () =>
      stocksAccounts.reduce((sum, { cash }) => sum + cash, 0) +
      availableBalance,
    [stocksAccounts, availableBalance]
  );

  const totalValue = useMemo(
    () =>
      stocksAccountsTotalValues.reduce((sum, value) => sum + value, 0) +
      totalCash,
    [stocksAccountsTotalValues, totalCash]
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeaderCell sx={{ width: "2rem" }} />
          <TableHeaderCell>계좌명</TableHeaderCell>
          <TableHeaderCell sx={{ width: "8rem" }}>현재 금액</TableHeaderCell>
          <TableHeaderCell sx={{ width: "5rem" }}>현재 비중</TableHeaderCell>
          <TableHeaderCell sx={{ width: "8rem" }}>목표 비중</TableHeaderCell>
          <TableHeaderCell sx={{ width: "8rem" }}>조정</TableHeaderCell>
          <TableHeaderCell sx={{ width: "8rem" }}>이체 필요</TableHeaderCell>
        </TableHead>
        <TableBody>
          {/* TODO: total cash row */}
          {stocksAccounts.map((stocksAccount, index) => (
            <StocksWeightManagingTableRow
              key={`stocks-account-managing-table-row-${stocksAccount.stocksAccountId}`}
              stocksAccount={stocksAccount}
              stocksAccountTotalValue={stocksAccountsTotalValues[index]}
              totalValue={totalValue}
              reload={reload}
            />
          ))}
          {/* TODO: total value row */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(StocksWeightManagingTable);
