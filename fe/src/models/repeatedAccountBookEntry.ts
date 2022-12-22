import { FieldRemoved } from "../utils/typeUtils";
import { DayOfWeek } from "./calendar";

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
