import { HighlightOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
  close: () => void;
  title: string;
}
const PopupHeader = ({ close, title }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "1% 2%",
      }}
    >
      <Typography sx={{ flex: 1 }}>{title}</Typography>
      <HighlightOff onClick={close} />
    </Box>
  );
};

export default memo(PopupHeader);
