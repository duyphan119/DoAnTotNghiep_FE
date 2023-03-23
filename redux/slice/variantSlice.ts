import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetAllModel, VariantModel } from "../../models";
import { VariantParams } from "../../types/params";
import { ActionPayload, RootState } from "@/redux/store";
import { CreateVariantDTO } from "@/types/dtos";

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
    fetchCreate: (state, action: ActionPayload<CreateVariantDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{ id: number; dto: CreateVariantDTO }>
    ) => {},
    setVariantData: (
      state,
      { payload }: ActionPayload<ResponseGetAllModel<VariantModel>>
    ) => {
      state.variantData = payload;
    },
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    setCurrent: (state, { payload }: ActionPayload<VariantModel>) => {
      state.current = payload;
    },
  },
});

export const variantReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
};
export const variantSelector = (state: RootState): State => state.variant;
export const variantActions = variantSlice.actions;
export default variantSlice.reducer;
