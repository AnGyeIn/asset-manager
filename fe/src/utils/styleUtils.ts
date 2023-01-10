export const getColoredNumberStyle = (
  value: number
): { color: "red" | "blue" | "black" } => ({
  color: value > 0 ? "red" : value < 0 ? "blue" : "black",
});
