import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import Popup from "reactjs-popup";
import { centeredBoxStyleHorizontal } from "../../../../../../styles/boxStyles";
import { safeDivision } from "../../../../../../utils/validationUtils";
import TableHeaderCell from "../../../../../TableCells/TableHeaderCell";
import { StocksAccountProps } from "../types";
import AddStocksPopupContent from "./AddStocksPopupContent";
import CashTableRow from "./CashTableRow";
import StocksTableRow from "./StocksTableRow";

const StocksAccountTable = ({
  stocksAccount,
  stocksLiveInfos,
  stocksAccountTotalValue,
  reload,
}: StocksAccountProps) => {
  const { stocksAccountId, cash, stocksList } = stocksAccount;

  const [isAddStocksPopupOpen, setIsAddStocksPopupOpen] = useState(false);

  const meanValue = useMemo(() => {
    if (stocksLiveInfos.length !== stocksList.length) {
      return 0;
    }
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

  const openAddStocksPopup = useCallback(
    () => setIsAddStocksPopupOpen(true),
    []
  );

  const closeAddStocksPopup = useCallback(
    () => setIsAddStocksPopupOpen(false),
    []
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell rowSpan={2} sx={{ width: "1rem" }}>
              <Box sx={centeredBoxStyleHorizontal}>
                <AddCircleOutline
                  onClick={openAddStocksPopup}
                  color={"success"}
                />
                <Popup
                  open={isAddStocksPopupOpen}
                  modal
                  closeOnDocumentClick={false}
                  closeOnEscape={false}
                >
                  <AddStocksPopupContent
                    stocksAccountId={stocksAccountId}
                    reload={reload}
                    close={closeAddStocksPopup}
                  />
                </Popup>
              </Box>
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "4rem" }}>
              코드
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2}>종목</TableHeaderCell>
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
            <TableHeaderCell rowSpan={2} sx={{ width: "7rem" }}>
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
            <TableHeaderCell rowSpan={2} sx={{ width: "1rem" }}>
              유지
            </TableHeaderCell>
            <TableHeaderCell rowSpan={2} sx={{ width: "5rem" }}>
              조정
            </TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell sx={{ width: "6rem" }}>잔고수량</TableHeaderCell>
            <TableHeaderCell sx={{ width: "6rem" }}>매입가</TableHeaderCell>
            <TableHeaderCell sx={{ width: "4rem" }}>잔고수량</TableHeaderCell>
            <TableHeaderCell sx={{ width: "7rem" }}>매입금액</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CashTableRow stocksAccount={stocksAccount} reload={reload} />
          {stocksLiveInfos.length === stocksList.length &&
            stocksList.map((stocks, index) => (
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
