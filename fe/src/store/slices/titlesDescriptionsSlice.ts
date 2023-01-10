import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TitlesDescriptions } from "../../models/store";

const initialState: TitlesDescriptions = {
  titles: [],
  descriptions: [],
};

export const titlesDesriptionsSlice = createSlice({
  name: "titlesDescriptions",
  initialState,
  reducers: {
    setTitlesDescriptions: (
      state,
      { payload: { titles, descriptions } }: PayloadAction<TitlesDescriptions>
    ) => {
      state.titles = titles;
      state.descriptions = descriptions;
    },
  },
});

export const { setTitlesDescriptions } = titlesDesriptionsSlice.actions;

const titlesDescriptionsReducer = titlesDesriptionsSlice.reducer;
export default titlesDescriptionsReducer;
