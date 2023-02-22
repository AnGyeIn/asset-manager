import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { memo } from "react";
import StocksWeightManagingTable from "./StocksWeightManagingTable";
import { StocksWeightManagingProps } from "./types";

const StocksWeightManagingSection = (props: StocksWeightManagingProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>계좌별 비중 관리</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StocksWeightManagingTable {...props} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(StocksWeightManagingSection);
