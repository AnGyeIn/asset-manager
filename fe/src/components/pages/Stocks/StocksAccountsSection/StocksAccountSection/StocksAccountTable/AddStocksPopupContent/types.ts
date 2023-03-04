import { StocksCreate } from "../../../../../../../models/stocks";
import { FieldRemoved } from "../../../../../../../utils/typeUtils";

export type StocksCreateInput = FieldRemoved<StocksCreate, "stocksAccountId">;
