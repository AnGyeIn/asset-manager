import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import api from "../../../../../../../api";
import {
  centeredBoxStyleHorizontal,
  centeredBoxStyleVertical,
} from "../../../../../../../styles/boxStyles";
import { getInputFieldSetterFromValueChangeEvent } from "../../../../../../../utils/inputUtils";
import { toastError, toastInfo } from "../../../../../../../utils/toastUtils";
import CenteredCircularProgress from "../../../../../../CircularProgresses/CenteredCircularProgress";
import PopupContentWrapper from "../../../../../../Popups/PopupContentWrapper";
import PopupHeader from "../../../../../../Popups/PopupHeader";
import InputTextField from "../../../../../../TextFields/InputTextField";
import { StocksCreateInput } from "./types";

type Props = {
  stocksAccountId: number;
  reload: () => void;
  close: () => void;
};
const AddStocksPopupContent = ({ stocksAccountId, reload, close }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<StocksCreateInput>({
    code: "",
    stocksType: "STOCKS",
  });

  const isInvalid = useMemo(() => input.code === "", [input.code]);

  const addStocks = useCallback(async () => {
    setIsLoading(true);
    const createdCode = await api.post.stocks({
      ...input,
      stocksAccountId,
    });
    setIsLoading(false);
    if (createdCode == input.code) {
      toastInfo(`Succeeded to add stocks with code ${input.code}.`);
      reload();
      close();
    } else {
      toastError(`Failed to add stocks with code ${input.code}.`);
    }
  }, [input, stocksAccountId, reload, close]);

  const setStocksType = useCallback(
    getInputFieldSetterFromValueChangeEvent<StocksCreateInput>(
      setInput,
      "stocksType"
    ),
    []
  );

  return (
    <PopupContentWrapper>
      <Box
        sx={{
          ...centeredBoxStyleVertical,
          width: "30%",
          backgroundColor: "white",
        }}
      >
        <PopupHeader close={close} title={"주식 종목 추가"} />
        <FormControl sx={{ margin: "1%" }}>
          <FormLabel id={"stocks-type-radio-buttons-group"}>타입</FormLabel>
          <RadioGroup
            aria-labelledby={"stocks-type-radio-buttons-group"}
            row
            value={input.stocksType}
            onChange={setStocksType}
          >
            <FormControlLabel
              value={"STOCKS"}
              control={<Radio />}
              label={"주식"}
            />
            <FormControlLabel
              value={"GOLD"}
              control={<Radio />}
              label={"금현물"}
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ ...centeredBoxStyleHorizontal, width: "100%" }}>
          <Typography sx={{ margin: "1%" }}>코드</Typography>
          <InputTextField
            input={input}
            setInput={setInput as Dispatch<SetStateAction<any>>}
            labelKey={"code"}
            error={isInvalid}
            sx={{ height: "1rem" }}
          />
        </Box>
        <Button disabled={isLoading || isInvalid} onClick={addStocks}>
          {isLoading ? <CenteredCircularProgress /> : "추가"}
        </Button>
      </Box>
    </PopupContentWrapper>
  );
};

export default memo(AddStocksPopupContent);
