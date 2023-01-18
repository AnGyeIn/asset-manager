import { AddCircleOutline } from "@mui/icons-material";
import { Box } from "@mui/material";
import { memo, useCallback } from "react";
import api from "../../../../api";
import { Preservation } from "../../../../models/stocks";
import { centeredBoxStyleVertical } from "../../../../styles/boxStyles";
import { toastError, toastInfo } from "../../../../utils/toastUtils";
import { isValidNumber } from "../../../../utils/validationUtils";
import PopupContentWrapper from "../../../Popups/PopupContentWrapper";
import PopupHeader from "../../../Popups/PopupHeader";
import PreservationsTable from "./PreservationsTable";

type Props = {
  preservations: Preservation[];
  reload: () => void;
  close: () => void;
};
const PreservationsPopupContent = ({ preservations, reload, close }: Props) => {
  const addPreservation = useCallback(async () => {
    const newPreservationId = await api.post.preservation({
      amount: 0,
      description: "",
    });
    if (isValidNumber(newPreservationId)) {
      toastInfo("Succeeded to register new preservation.");
      reload();
    } else {
      toastError("Failed to regiseter new preservation.");
    }
  }, [reload]);

  return (
    <PopupContentWrapper>
      <Box
        sx={{
          ...centeredBoxStyleVertical,
          width: "90%",
          maxHeight: "90%",
          backgroundColor: "white",
        }}
      >
        <PopupHeader close={close} title={"현금 보존 항목"} />
        <Box sx={{ width: "100%" }}>
          <AddCircleOutline
            onClick={addPreservation}
            color={"success"}
            sx={{ margin: "1% 1% 0" }}
          />
          <PreservationsTable preservations={preservations} reload={reload} />
        </Box>
      </Box>
    </PopupContentWrapper>
  );
};

export default memo(PreservationsPopupContent);
