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
