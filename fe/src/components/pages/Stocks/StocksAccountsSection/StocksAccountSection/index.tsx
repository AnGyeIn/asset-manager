import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { memo } from "react";
import { StocksAccount } from "../../../../../models/stocks";

type Props = {
  stocksAccount: StocksAccount;
};
const StocksAccountSection = ({ stocksAccount: { name } }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* TODO */}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(StocksAccountSection);
