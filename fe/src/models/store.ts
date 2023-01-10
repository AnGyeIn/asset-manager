import { store } from "../store";

export type TitlesDescriptions = {
  titles: string[];
  descriptions: string[];
};

export type Balance = {
  currBalance: number;
  unavailableBalance: number;
  availableBalance: number;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
