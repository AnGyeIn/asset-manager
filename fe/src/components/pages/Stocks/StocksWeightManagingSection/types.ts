import { StocksAccount } from "../../../../models/stocks";

export type StocksWeightManagingProps = {
  stocksAccounts: StocksAccount[];
  stocksAccountsTotalValues: number[];
  reload: () => void;
};
