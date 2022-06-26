const BorderedTable = ({ ...props }) => {
  return (
    <table
      style={{
        border: "2px solid black",
        borderCollapse: "collapse",
        fontSize: "1.3em",
        width: "100%",
        margin: "10px auto",
      }}
      {...props}
    />
  );
};

export default BorderedTable;
