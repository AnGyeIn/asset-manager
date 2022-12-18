export type YearsMonths = {
  [year: number]: number[];
};

export interface YearMonth {
  year: number;
  month: number;
}

export interface YearMonthDate extends YearMonth {
  date: number;
}
