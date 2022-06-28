import { useRef, useState, useEffect } from "react";
import { currencyOf } from "../../utils/stringFormat";
import BorderedTable from "../common/BorderedTable";
import BorderedTh from "../common/BorderedTh";
import AccountRow from "./AccountRow";
import NewAccountRowModal from "./NewAccountRowModal";

/*********************/
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
/*********************/

/**
 *
 * @param {{
 *   date: int,
 *   amount: int,
 *   title: string,
 *   content: string | undefined,
 * }[]} rawData data without accumulation
 * @param {Date} today
 * @returns {{
 *   date: int,
 *   amount: int,
 *   accumulation: int,
 *   title: string,
 *   content: string | undefined,
 * }[]}
 */
const caculateAccumulation = (rawData) => {
  let accumulation = 0;
  return rawData.map((data) => {
    accumulation += data.amount;
    return {
      ...data,
      accumulation,
    };
  });
};

/**
 *
 * @param {{
 *   year: int,
 *   month: int,
 * }}
 * @returns YYYY-MM
 */
const calendarToString = ({ year, month }) =>
  year + "-" + (month + "").padStart(2, "0");

// TODO: read from file
const fetchCalendars = () => dummyCalendars;

/**
 *
 * @param {{
 *   year: int,
 *   month: int,
 * }} calendar
 * @returns
 */
// TODO: read from file
const fetchRawDataFromFile = (calendar) => dummyData;

/**
 *
 * @param {{
 *   year: int,
 *   month: int,
 * }} calendar
 * @param {{
 *   date: int,
 *   amount: int,
 *   title: string,
 *   content: string | undefined,
 * }[]} updatedRawData
 */
const updateRawDataToFiles = (calendar, updatedRawData) => {
  // TODO: write to file and propagate(make async)
  dummyData.splice(0);
  dummyData.push(...updatedRawData);
  console.log("dummyData: ", dummyData);
};

const Account = () => {
  const today = new Date();
  const currCalendar = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };

  const calendars = useRef([]);
  const [selectedCalendar, setSelectedCalendar] = useState(currCalendar);
  const [rawData, setRawData] = useState([]);
  const [newAccountRowIndex, setNewAccountRowIndex] = useState(-1);

  // TODO: get from redux
  const currAccumulation = 9272208;

  // initialize
  useEffect(() => {
    calendars.current = fetchCalendars();
    setSelectedCalendar(calendars.current[calendars.current.length - 1]);
  }, []);

  // load data
  useEffect(() => {
    setRawData(fetchRawDataFromFile(selectedCalendar));
  }, [selectedCalendar]);

  const currCalendarStr = calendarToString(currCalendar);
  const calendarsLength = calendars.current.length;
  const minCalendarStr =
    calendarsLength > 0
      ? calendarToString(calendars.current[0])
      : currCalendarStr;
  const maxCalendarStr =
    calendarsLength > 0
      ? calendarToString(calendars.current[calendarsLength - 1])
      : currCalendarStr;

  const accountData = caculateAccumulation(rawData);

  /**
   *
   * @param {string} calendarStr
   */
  const selectCalendar = (calendarStr) => {
    const [yearStr, monthStr] = calendarStr.split("-");
    setSelectedCalendar({
      year: parseInt(yearStr),
      month: parseInt(monthStr),
    });
  };

  /**
   *
   * @param {{
   *   date: int,
   *   amount: int,
   *   title: string,
   *   content: string | undefined,
   * }} updatedData
   * @param {int} index
   */
  const editData = (updatedData, index) => {
    const updatedRawData = [...rawData];
    updatedRawData[index] = updatedData;
    updateRawDataToFiles(selectedCalendar, updatedRawData);
    setRawData(updatedRawData);
  };

  /**
   *
   * @param {int} index
   * @returns
   */
  const openInsertDataModal = (index) => setNewAccountRowIndex(index);

  const closeInsertDataModal = () => setNewAccountRowIndex(-1);

  /**
   *
   * @param {{
   *   date: int,
   *   amount: int,
   *   title: string,
   *   content: string | undefined,
   * }} newData
   * @param {int} index
   */
  const insertData = (newData, index = newAccountRowIndex) => {
    const updatedRawData = [...rawData.splice(0, index), newData, ...rawData];
    updateRawDataToFiles(selectedCalendar, updatedRawData);
    setRawData(updatedRawData);
  };

  /**
   *
   * @param {int} index
   */
  const removeData = (index) => {
    const updatedRawData = rawData.filter((_, _index) => _index !== index);
    updateRawDataToFiles(selectedCalendar, updatedRawData);
    setRawData(updatedRawData);
  };

  return (
    <>
      <h1>잔고: {currencyOf(currAccumulation)}</h1>
      <input
        style={{ fontSize: "2.5em", fontWeight: "bold" }}
        type={"month"}
        defaultValue={calendarToString(selectedCalendar)}
        min={minCalendarStr}
        max={maxCalendarStr}
        onChange={({ target: { value: calendarStr } }) =>
          selectCalendar(calendarStr)
        }
      />
      <BorderedTable>
        <thead style={{ backgroundColor: "lightGrey" }}>
          <tr>
            <BorderedTh width={"7%"} />
            <BorderedTh width={"7%"}>날짜</BorderedTh>
            <BorderedTh width={"12%"}>수입</BorderedTh>
            <BorderedTh width={"12%"}>지출</BorderedTh>
            <BorderedTh width={"14%"}>계</BorderedTh>
            <BorderedTh width={"14%"}>항목</BorderedTh>
            <BorderedTh width={"auto"}>비고</BorderedTh>
          </tr>
        </thead>
        <tbody>
          {[...accountData, {}].map((data, index) => (
            <AccountRow
              calendar={selectedCalendar}
              data={data}
              index={index}
              key={data.date + data.title + index}
              editData={(updatedData) => editData(updatedData, index)}
              openInsertDataModal={() => openInsertDataModal(index)}
              removeData={() => removeData(index)}
            />
          ))}
        </tbody>
      </BorderedTable>
      <NewAccountRowModal
        isOpen={newAccountRowIndex >= 0}
        close={closeInsertDataModal}
        insertData={insertData}
      />
    </>
  );
};

export default Account;
