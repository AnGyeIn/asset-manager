import { Box, CircularProgress, SxProps } from "@mui/material";
import { memo } from "react";
import { centeredBoxStyleHorizontal } from "../../../styles/boxStyles";

type Props = {
  sx?: SxProps;
};
const CenteredCircularProgress = ({ sx }: Props) => {
  return (
    <Box sx={{ ...centeredBoxStyleHorizontal, width: "100%", ...sx }}>
      <CircularProgress color={"inherit"} />
    </Box>
  );
};

export default memo(CenteredCircularProgress);
