export type YearsMonths = {
  [year: number]: number[];
};

export type YearMonth = {
  year: number;
  month: number;
};

export type YearMonthDate = YearMonth & {
  date: number;
};

export const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export type DayOfWeek = typeof daysOfWeek[number];
