import { createSlice } from "@reduxjs/toolkit";
import { GroupProductQueryParams } from "../../apis/groupProduct";
import {
  FetchState,
  GroupProduct,
  GroupProductHeader,
  Product,
  ResponseItems,
} from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "groupProduct";

export type CreateGroupProductPayload = {};

type GroupProductManagementState = {
  groupProductData: ResponseItems<GroupProduct>;
  openModalPVI: boolean;
  openModalPV: boolean;
  openModalPreview: boolean;
  current: Product | null;
  openDialog: boolean;
  headerData: GroupProductHeader[];
};

type State = GroupProductManagementState & FetchState;

const INITIAL_STATE: State = {
  groupProductData: { items: [], count: 0 },
  openModalPVI: false,
  openModalPreview: false,
  openModalPV: false,
  openDialog: false,
  current: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  headerData: [],
};

export const groupProductManagementSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGroupProductData: (
      state,
      action: ActionPayload<GroupProductQueryParams>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    setGroupProductData: (
      state,
      action: ActionPayload<ResponseItems<GroupProduct>>
    ) => {
      const groupProductData = action.payload;
      state.groupProductData = groupProductData;
      state.isLoading = false;
      state.isSuccess = true;
    },
    showDialog: (state, action: ActionPayload<Product>) => {
      state.current = action.payload;
      state.openDialog = true;
    },
    fetchCreateGroupProduct: (
      state,
      action: ActionPayload<CreateGroupProductPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    fetchHeaderData: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    setHeaderData: (state, action: ActionPayload<GroupProductHeader[]>) => {
      state.headerData = action.payload;
    },
  },
});

export const groupProductManagementReducers = {
  fetchGroupProductData: `${NAME_SLICE}/fetchGroupProductData`,
  fetchCreateGroupProduct: `${NAME_SLICE}/fetchCreateGroupProduct`,
  fetchHeaderData: `${NAME_SLICE}/fetchHeaderData`,
};
export const groupProductManagementSelector = (state: RootState): State =>
  state.groupProductManagement;
export const groupProductManagementActions =
  groupProductManagementSlice.actions;
export default groupProductManagementSlice.reducer;
