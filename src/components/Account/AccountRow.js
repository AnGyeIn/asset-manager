import { currencyOf } from "../../utils/stringFormat";
import BorderedTd from "../common/BorderedTd";
import { CgRemove, CgAdd } from "react-icons/cg";

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
 *   openInsertDataModal: () => {},
 *   removeData: () => {},
 * }}
 * @returns
 */
const AccountRow = ({
  calendar: { year: selectedYear, month: selectedMonth },
  data: { date, amount, accumulation, title, content },
  index,
  openInsertDataModal,
  removeData,
}) => {
  const today = new Date();
  const isPast =
    selectedYear < today.getFullYear() ||
    selectedMonth < today.getMonth() + 1 ||
    date <= today.getDate();

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
        {index > 0 && accumulation !== undefined && (
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
      {/* TODO: input으로 교체 */}
      <BorderedTd textAlign={"center"}>{date}</BorderedTd>
      <BorderedTd textAlign={"right"} color={"red"}>
        {amount >= 0 ? currencyOf(amount) : ""}
      </BorderedTd>
      <BorderedTd textAlign={"right"} color={"blue"}>
        {amount < 0 ? currencyOf(-amount) : ""}
      </BorderedTd>
      <BorderedTd textAlign={"right"}>
        {accumulation && currencyOf(accumulation)}
      </BorderedTd>
      <BorderedTd textAlign={"center"}>{title}</BorderedTd>
      <BorderedTd>{content}</BorderedTd>
    </tr>
  );
};

export default AccountRow;
