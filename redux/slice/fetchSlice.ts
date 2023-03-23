import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "@/redux/store";

const NAME_SLICE = "fetch";

type State = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reducer: string;
  isBack: boolean;
  reducers: string[];
  pathNavigate: string;
  deleted: boolean;
  resetForm: boolean;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  reducer: "",
  isBack: false,
  reducers: [],
  pathNavigate: "",
  deleted: false,
  resetForm: false,
};

const fetchSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    start: (state, { payload: name }: ActionPayload<string>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.reducer = name;
      state.isBack = false;
      state.deleted = false;
      state.reducers = [
        ...state.reducers.filter((name) => name !== name),
        name,
      ];
      state.resetForm = false;
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
    setBack: (state, { payload }: ActionPayload<boolean>) => {
      state.isBack = payload;
    },
    endAndSuccessAndBack: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isBack = true;
    },
    endAndSuccessAndNavigate: (state, { payload }: ActionPayload<string>) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.pathNavigate = payload;
    },
    endNavigate: (state) => {
      state.pathNavigate = "";
    },
    endAndSuccessAndDeleted: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.deleted = true;
    },
    endAndSuccessAndResetForm: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.resetForm = true;
    },
    endResetForm: (state) => {
      state.resetForm = false;
    },
  },
});

export const fetchActions = fetchSlice.actions;

export const fetchSelector = (state: RootState): State => state.fetch;

export default fetchSlice.reducer;
