import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { memo } from "react";
import StocksAccountTable from "./StocksAccountTable";
import { StocksAccountProps } from "./types";

const StocksAccountSection = (props: StocksAccountProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{props.stocksAccount.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StocksAccountTable {...props} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(StocksAccountSection);
