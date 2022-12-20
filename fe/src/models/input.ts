interface DefaultInput {
  [label: string]: string | number;
}

export interface AccountBookEntryRowInput extends DefaultInput {
  date: number;
  amount: number;
  title: string;
  description: string;
}

export type AnyInput = AccountBookEntryRowInput;
