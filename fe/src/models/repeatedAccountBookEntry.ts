export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface RepeatedAccountBookEntryUpdate {
  date?: number;
  dayOfWeek?: DayOfWeek;
  amount: number;
  title?: string;
  description?: string;
}

export interface RepeatedAccountBookEntry
  extends RepeatedAccountBookEntryUpdate {
  repeatedAccountBookEntryId: number;
}
