import { Box, TableCell, TableRow } from "@mui/material";
import { memo, useCallback, useRef, useState } from "react";
import api from "../../../../../../../api";
import { StocksAccount } from "../../../../../../../models/stocks";
import { centeredBoxStyleHorizontal } from "../../../../../../../styles/boxStyles";
import { getCurrencyStringFrom } from "../../../../../../../utils/stringUtils";
import { toastError } from "../../../../../../../utils/toastUtils";
import NumberTextFieldValidOnly from "../../../../../../TextFields/NumberTextFieldValidOnly";

type Props = {
  stocksAccount: StocksAccount;
  reload: () => void;
};
const CashTableRow = ({
  stocksAccount: { stocksAccountId, name, cash: inCash, targetWeight },
  reload,
}: Props) => {
  const [cash, setCash] = useState(inCash);

  const cashStore = useRef(inCash);

  const updateCash = useCallback(async () => {
    if (cash === cashStore.current) {
      return;
    }
    cashStore.current = cash;
    const succeeded = await api.patch.stocksAccount(stocksAccountId, {
      name,
      cash,
      targetWeight,
    });
    if (succeeded) {
      reload();
    } else {
      toastError(`Failed to update cash of the stocks account ${name}.`);
    }
  }, [cash, stocksAccountId, reload]);

  return (
    <TableRow>
      <TableCell colSpan={2} />
      <TableCell sx={{ textAlign: "center" }}>예수금</TableCell>
      <TableCell colSpan={7} />
      <TableCell sx={{ textAlign: "right" }}>
        <Box sx={centeredBoxStyleHorizontal}>
          <NumberTextFieldValidOnly
            value={cash}
            setValue={setCash}
            formatter={getCurrencyStringFrom}
            onCompleted={updateCash}
            sx={{ height: "1rem", textAlign: "right" }}
          />
        </Box>
      </TableCell>
      <TableCell colSpan={5} />
    </TableRow>
  );
};

export default memo(CashTableRow);
