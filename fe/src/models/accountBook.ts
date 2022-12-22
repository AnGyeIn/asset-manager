import { FieldRemoved } from "../utils/typeUtils";

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

export type TitlesDescriptions = {
  titles: string[];
  descriptions: string[];
};
