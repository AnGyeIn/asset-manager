const BorderedTh = ({ width, ...props }) => {
  return <th style={{ border: "1px solid black", width }} {...props} />;
};

export default BorderedTh;
