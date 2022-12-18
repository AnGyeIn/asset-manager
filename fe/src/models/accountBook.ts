export interface AccountBookEntryUpdate {
  date: number;
  amount: number;
  title?: string;
  description?: string;
}

export interface AccountBookEntry extends AccountBookEntryUpdate {
  accountBookEntryId: number;
  year: number;
  month: number;
}
