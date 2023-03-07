import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetAllModel, VariantModel } from "../../models";
import { VariantParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

type State = {
  variantData: ResponseGetAllModel<VariantModel>;
  current: VariantModel;
};

const NAME_SLICE = "variant";

const INITIAL_STATE: State = {
  variantData: new ResponseGetAllModel<VariantModel>(),
  current: new VariantModel(),
};

const variantSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<VariantParams>) => {},
    setVariantData: (
      state,
      action: ActionPayload<ResponseGetAllModel<VariantModel>>
    ) => {
      state.variantData = action.payload;
    },
  },
});

export const variantReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
};
export const variantSelector = (state: RootState): State => state.variant;
export const variantActions = variantSlice.actions;
export default variantSlice.reducer;
