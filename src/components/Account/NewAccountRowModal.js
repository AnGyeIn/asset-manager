import { useState, useEffect } from "react";
import Modal from "react-modal";
import { GiCancel } from "react-icons/gi";
import { CgAddR } from "react-icons/cg";

const FieldSpan = ({ ...props }) => (
  <>
    <div style={{ width: 100, display: "inline-block", textAlign: "center" }}>
      <span style={{ fontSize: "1.5em" }} {...props} />
    </div>
    <span style={{ fontSize: "1.5em" }}> : </span>
  </>
);

const StyledInput = ({ width, ...props }) => (
  <input
    style={{
      fontSize: "1.5em",
      WebkitAppearance: "none",
      width,
    }}
    {...props}
  />
);

const MarginedDiv = ({ ...props }) => <div style={{ margin: 10 }} {...props} />;

Modal.setAppElement("#root");

/**
 *
 * @param {{
 *   isOpen: boolean,
 *   close: () => {},
 *   insertData: (
 *     newData: {
 *       date: int,
 *       amount: int,
 *       title: string,
 *       content: string | undefined,
 *     }
 *   ) => {},
 * }}
 * @returns
 */
const NewAccountRowModal = ({ isOpen, close, insertData, ...props }) => {
  const [newData, setNewData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setNewData({});
    }
  }, [isOpen]);

  /**
   *
   * @param {'date' | 'amount' | 'title' | 'content'} key
   * @param {number | string} value
   */
  const updateNewData = (key, value) => {
    const updatedNewData = { ...newData };
    updatedNewData[key] = value;
    setNewData(updatedNewData);
  };

  const checkAndAddNewData = () => {
    const { date, amount, title } = newData;
    if (!date || !amount || !title) {
      alert("필수 정보 누락(날짜, 수입/지출, 항목)");
      return;
    }
    insertData(newData);
    close();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={close} {...props}>
      <div style={{ textAlign: "right" }}>
        <GiCancel size={50} onClick={close} />
      </div>
      <h1 style={{ textAlign: "center" }}>행 추가</h1>
      <div style={{ width: "70%", margin: "auto", paddingLeft: "30%" }}>
        <MarginedDiv>
          <FieldSpan>날짜</FieldSpan>
          <StyledInput
            width={50}
            type={"number"}
            min={1}
            max={31}
            onChange={({ target: { value } }) =>
              updateNewData("date", parseInt(value))
            }
          />
        </MarginedDiv>
        <MarginedDiv>
          <FieldSpan>수입/지출</FieldSpan>
          <StyledInput
            width={150}
            type={"number"}
            onChange={({ target: { value } }) =>
              updateNewData("amount", parseInt(value))
            }
          />
        </MarginedDiv>
        <MarginedDiv>
          <FieldSpan>항목</FieldSpan>
          <StyledInput
            onChange={({ target: { value } }) => updateNewData("title", value)}
          />
        </MarginedDiv>
        <MarginedDiv>
          <FieldSpan>비고</FieldSpan>
          <StyledInput
            onChange={({ target: { value } }) =>
              updateNewData("content", value)
            }
          />
        </MarginedDiv>
      </div>
      <div style={{ textAlign: "center" }}>
        <CgAddR
          style={{ color: "green" }}
          size={80}
          onClick={checkAndAddNewData}
        />
      </div>
    </Modal>
  );
};

export default NewAccountRowModal;
