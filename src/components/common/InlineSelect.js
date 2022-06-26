import Select from "react-select";

const InlineSelect = ({ width, ...selectProps }) => {
  return (
    <div style={{ display: "inline-block", width }}>
      <Select {...selectProps} />
    </div>
  );
};

export default InlineSelect;
