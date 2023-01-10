import { configureStore } from "@reduxjs/toolkit";
import currBalanceReducer from "./slices/currBalanceSlice";
import titlesDescriptionsReducer from "./slices/titlesDescriptionsSlice";

export const store = configureStore({
  reducer: {
    titlesDescriptions: titlesDescriptionsReducer,
    currBalance: currBalanceReducer,
  },
});
