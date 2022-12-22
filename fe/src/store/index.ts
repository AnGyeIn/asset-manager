import { configureStore } from "@reduxjs/toolkit";
import titlesDescriptionsReducer from "./slices/titlesDescriptionsSlice";

export const store = configureStore({
  reducer: {
    titlesDescriptions: titlesDescriptionsReducer,
  },
});
