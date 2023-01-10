import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../../api";
import { RepeatedAccountBookEntry } from "../../../../models/accountBook";
import { setTitlesDescriptions } from "../../../../store/slices/titlesDescriptionsSlice";
import { centeredBoxStyleVertical } from "../../../../styles/boxStyles";
import { isValidNumber } from "../../../../utils/validationUtils";
import CenteredCircularProgress from "../../../CircularProgresses/CenteredCircularProgress";
import PopupContentWrapper from "../../../Popups/PopupContentWrapper";
import PopupHeader from "../../../Popups/PopupHeader";
import RepeatedAccountBookEntriesTable from "./RepeatedAccountBookEntriesTable";

type Props = {
  close: () => void;
};
const RepeatedAccountBookEntriesPopupContent = ({ close }: Props) => {
  const dispatch = useDispatch();

  const [repeatedAccountBookEntries, setRepeatedAccountBookEntries] = useState<
    RepeatedAccountBookEntry[]
  >([]);
  const [reloader, setReloader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isTemplateAdded = useMemo(() => {
    const length = repeatedAccountBookEntries.length;
    return (
      length > 0 &&
      !isValidNumber(
        repeatedAccountBookEntries[length - 1].repeatedAccountBookEntryId
      )
    );
  }, [repeatedAccountBookEntries]);

  const isUnableToAddTemplate = useMemo(
    () => isLoading || isTemplateAdded,
    [isLoading, isTemplateAdded]
  );

  const reload = useCallback(() => setReloader((_reloader) => !_reloader), []);

  const addNewRepeatedAccountBookEntryTemplate = useCallback(
    () =>
      setRepeatedAccountBookEntries((prevRepeatedAccountBookEntries) => [
        ...prevRepeatedAccountBookEntries,
        {
          repeatedAccountBookEntryId: NaN,
          amount: 0,
        },
      ]),
    []
  );

  useEffect(() => {
    const canceler = { cancel: false };

    (async () => {
      setIsLoading(true);
      const _repeatedAccountBookEntries =
        await api.get.repeatedAccountBookEntries();
      if (!canceler.cancel) {
        setRepeatedAccountBookEntries(_repeatedAccountBookEntries);
      }
    })();

    (async () => {
      const titlesDesriptions =
        await api.get.accountBookEntriesTitlesAndDescriptions();
      if (!canceler.cancel) {
        dispatch(setTitlesDescriptions(titlesDesriptions));
      }
    })();

    return () => {
      canceler.cancel = true;
    };
  }, [reloader, dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [repeatedAccountBookEntries]);

  return (
    <PopupContentWrapper>
      <Box
        sx={{
          ...centeredBoxStyleVertical,
          width: "90%",
          maxHeight: "90%",
          background: "white",
        }}
      >
        <PopupHeader close={close} title={"월별 고정 항목"} />
        <Box sx={{ width: "100%" }}>
          <Button
            disabled={isUnableToAddTemplate}
            onClick={addNewRepeatedAccountBookEntryTemplate}
          >
            <AddCircleOutline
              color={isUnableToAddTemplate ? "disabled" : "success"}
            />
          </Button>
        </Box>
        {isLoading ? (
          <CenteredCircularProgress />
        ) : (
          <RepeatedAccountBookEntriesTable
            repeatedAccountBookEntries={repeatedAccountBookEntries}
            reload={reload}
          />
        )}
      </Box>
    </PopupContentWrapper>
  );
};

export default memo(RepeatedAccountBookEntriesPopupContent);
