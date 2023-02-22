import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { StocksAccount } from "../../../../models/stocks";
import StocksAccountSection from "./StocksAccountSection";

type Props = {
  stocksAccounts: StocksAccount[];
};
const StocksAccountsSection = ({ stocksAccounts }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>계좌별 잔고 현황</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {stocksAccounts.map((stocksAccount) => (
          <StocksAccountSection
            key={`stocks-account-section-${stocksAccount.stocksAccountId}`}
            stocksAccount={stocksAccount}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(StocksAccountsSection);
