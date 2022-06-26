import { currencyOf } from "../../utils/stringFormat";
import BorderedTd from "../common/BorderedTd";
import { CgRemove, CgAdd } from "react-icons/cg";

const AccountRow = ({
  data: { date, amount, accumulation, title, content },
  addData,
  removeData,
}) => {
  return (
    <tr>
      <BorderedTd textAlign={"center"}>
        <CgAdd color="green" style={{ margin: "2" }} onClick={addData} />
        <CgRemove
          color="red"
          style={{ margin: "2" }}
          onClick={() => {
            if (window.confirm("삭제하시겠습니까?")) {
              removeData();
            }
          }}
        />
      </BorderedTd>
      <BorderedTd textAlign={"center"}>{date}</BorderedTd>
      <BorderedTd textAlign={"right"} color={"red"}>
        {amount >= 0 ? currencyOf(amount) : ""}
      </BorderedTd>
      <BorderedTd textAlign={"right"} color={"blue"}>
        {amount < 0 ? currencyOf(-amount) : ""}
      </BorderedTd>
      <BorderedTd textAlign={"right"}>{currencyOf(accumulation)}</BorderedTd>
      <BorderedTd textAlign={"center"}>{title}</BorderedTd>
      <BorderedTd>{content}</BorderedTd>
    </tr>
  );
};

export default AccountRow;
