export const isValidNumber = (num?: number | null) =>
  num !== undefined && num !== null && !Number.isNaN(num);
