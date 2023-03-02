export const getColoredNumberStyle = (
  value: number
): { color: "red" | "blue" | "black" } => ({
  color: value > 0 ? "red" : value < 0 ? "blue" : "black",
});

export const getColoredBackgroundByNumberStyle = (
  value: number
): {
  backgroundColor: "lightred" | "lightblue" | "white";
} => ({
  backgroundColor: value > 0 ? "lightred" : value < 0 ? "lightblue" : "white",
});
