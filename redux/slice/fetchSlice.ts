import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "fetch";

type State = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reducer: string;
  isBack: boolean;
  reducers: string[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  reducer: "",
  isBack: false,
  reducers: [],
};

const fetchSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    start: (state, action: ActionPayload<string>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.reducer = action.payload;
      state.isBack = false;
      state.reducers = [
        ...state.reducers.filter((name) => name !== action.payload),
        action.payload,
      ];
    },
    endAndError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    endAndSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    back: (state) => {
      state.isBack = true;
    },
    endAndSuccessAndBack: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isBack = true;
    },
  },
});

export const fetchActions = fetchSlice.actions;

export const fetchSelector = (state: RootState): State => state.fetch;

export default fetchSlice.reducer;
