import { AccessTime, AddCircleOutline } from "@mui/icons-material";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Popup from "reactjs-popup";
import api from "../../../api";
import { AccountBookEntry } from "../../../models/accountBook";
import { YearMonth, YearsMonths } from "../../../models/calendar";
import { Canceler } from "../../../models/control";
import {
  centeredBoxStyleHorizontal,
  centeredBoxStyleVertical,
} from "../../../styles/boxStyles";
import {
  getMonthStringFrom,
  toStringFromNumber,
} from "../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../utils/toastUtils";
import { isValidNumber } from "../../../utils/validationUtils";
import CenteredCircularProgress from "../../CircularProgresses/CenteredCircularProgress";
import AccountBookTable from "./AccountBookTable";
import RepeatedAccountBookEntriesPopupContent from "./RepeatedAccountBookEntriesPopupContent";

const AccountBook = () => {
  const [yearsMonths, setYearsMonths] = useState<YearsMonths>({});
  const [selectedYearMonth, setSelectedYearMonth] = useState<YearMonth>({
    year: NaN,
    month: NaN,
  });
  const [accountBookEntries, setAccountBookEntries] = useState<
    AccountBookEntry[]
  >([]);
  const [reloader, setReloader] = useState(false);
  const [
    isRepeatedAccountBookEntriesPopupOpen,
    setIsRepeatedAccountBookEntriesPopupOpen,
  ] = useState(false);

  const years = useMemo(
    () =>
      Object.keys(yearsMonths)
        .map((yearStr) => Number(yearStr))
        .sort((a, b) => a - b),
    [yearsMonths]
  );

  const reload = useCallback(() => setReloader((_reloader) => !_reloader), []);

  const openRepeatedAccountBookEntriesPopup = useCallback(
    () => setIsRepeatedAccountBookEntriesPopupOpen(true),
    []
  );

  const closeRepeatedAccountBookEntriesPopup = useCallback(
    () => setIsRepeatedAccountBookEntriesPopupOpen(false),
    []
  );

  const selectYear = useCallback(
    (_: SyntheticEvent, newYear: number) => {
      if (selectedYearMonth.year !== newYear) {
        setSelectedYearMonth({
          year: newYear,
          month: yearsMonths[newYear][0],
        });
      }
    },
    [yearsMonths, selectedYearMonth.year]
  );

  const selectMonth = useCallback(
    (_: SyntheticEvent, newMonth: number) => {
      if (selectedYearMonth.month !== newMonth) {
        setSelectedYearMonth((prevSelectedYearMonth) => ({
          ...prevSelectedYearMonth,
          month: newMonth,
        }));
      }
    },
    [selectedYearMonth.month]
  );

  const fetchYearsMonths = useCallback(async (canceler?: Canceler) => {
    const _yearsMonths = await api.get.accountBooksYearsAndMonths();
    if (canceler?.cancel) {
      return;
    }
    setYearsMonths(_yearsMonths);
  }, []);

  const createNextAccountBook = useCallback(async () => {
    const lastYear = years[years.length - 1];
    const months = yearsMonths[lastYear];
    const lastMonth = months[months.length - 1];
    let nextYear = lastYear;
    let nextMonth = lastMonth + 1;
    if (nextMonth === 13) {
      nextYear++;
      nextMonth = 1;
    }
    const yearMonth = { year: nextYear, month: nextMonth };
    const accountBookEntryId = await api.post.accountBook(yearMonth);
    if (isValidNumber(accountBookEntryId)) {
      toastInfo(
        `Succeeded to create next account book of ${getMonthStringFrom(
          yearMonth
        )}.`
      );
      fetchYearsMonths();
    } else {
      toastError(
        `Failed to create next account book of ${getMonthStringFrom(
          yearMonth
        )}.`
      );
    }
  }, [years, fetchYearsMonths]);

  useEffect(() => {
    const canceler = { cancel: false };
    fetchYearsMonths(canceler);
    return () => {
      canceler.cancel = true;
    };
  }, [fetchYearsMonths]);

  useEffect(() => {
    if (years.length > 0) {
      const year = years[years.length - 1];
      const months = yearsMonths[year];
      setSelectedYearMonth({
        year,
        month: months[months.length - 1],
      });
    } else {
      setSelectedYearMonth({
        year: NaN,
        month: NaN,
      });
    }
  }, [years]);

  useEffect(() => {
    const canceler = { cancel: false };
    const { year, month } = selectedYearMonth;
    if (isValidNumber(year) && isValidNumber(month)) {
      (async () => {
        const _accountBookEntries = await api.get.accountBookEntries(
          selectedYearMonth
        );
        if (!canceler.cancel) {
          setAccountBookEntries(_accountBookEntries);
        }
      })();
    } else {
      setAccountBookEntries([]);
    }
    return () => {
      canceler.cancel = true;
    };
  }, [selectedYearMonth, reloader]);

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        {years.length > 0 && (
          <Box sx={centeredBoxStyleHorizontal}>
            <Autocomplete
              sx={{ width: "7rem" }}
              options={years}
              getOptionLabel={toStringFromNumber}
              disableClearable
              value={selectedYearMonth.year}
              onChange={selectYear}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography sx={{ margin: "0 1%" }}>년</Typography>
          </Box>
        )}
        {isValidNumber(selectedYearMonth.year) && (
          <Box sx={{ ...centeredBoxStyleHorizontal, margin: "0 1%" }}>
            <Autocomplete
              sx={{ width: "4rem" }}
              options={yearsMonths[selectedYearMonth.year]}
              getOptionLabel={toStringFromNumber}
              disableClearable
              value={selectedYearMonth.month}
              onChange={selectMonth}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography sx={{ margin: "0 1%" }}>월</Typography>
          </Box>
        )}
        {years.length > 0 && (
          <AddCircleOutline
            color={"success"}
            onClick={createNextAccountBook}
            sx={{ margin: "0 1%" }}
          />
        )}
        <AccessTime onClick={openRepeatedAccountBookEntriesPopup} />
        <Popup
          open={isRepeatedAccountBookEntriesPopupOpen}
          modal
          closeOnDocumentClick={false}
          closeOnEscape={false}
        >
          <RepeatedAccountBookEntriesPopupContent
            close={closeRepeatedAccountBookEntriesPopup}
          />
        </Popup>
      </Box>
      <Box sx={{ ...centeredBoxStyleVertical, width: "100%" }}>
        {accountBookEntries.length > 0 ? (
          <AccountBookTable
            accountBookEntries={accountBookEntries}
            reload={reload}
          />
        ) : (
          <CenteredCircularProgress />
        )}
      </Box>
    </>
  );
};

export default AccountBook;
