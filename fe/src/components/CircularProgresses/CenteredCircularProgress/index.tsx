import { Box, CircularProgress, SxProps } from "@mui/material";
import { memo } from "react";
import { horizontalCenteredBoxStyle } from "../../../styles/boxStyles";

interface Props {
  sx?: SxProps;
}
const CenteredCircularProgress = ({ sx }: Props) => {
  return (
    <Box sx={{ ...horizontalCenteredBoxStyle, width: "100%", ...sx }}>
      <CircularProgress color={"inherit"} />
    </Box>
  );
};

export default memo(CenteredCircularProgress);
