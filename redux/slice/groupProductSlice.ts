import { createSlice } from "@reduxjs/toolkit";
import { GroupProductParams } from "../../types/params";
import {
  GroupProductHeaderModel,
  GroupProductModel,
  ResponseGetAllModel,
} from "../../models";
import { ActionPayload, RootState } from "@/redux/store";
import { CreateGroupProductDTO } from "../../types/dtos";

const NAME_SLICE = "groupProduct";

type State = {
  groupProductData: ResponseGetAllModel<GroupProductModel>;
  relatedGroupProductData: ResponseGetAllModel<GroupProductModel>;
  groupProductHeaders: GroupProductHeaderModel[];
  current: GroupProductModel;
  isDeleted: boolean;
};

const INITIAL_STATE: State = {
  groupProductData: new ResponseGetAllModel(),
  relatedGroupProductData: new ResponseGetAllModel(),
  groupProductHeaders: [],
  current: new GroupProductModel(),
  isDeleted: false,
};

export const groupProductSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<GroupProductParams>) => {},
    fetchGetRelated: (state, action: ActionPayload<GroupProductParams>) => {},
    fetchGetGroupProductHeaders: (state) => {},
    setGroupProductData: (
      state,
      action: ActionPayload<ResponseGetAllModel<GroupProductModel>>
    ) => {
      state.groupProductData = action.payload;
    },
    setRelatedGroupProductData: (
      state,
      action: ActionPayload<ResponseGetAllModel<GroupProductModel>>
    ) => {
      state.relatedGroupProductData = action.payload;
    },
    setGroupProductHeaders: (
      state,
      action: ActionPayload<GroupProductHeaderModel[]>
    ) => {
      state.groupProductHeaders = action.payload;
    },
    fetchCreate: (
      state,
      action: ActionPayload<{
        files: FileList | null;
        dto: CreateGroupProductDTO;
      }>
    ) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        files: FileList | null;
        dto: Partial<CreateGroupProductDTO>;
      }>
    ) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
    },
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {
      state.isDeleted = false;
    },
    fetchGetById: (state, action: ActionPayload<number>) => {},
    deleted: (state) => {
      state.isDeleted = true;
    },
    setCurrent: (state, action: ActionPayload<GroupProductModel>) => {
      state.current = action.payload;
    },
  },
});
export const groupProductReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchGetGroupProductHeaders: `${NAME_SLICE}/fetchGetGroupProductHeaders`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchGetRelated: `${NAME_SLICE}/fetchGetRelated`,
};
export const groupProductSelector = (state: RootState): State =>
  state.groupProduct;
export const groupProductActions = groupProductSlice.actions;
export default groupProductSlice.reducer;
