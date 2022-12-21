import { Box } from "@mui/material";
import { memo, ReactNode } from "react";
import { centeredBoxStyleVertical } from "../../../styles/boxStyles";

type Props = {
  children: ReactNode;
}
const PopupContentWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        ...centeredBoxStyleVertical,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {children}
    </Box>
  );
};

export default memo(PopupContentWrapper);
