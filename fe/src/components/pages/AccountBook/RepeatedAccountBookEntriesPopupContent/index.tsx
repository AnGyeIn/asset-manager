import { Box } from "@mui/material";
import { memo } from "react";
import { centeredBoxStyleVertical } from "../../../../styles/boxStyles";
import PopupContentWrapper from "../../../Popups/PopupContentWrapper";
import PopupHeader from "../../../Popups/PopupHeader";

type Props = {
  close: () => void;
}
const RepeatedAccountBookEntriesPopupContent = ({ close }: Props) => {
  return (
    <PopupContentWrapper>
      <Box
        sx={{ ...centeredBoxStyleVertical, width: "80%", background: "white" }}
      >
        <PopupHeader close={close} title={"월별 고정 항목"} />
      </Box>
    </PopupContentWrapper>
  );
};

export default memo(RepeatedAccountBookEntriesPopupContent);
