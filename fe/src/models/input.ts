export type AccountBookEntryTableRowInput = {
  date: number;
  amount: number;
  title: string;
  description: string;
};

export type RepeatedAccountBookEntryTableRowInput = {
  date?: number;
  dayOfWeek?: number;
  amount: number;
};

export type AnyInput = AccountBookEntryTableRowInput &
  RepeatedAccountBookEntryTableRowInput;
