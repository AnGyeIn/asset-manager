import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { StocksAccount, StocksLiveInfo } from "../../../../models/stocks";
import StocksAccountSection from "./StocksAccountSection";

type Props = {
  stocksAccounts: StocksAccount[];
  stocksLiveInfosSet: StocksLiveInfo[][];
  stocksAccountsTotalValues: number[];
  reload: () => void;
};
const StocksAccountsSection = ({
  stocksAccounts,
  stocksLiveInfosSet,
  stocksAccountsTotalValues,
  reload,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>계좌별 잔고 현황</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {stocksAccounts.map((stocksAccount, index) => (
          <StocksAccountSection
            key={`stocks-account-section-${stocksAccount.stocksAccountId}`}
            stocksAccount={stocksAccount}
            stocksLiveInfos={stocksLiveInfosSet[index]}
            stocksAccountTotalValue={
              stocksAccountsTotalValues[index]
            }
            reload={reload}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(StocksAccountsSection);
