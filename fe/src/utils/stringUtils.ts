import { YearMonthDate } from "../models/calendar";

/**
 *
 * @param num
 * @returns 'MM' | 'DD'
 */
export const getZeroPaddedNumber = (num: number) =>
  num.toString().padStart(2, "0");

/**
 *
 * @param yearMonthDate
 * @returns 'YYYY-MM-DD'
 */
export const getDateStringFrom = ({ year, month, date }: YearMonthDate) =>
  `${year}-${getZeroPaddedNumber(month)}-${getZeroPaddedNumber(date)}`;

const numberFormat = new Intl.NumberFormat();
export const getCurrencyStringFrom = (amount: number) =>
  numberFormat.format(amount);
