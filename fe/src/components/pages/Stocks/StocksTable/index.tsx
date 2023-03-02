import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, useMemo } from "react";
import { StocksAccount, StocksLiveInfo } from "../../../../models/stocks";
import { safeDivision } from "../../../../utils/validationUtils";
import TableHeaderCell from "../../../TableCells/TableHeaderCell";
import StocksAccountRow from "./StocksAccountRow";
import StocksRow from "./StocksRow";

type Props = {
  stocksAccounts: StocksAccount[];
  stocksLiveInfosSet: StocksLiveInfo[][];
  stocksAccountsTotalValues: number[];
  reload: () => void;
};
const StocksTable = ({
  stocksAccounts,
  stocksLiveInfosSet,
  stocksAccountsTotalValues,
  reload,
}: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell rowSpan={2} sx={{ width: "10rem" }}>
              계좌
            </TableHeaderCell>
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
          {...useMemo(
            () =>
              stocksAccounts.reduce(
                (rows: JSX.Element[], stocksAccount, stocksAccountIndex) => {
                  const { stocksAccountId, cash, stocksList } = stocksAccount;
                  const stocksLiveInfos =
                    stocksLiveInfosSet[stocksAccountIndex];
                  const stocksAccountTotalValueWithCash =
                    stocksAccountsTotalValues[stocksAccountIndex] + cash;
                  const meanValue = safeDivision(
                    stocksAccountTotalValueWithCash,
                    stocksList.filter(({ isBeingManaged }) => isBeingManaged)
                      .length
                  );
                  return [
                    ...rows,
                    <StocksAccountRow
                      key={`stocks-account-row-${stocksAccountId}`}
                      stocksAccount={stocksAccount}
                    />,
                    ...stocksList.map((stocks, stocksIndex) => (
                      <StocksRow
                        key={`stocks-row-${stocks.code}`}
                        stocks={stocks}
                        stocksLiveInfo={stocksLiveInfos[stocksIndex]}
                        stocksAccountTotalValueWithCash={
                          stocksAccountTotalValueWithCash
                        }
                        targetValue={stocks.isBeingManaged ? meanValue : 0}
                        reload={reload}
                      />
                    )),
                  ];
                },
                []
              ),
            [stocksAccounts, stocksLiveInfosSet, stocksAccountsTotalValues]
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(StocksTable);
