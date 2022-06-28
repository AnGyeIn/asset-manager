import { currencyOf } from "../../utils/stringFormat";
import BorderedTd from "../common/BorderedTd";
import { CgRemove, CgAdd } from "react-icons/cg";

const StyledInput = ({ textAlign, color, ...props }) => (
  <input
    style={{
      fontSize: "1em",
      width: "80%",
      WebkitAppearance: "none",
      textAlign,
      color,
    }}
    {...props}
  />
);

/**
 *
 * @param {int} amount
 * @returns
 */
const positiveCurrencyOf = (amount) => (amount > 0 ? currencyOf(amount) : "");

/**
 *
 * @param {int} amount
 * @returns
 */
const negativeCurrencyOf = (amount) => (amount < 0 ? currencyOf(-amount) : "");

/**
 *
 * @param {{
 *   calendar: {
 *     year: int,
 *     month: int,
 *   },
 *   data: {
 *     date: int,
 *     amount: int,
 *     accumulation: int,
 *     title: string,
 *     content: string | undefined,
 *   },
 *   index: int,
 *   editData: (updatedData: {
 *     date: int,
 *     amount: int,
 *     title: string,
 *     content: string | undefined,
 *   }) => {},
 *   openInsertDataModal: () => {},
 *   removeData: () => {},
 * }}
 * @returns
 */
const AccountRow = ({
  calendar: { year: selectedYear, month: selectedMonth },
  data: { date, amount, accumulation, title, content },
  index,
  editData,
  openInsertDataModal,
  removeData,
}) => {
  const today = new Date();
  const isPast =
    selectedYear < today.getFullYear() ||
    selectedMonth < today.getMonth() + 1 ||
    date <= today.getDate();
  const isEditable = index > 0 && accumulation !== undefined;

  /**
   *
   * @param {'date' | 'amount' | 'title' | 'content'} key
   * @param {string} value
   */
  const editFieldData = (key, value) => {
    switch (key) {
      case "date":
        value = parseInt(value);
        if (Number.isNaN(value) || value < 1 || value > 31) {
          console.error("date is not number or out of range");
          alert("날짜는 1~31의 숫자로 입력");
          return;
        }
        break;
      case "amount":
        value = parseInt(value.replaceAll(",", ""));
        if (Number.isNaN(value)) {
          console.error("amount is not number");
          alert("수입/지출은 숫자의 절댓값(콤마(,) 포함 가능)으로 입력");
          return;
        }
        break;
      case "title":
        if (value.length === 0) {
          console.error("title is empty");
          alert("항목은 필수 입력");
          return;
        }
        break;
    }
    const updatedData = { date, amount, title, content };
    updatedData[key] = value;
    editData(updatedData);
  };

  return (
    <tr style={isPast ? { backgroundColor: "lightblue" } : {}}>
      <BorderedTd textAlign={"center"}>
        {index > 0 && (
          <CgAdd
            color="green"
            style={{ margin: "2" }}
            onClick={openInsertDataModal}
          />
        )}
        {isEditable && (
          <CgRemove
            color="red"
            style={{ margin: "2" }}
            onClick={() => {
              if (window.confirm("삭제하시겠습니까?")) {
                removeData();
              }
            }}
          />
        )}
      </BorderedTd>
      <BorderedTd textAlign={"center"}>
        {isEditable ? (
          <StyledInput
            textAlign={"center"}
            defaultValue={date}
            onChange={({ target: { value } }) => editFieldData("date", value)}
          />
        ) : (
          date
        )}
      </BorderedTd>
      <BorderedTd textAlign={"right"} color={"red"}>
        {isEditable ? (
          <StyledInput
            textAlign={"right"}
            color={"red"}
            defaultValue={positiveCurrencyOf(amount)}
            onChange={({ target: { value } }) => editFieldData("amount", value)}
          />
        ) : (
          positiveCurrencyOf(amount)
        )}
      </BorderedTd>
      <BorderedTd textAlign={"right"} color={"blue"}>
        {isEditable ? (
          <StyledInput
            textAlign={"right"}
            color={"blue"}
            defaultValue={negativeCurrencyOf(amount)}
            onChange={({ target: { value } }) =>
              editFieldData("amount", "-" + value.replaceAll("-", ""))
            }
          />
        ) : (
          negativeCurrencyOf(amount)
        )}
      </BorderedTd>
      <BorderedTd textAlign={"right"}>
        {accumulation && currencyOf(accumulation)}
      </BorderedTd>
      <BorderedTd textAlign={"center"}>
        {isEditable ? (
          <StyledInput
            textAlign={"center"}
            defaultValue={title}
            onChange={({ target: { value } }) => editFieldData("title", value)}
          />
        ) : (
          title
        )}
      </BorderedTd>
      <BorderedTd>
        {isEditable ? (
          <StyledInput
            defaultValue={content}
            onChange={({ target: { value } }) =>
              editFieldData("content", value)
            }
          />
        ) : (
          content
        )}
      </BorderedTd>
    </tr>
  );
};

export default AccountRow;
