import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../../../api";
import { AccountBookEntry } from "../../../models/accountBook";
import { YearMonth, YearsMonths } from "../../../models/calendar";
import {
  horizontalCenteredBoxStyle,
  verticalCenterdBoxStyle,
} from "../../../styles/boxStyles";
import { isValidNumber } from "../../../utils/validationUtils";
import CenteredCircularProgress from "../../CircularProgresses/CenteredCircularProgress";
import AccountBookTable from "./AccountBookTable";

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

  const years = useMemo(
    () =>
      Object.keys(yearsMonths)
        .map((yearStr) => Number(yearStr))
        .sort((a, b) => a - b),
    [yearsMonths]
  );

  const reload = useCallback(() => setReloader((_reloader) => !_reloader), []);

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

  useEffect(() => {
    const canceler = { cancel: false };
    (async () => {
      const _yearsMonths = await api.get.accountBooksYearsAndMonths();
      if (!canceler.cancel) {
        setYearsMonths(_yearsMonths);
      }
    })();
    return () => {
      canceler.cancel = true;
    };
  }, []);

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
      <Box sx={{ width: "100%", display: "flex" }}>
        {years.length > 0 && (
          <Box sx={horizontalCenteredBoxStyle}>
            <Autocomplete
              sx={{ width: "7rem" }}
              options={years}
              getOptionLabel={(year: number) => year.toString()}
              disableClearable
              value={selectedYearMonth.year}
              onChange={selectYear}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography sx={{ margin: "0 1%" }}>년</Typography>
          </Box>
        )}
        {isValidNumber(selectedYearMonth.year) && (
          <Box sx={{ ...horizontalCenteredBoxStyle, margin: "0 1%" }}>
            <Autocomplete
              sx={{ width: "4rem" }}
              options={yearsMonths[selectedYearMonth.year]}
              getOptionLabel={(month: number) => month.toString()}
              disableClearable
              value={selectedYearMonth.month}
              onChange={selectMonth}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography sx={{ margin: "0 1%" }}>월</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ ...verticalCenterdBoxStyle, width: "100%" }}>
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
