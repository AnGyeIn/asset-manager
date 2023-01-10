import { FieldRemoved } from "../utils/typeUtils";
import { DayOfWeek } from "./calendar";

export type AccountBookEntry = {
  accountBookEntryId: number;
  year: number;
  month: number;
  date: number;
  amount: number;
  title?: string;
  description?: string;
};

export type AccountBookEntryUpdate = FieldRemoved<
  AccountBookEntry,
  "accountBookEntryId" | "year" | "month"
>;

export type RepeatedAccountBookEntry = {
  repeatedAccountBookEntryId: number;
  date?: number;
  dayOfWeek?: DayOfWeek;
  amount: number;
  title?: string;
  description?: string;
};

export type RepeatedAccountBookEntryUpdate = FieldRemoved<
  RepeatedAccountBookEntry,
  "repeatedAccountBookEntryId"
>;
