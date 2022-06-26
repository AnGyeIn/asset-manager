const BorderedTd = ({ textAlign, color, ...props }) => {
  return (
    <td
      style={{
        border: "1px solid black",
        padding: 5,
        textAlign,
        color,
      }}
      {...props}
    />
  );
};

export default BorderedTd;
