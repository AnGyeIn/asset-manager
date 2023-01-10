import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./slices/balanceSlice";
import titlesDescriptionsReducer from "./slices/titlesDescriptionsSlice";

export const store = configureStore({
  reducer: {
    titlesDescriptions: titlesDescriptionsReducer,
    balance: balanceReducer,
  },
});
