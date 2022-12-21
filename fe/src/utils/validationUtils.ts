export const isValidNumber = (num?: number) =>
  num !== undefined && num !== null && !Number.isNaN(num);
