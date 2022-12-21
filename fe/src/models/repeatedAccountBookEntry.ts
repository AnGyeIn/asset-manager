import { FieldRemoved } from "../utils/typeUtils";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

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
