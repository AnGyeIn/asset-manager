import { AddCircleOutline } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { StocksAccount } from "../../../../models/stocks";
import { RootState } from "../../../../models/store";
import { isValidNumber } from "../../../../utils/validationUtils";
import TableHeaderCell from "../../../TableCells/TableHeaderCell";
import CashWeightManagingTableRow from "./CashWeightManagingTableRow";
import StocksWeightManagingTableRow from "./StocksWeightManagingTableRow";
import TotalValueTableRow from "./TotalValueTableRow";

type Props = {
  stocksAccounts: StocksAccount[];
  setStocksAccounts: Dispatch<SetStateAction<StocksAccount[]>>;
  stocksAccountsTotalValues: number[];
  reload: () => void;
};
const StocksWeightManagingTable = ({
  stocksAccounts,
  setStocksAccounts,
  stocksAccountsTotalValues,
  reload,
}: Props) => {
  const { availableBalance } = useSelector(
    (_state: RootState) => _state.balance
  );

  const totalStocksCash = useMemo(
    () => stocksAccounts.reduce((sum, { cash }) => sum + cash, 0),
    [stocksAccounts]
  );

  const totalCash = useMemo(
    () => totalStocksCash + availableBalance,
    [totalStocksCash, availableBalance]
  );

  const totalValue = useMemo(
    () =>
      stocksAccountsTotalValues.reduce((sum, value) => sum + value, 0) +
      totalCash,
    [stocksAccountsTotalValues, totalCash]
  );

  const targetCashWeight = useMemo(
    () =>
      Math.max(
        0,
        100 -
          stocksAccounts.reduce(
            (sum, { targetWeight }) => sum + targetWeight,
            0
          )
      ),
    [stocksAccounts]
  );

  const isTemplateAdded = useMemo(() => {
    const length = stocksAccounts.length;
    return (
      length > 0 && !isValidNumber(stocksAccounts[length - 1].stocksAccountId)
    );
  }, [stocksAccounts]);

  const addNewStocksAccountTemplate = useCallback(
    () =>
      setStocksAccounts((prevStocksAccounts) => [
        ...prevStocksAccounts,
        {
          stocksAccountId: NaN,
          name: "",
          cash: 0,
          targetWeight: 0,
          stocksList: [],
        },
      ]),
    [setStocksAccounts]
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ width: "2rem" }}>
              <AddCircleOutline
                onClick={
                  isTemplateAdded ? undefined : addNewStocksAccountTemplate
                }
                color={useMemo(
                  () => (isTemplateAdded ? "disabled" : "success"),
                  [isTemplateAdded]
                )}
              />
            </TableHeaderCell>
            <TableHeaderCell>계좌명</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>현재 금액</TableHeaderCell>
            <TableHeaderCell sx={{ width: "5rem" }}>현재 비중</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>목표 비중</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>조정</TableHeaderCell>
            <TableHeaderCell sx={{ width: "8rem" }}>이체 필요</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CashWeightManagingTableRow
            totalCash={totalCash}
            totalStocksCash={totalStocksCash}
            totalValue={totalValue}
            targetWeight={targetCashWeight}
          />
          {stocksAccounts.map((stocksAccount, index) => (
            <StocksWeightManagingTableRow
              key={`stocks-account-managing-table-row-${stocksAccount.stocksAccountId}`}
              stocksAccount={stocksAccount}
              stocksAccountTotalValue={stocksAccountsTotalValues[index]}
              totalValue={totalValue}
              reload={reload}
            />
          ))}
          <TotalValueTableRow totalValue={totalValue} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(StocksWeightManagingTable);
