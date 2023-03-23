import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetAllModel, VariantValueModel } from "../../models";
import { VariantValueParams } from "../../types/params";
import { ActionPayload, RootState } from "@/redux/store";
import { CreateVariantValueDTO } from "@/types/dtos";

type State = {
  variantValueData: ResponseGetAllModel<VariantValueModel>;
  current: VariantValueModel;
};

const NAME_SLICE = "variantValue";

const INITIAL_STATE: State = {
  variantValueData: new ResponseGetAllModel<VariantValueModel>(),
  current: new VariantValueModel(),
};

const variantValueSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<VariantValueParams>) => {},
    fetchCreate: (state, action: ActionPayload<CreateVariantValueDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{ id: number; dto: CreateVariantValueDTO }>
    ) => {},
    setVariantValueData: (
      state,
      { payload }: ActionPayload<ResponseGetAllModel<VariantValueModel>>
    ) => {
      state.variantValueData = payload;
    },
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    setCurrent: (state, { payload }: ActionPayload<VariantValueModel>) => {
      state.current = payload;
    },
  },
});

export const variantValueReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
};
export const variantValueSelector = (state: RootState): State =>
  state.variantValue;
export const variantValueActions = variantValueSlice.actions;
export default variantValueSlice.reducer;
