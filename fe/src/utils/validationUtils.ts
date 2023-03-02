export const isValidNumber = (num?: number | null) =>
  num !== undefined && num !== null && !Number.isNaN(num);

export const zeroIfInvalidNumber = (num?: number | null) =>
  isValidNumber(num) ? num! : 0;

export const safeDivision = (dividend: number, divider: number) =>
  dividend / Math.max(divider, 1);
