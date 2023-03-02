import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, useMemo } from "react";
import { safeDivision } from "../../../../../../utils/validationUtils";
import TableHeaderCell from "../../../../../TableCells/TableHeaderCell";
import { StocksAccountProps } from "../types";
import CashTableRow from "./CashTableRow";
import StocksTableRow from "./StocksTableRow";

const StocksAccountTable = ({
  stocksAccount: { stocksAccountId, cash, stocksList },
  stocksLiveInfos,
  stocksAccountTotalValue,
  reload,
}: StocksAccountProps) => {
  const meanValue = useMemo(() => {
    const totalManagedValue = stocksLiveInfos.reduce(
      (sum, { value }, index) =>
        sum + (stocksList[index].isBeingManaged ? value : 0),
      0
    );
    return safeDivision(
      totalManagedValue + cash,
      stocksList.filter(({ isBeingManaged }) => isBeingManaged).length
    );
  }, [stocksLiveInfos, stocksList, cash]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell rowSpan={2} sx={{ width: "8rem" }}>
              코드
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "8rem" }}>
              종목
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              평가손익
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "3rem" }}>
              수익률
            </TableHeaderCell>
            <TableHeaderCell colSpan={2}>소수점</TableHeaderCell>
            <TableHeaderCell colSpan={2}>일반</TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              총 매입금액
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              평가금액
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              평균매입가
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              현재가
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "3rem" }}>
              비중
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "2rem" }}>
              유지
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              조정
            </TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell sx={{ width: "5rem" }}>잔고수량</TableHeaderCell>
            <TableHeaderCell sx={{ width: "5rem" }}>매입가</TableHeaderCell>
            <TableHeaderCell sx={{ width: "2rem" }}>잔고수량</TableHeaderCell>
            <TableHeaderCell sx={{ width: "5rem" }}>매입금액</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CashTableRow
            stocksAccountId={stocksAccountId}
            cash={cash}
            reload={reload}
          />
          {stocksList.map((stocks, index) => (
            <StocksTableRow
              key={`stocks-table-row-${stocks.code}`}
              stocks={stocks}
              stocksLiveInfo={stocksLiveInfos[index]}
              stocksAccountTotalValue={stocksAccountTotalValue}
              targetValue={stocks.isBeingManaged ? meanValue : 0}
              reload={reload}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(StocksAccountTable);
