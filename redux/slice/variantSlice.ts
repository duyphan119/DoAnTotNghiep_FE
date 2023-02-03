import { createSlice } from "@reduxjs/toolkit";
import { VariantQueryParams } from "../../apis/variant";
import { FetchState, Variant } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type State = {
  variants: Variant[];
} & FetchState;

const NAME_SLICE = "variant";

const INITIAL_STATE: State = {
  variants: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

const variantSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAllVariants: (state, action: ActionPayload<VariantQueryParams>) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    fetchSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    setVariants: (state, action: ActionPayload<Variant[]>) => {
      state.variants = action.payload;
    },
  },
});

export const variantReducers = {
  fetchGetAllVariants: `${NAME_SLICE}/fetchGetAllVariants`,
};
export const variantSelector = (state: RootState): State => state.variant;
export const variantActions = variantSlice.actions;
export default variantSlice.reducer;
