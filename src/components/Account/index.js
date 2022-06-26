import { useState } from "react";
import BorderedTable from "../common/BorderedTable";
import BorderedTh from "../common/BorderedTh";
import InlineSelect from "../common/InlineSelect";
import AccountRow from "./AccountRow";

// TODO
const dummyCalendars = [
  {
    year: 2021,
    month: 5,
  },
  {
    year: 2022,
    month: 6,
  },
];

// TODO
const dummyData = [
  {
    date: 1,
    amount: 9275633,
    title: "이월금",
    content: "",
  },
  {
    date: 2,
    amount: -3425,
    title: "페이플",
    content: "SHARE - 디즈니+",
  },
];

/**
 *
 * @param {int} value
 * @returns Option object for react-select
 */
const getOption = (value) => ({
  value,
  label: value,
});

const Account = () => {
  // TODO
  const calendars = dummyCalendars;

  const years = new Set();
  const months = new Set();
  calendars.forEach(({ year, month }) => {
    years.add(year);
    months.add(month);
  });

  const yearOptions = [...years].map((year) => getOption(year));
  const monthOptions = [...months].map((month) => getOption(month));

  const { year: defaultYear, month: defaultMonth } =
    calendars[calendars.length - 1];
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // TODO
  const [rawData, setRawData] = useState(dummyData);

  let accumulation = 0;
  const accountData = rawData.map((data) => {
    accumulation += data.amount;
    return {
      ...data,
      accumulation,
    };
  });

  /**
   *
   * @param {int} index
   */
  const addData = (index) => {
    // TODO
  };

  /**
   *
   * @param {int} index
   */
  const removeData = (index) => {
    setRawData([...rawData.slice(0, index), ...rawData.slice(index + 1)]);
  };

  return (
    <>
      <div style={{ fontSize: "2em", fontWeight: "bold" }}>
        <InlineSelect
          width={140}
          options={yearOptions}
          defaultValue={getOption(selectedYear)}
          onChange={({ value: year }) => setSelectedYear(year)}
        />
        년{" "}
        <InlineSelect
          width={80}
          options={monthOptions}
          defaultValue={getOption(selectedMonth)}
          onChange={({ value: month }) => setSelectedMonth(month)}
        />
        월
      </div>
      <BorderedTable>
        <thead>
          <tr>
            <BorderedTh width={"7%"} />
            <BorderedTh width={"4%"}>날짜</BorderedTh>
            <BorderedTh width={"12%"}>수입</BorderedTh>
            <BorderedTh width={"12%"}>지출</BorderedTh>
            <BorderedTh width={"14%"}>계</BorderedTh>
            <BorderedTh>항목</BorderedTh>
            <BorderedTh>비고</BorderedTh>
          </tr>
        </thead>
        <tbody>
          {accountData.map((data, index) => (
            <AccountRow
              data={data}
              key={data.date + data.title + index}
              addData={() => addData(index)}
              removeData={() => removeData(index)}
            />
          ))}
        </tbody>
      </BorderedTable>
    </>
  );
};

export default Account;
