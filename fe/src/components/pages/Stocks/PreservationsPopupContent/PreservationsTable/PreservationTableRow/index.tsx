import { RemoveCircleOutline } from "@mui/icons-material";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import api from "../../../../../../api";
import {
  Preservation,
  PreservationUpdate,
} from "../../../../../../models/stocks";
import { centeredBoxStyleHorizontal } from "../../../../../../styles/boxStyles";
import {
  getInputFieldSetter,
  getInputFieldSetterFromCheckedChangeEvent,
  isInputChanged,
} from "../../../../../../utils/inputUtils";
import { getCurrencyStringFrom } from "../../../../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../../../../utils/toastUtils";
import InputTextField from "../../../../../TextFields/InputTextField";
import NumberTextFieldValidOnly from "../../../../../TextFields/NumberTextFieldValidOnly";

type Props = {
  preservation: Preservation;
  reload: () => void;
};
const PreservationTableRow = ({
  preservation: { preservationId, amount, description, active },
  reload,
}: Props) => {
  const [input, setInput] = useState<PreservationUpdate>({
    amount,
    description: description ?? "",
    active,
  });

  const inputStore = useRef<PreservationUpdate>({
    amount,
    description: description ?? "",
    active,
  });

  const updatePreservation = useCallback(async () => {
    if (!isInputChanged(input, inputStore)) {
      return;
    }
    inputStore.current = { ...input };
    const succeeded = await api.patch.preservation(preservationId, input);
    if (succeeded) {
      reload();
    } else {
      toastError("Failed to update preservation.");
    }
  }, [input, preservationId, reload]);

  const deletePreservation = useCallback(async () => {
    const succeeded = await api.delete.preservation(preservationId);
    if (succeeded) {
      toastInfo("Succeeded to unregister preservation.");
      reload();
    } else {
      toastError("Failed to unregister preservation.");
    }
  }, [preservationId, reload]);

  const setAmount = useCallback(
    getInputFieldSetter<PreservationUpdate, number>(setInput, "amount"),
    []
  );

  const setActive = useCallback(
    getInputFieldSetterFromCheckedChangeEvent<PreservationUpdate>(
      setInput,
      "active"
    ),
    []
  );

  useEffect(() => {
    updatePreservation();
  }, [input.active, updatePreservation]);

  return (
    <TableRow>
      <TableCell>
        <Box sx={centeredBoxStyleHorizontal}>
          <RemoveCircleOutline color={"error"} onClick={deletePreservation} />
        </Box>
      </TableCell>
      <TableCell>
        <NumberTextFieldValidOnly
          fullWidth
          value={input.amount}
          setValue={setAmount}
          onCompleted={updatePreservation}
          formatter={getCurrencyStringFrom}
          sx={{ heigth: "1rem", textAlign: "right" }}
          min={0}
        />
      </TableCell>
      <TableCell>
        <Box sx={centeredBoxStyleHorizontal}>
          <InputTextField
            input={input}
            setInput={setInput as Dispatch<SetStateAction<any>>}
            labelKey={"description"}
            fullWidth
            onCompleted={updatePreservation}
            sx={{ height: "1rem" }}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Checkbox
          color={"default"}
          checked={input.active}
          onChange={setActive}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(PreservationTableRow);
