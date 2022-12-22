import { YearMonth, YearMonthDate } from "../models/calendar";
import { isValidNumber } from "./validationUtils";

/**
 *
 * @param num
 * @returns 'MM' | 'DD'
 */
export const getZeroPaddedNumber = (num: number) =>
  num.toString().padStart(2, "0");

/**
 *
 * @param yearMonth
 * @returns 'YYYY-MM'
 */
export const getMonthStringFrom = ({ year, month }: YearMonth) =>
  `${year}-${getZeroPaddedNumber(month)}`;

/**
 *
 * @param yearMonthDate
 * @returns 'YYYY-MM-DD'
 */
export const getDateStringFrom = ({ year, month, date }: YearMonthDate) =>
  `${getMonthStringFrom({ year, month })}-${getZeroPaddedNumber(date)}`;

const numberFormat = new Intl.NumberFormat();
export const getCurrencyStringFrom = (amount: number) =>
  isValidNumber(amount) ? numberFormat.format(amount) : "";

export const getCamelCaseFrom = (sentence: string) => {
  const words = sentence.split(" ");
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join("");
};

export const toStringFromNumber = (value: number) => value.toString();
