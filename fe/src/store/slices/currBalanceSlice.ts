import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const currBalanceSlice = createSlice({
  name: "currBalance",
  initialState,
  reducers: {
    setCurrBalance: (_, { payload: currBalance }: PayloadAction<number>) =>
      currBalance,
  },
});

export const { setCurrBalance } = currBalanceSlice.actions;

const currBalanceReducer = currBalanceSlice.reducer;
export default currBalanceReducer;
