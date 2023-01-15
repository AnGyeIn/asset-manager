import { FieldRemoved } from "../utils/typeUtils";

export type Preservation = {
  preservationId: number;
  amount: number;
  description?: string;
  active: boolean;
};

export type PreservationUpdate = FieldRemoved<Preservation, "preservationId">;

export type PreservationCreate = FieldRemoved<PreservationUpdate, "active">;

export type StocksType = "STOCKS" | "GOLD";

export type StocksCreate = {
  code: string;
  stocksAccountId: number;
  stocksType: StocksType;
};

export type StocksUpdate = {
  floatingStocksNum?: number;
  floatingCostPerStocks?: number;
  stocksNum?: number;
  cost?: number;
  isBeingManaged: boolean;
};

export type Stocks = FieldRemoved<StocksCreate, "stocksAccountId"> &
  StocksUpdate;

export type StocksAccount = {
  stocksAccountId: number;
  name?: string;
  cash: number;
  targetWeight: number;
  stocksList: Stocks[];
};

export type StocksAccountUpdate = FieldRemoved<
  StocksAccount,
  "stocksAccountId" | "stocksList"
>;

export type StocksLiveInfo = {
  name: string;
  price: number;
  floatingValue: number;
  value: number;
};
