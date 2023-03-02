import { StocksAccount, StocksLiveInfo } from "../../../../../models/stocks";

export type StocksAccountProps = {
  stocksAccount: StocksAccount;
  stocksLiveInfos: StocksLiveInfo[];
  stocksAccountTotalValue: number;
  reload: () => void;
};
