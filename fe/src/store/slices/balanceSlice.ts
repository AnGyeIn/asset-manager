import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Balance } from "../../models/store";

const initialState: Balance = {
  currBalance: 0,
  unavailableBalance: 0,
  availableBalance: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setCurrBalance: (
      state,
      { payload: currBalance }: PayloadAction<number>
    ) => {
      state.currBalance = currBalance;
      state.availableBalance = Math.max(
        0,
        currBalance - state.unavailableBalance
      );
    },
    setUnavailableBalance: (
      state,
      { payload: unavailableBalance }: PayloadAction<number>
    ) => {
      state.unavailableBalance = unavailableBalance;
      state.availableBalance = Math.max(
        0,
        state.currBalance - unavailableBalance
      );
    },
  },
});

export const { setCurrBalance, setUnavailableBalance } = balanceSlice.actions;

const balanceReducer = balanceSlice.reducer;
export default balanceReducer;
