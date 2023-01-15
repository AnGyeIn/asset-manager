import { AccessTime, AddCircleOutline } from "@mui/icons-material";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import api from "../../../api";
import { AccountBookEntry } from "../../../models/accountBook";
import { YearMonth, YearsMonths } from "../../../models/calendar";
import { Canceler } from "../../../models/control";
import { RootState } from "../../../models/store";
import { setCurrBalance } from "../../../store/slices/balanceSlice";
import { setTitlesDescriptions } from "../../../store/slices/titlesDescriptionsSlice";
import {
  centeredBoxStyleHorizontal,
  centeredBoxStyleVertical,
} from "../../../styles/boxStyles";
import { getInputFieldSetterWithEvent } from "../../../utils/inputUtils";
import { binarySearchMaximizing } from "../../../utils/searchUtils";
import {
  getCurrencyStringFrom,
  getMonthStringFrom,
  toStringFromNumber,
} from "../../../utils/stringUtils";
import { toastError, toastInfo } from "../../../utils/toastUtils";
import { isValidNumber } from "../../../utils/validationUtils";
import CenteredCircularProgress from "../../CircularProgresses/CenteredCircularProgress";
import AccountBookTable from "./AccountBookTable";
import RepeatedAccountBookEntriesPopupContent from "./RepeatedAccountBookEntriesPopupContent";
import { infoTextBoxStyle } from "./styles";

const AccountBook = () => {
  const dispatch = useDispatch();

  const { currBalance } = useSelector((_state: RootState) => _state.balance);

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

  const { totIncome, totExpenditure, netIncome } = useMemo(() => {
    let _totIncome = 0;
    let _totExpenditure = 0;
    accountBookEntries.forEach(({ amount }, index) => {
      if (index > 0) {
        if (amount > 0) {
          _totIncome += amount;
        } else if (amount < 0) {
          _totExpenditure += amount;
        }
      }
    });

    const today = new Date().getDate();
    const currIdx = binarySearchMaximizing(accountBookEntries, ({ date }) =>
      date > today ? -1 : 0
    );

    dispatch(
      setCurrBalance(
        accountBookEntries
          .slice(0, currIdx + 1)
          .reduce((balance, { amount }) => balance + amount, 0)
      )
    );

    return {
      totIncome: _totIncome,
      totExpenditure: _totExpenditure,
      netIncome: _totIncome + _totExpenditure,
    };
  }, [accountBookEntries, dispatch]);

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
    getInputFieldSetterWithEvent<YearMonth, number, SyntheticEvent>(
      setSelectedYearMonth,
      "year",
      (newYear) => ({
        month: isValidNumber(newYear) ? yearsMonths[newYear!][0] : NaN,
      })
    ),
    [yearsMonths]
  );

  const selectMonth = useCallback(
    getInputFieldSetterWithEvent<YearMonth, number, SyntheticEvent>(
      setSelectedYearMonth,
      "month"
    ),
    []
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
  }, [years, yearsMonths, fetchYearsMonths]);

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
  }, [years, yearsMonths]);

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

  useEffect(() => {
    const canceler = { cancel: false };
    (async () => {
      const titlesDescriptions =
        await api.get.accountBookEntriesTitlesAndDescriptions();
      if (!canceler.cancel) {
        dispatch(setTitlesDescriptions(titlesDescriptions));
      }
    })();
    return () => {
      canceler.cancel = true;
    };
  }, [reloader, dispatch]);

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
        {accountBookEntries.length > 0 && (
          <Box sx={{ display: "flex", flex: 1 }}>
            <Box sx={infoTextBoxStyle}>
              총 수입 :&nbsp;
              <Typography color={"red"}>
                {getCurrencyStringFrom(totIncome)}
              </Typography>
            </Box>
            <Box sx={infoTextBoxStyle}>
              총 지출 :&nbsp;
              <Typography color={"blue"}>
                {getCurrencyStringFrom(totExpenditure)}
              </Typography>
            </Box>
            <Box sx={infoTextBoxStyle}>
              월 수입 :&nbsp;
              <Typography
                color={netIncome > 0 ? "red" : netIncome < 0 ? "blue" : "black"}
              >
                {getCurrencyStringFrom(netIncome)}
              </Typography>
            </Box>
            <Box sx={infoTextBoxStyle}>
              현재 잔고 : {getCurrencyStringFrom(currBalance)}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          ...centeredBoxStyleVertical,
          width: "100%",
          maxHeight: "80vh",
          margin: "1% 0",
        }}
      >
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
