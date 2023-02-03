import { createSlice } from "@reduxjs/toolkit";
import {
  CreateGroupProductDTO,
  GroupProductQueryParams,
} from "../../apis/groupProduct";
import { formatDateTime } from "../../utils/helpers";
import {
  FetchState,
  GroupProduct,
  GroupProductHeader,
  ResponseItems,
} from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "groupProduct";

export type CreateGroupProductPayload = {
  dto: CreateGroupProductDTO;
} & Partial<{ files: FileList | null }>;
export type UpdateGroupProductPayload = {
  id: number;
} & Partial<CreateGroupProductPayload>;

type GroupProductManagementState = {
  groupProductData: ResponseItems<GroupProduct>;
  openModalPVI: boolean;
  openModalPV: boolean;
  openModalPreview: boolean;
  current: GroupProduct | null;
  openDialog: boolean;
  headerData: GroupProductHeader[];
  isBack: boolean;
  groupProductEditing: GroupProduct | null;
  isDeleted: boolean;
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
  isBack: false,
  groupProductEditing: null,
  isDeleted: false,
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
      state.isBack = false;
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
    showDialog: (state, action: ActionPayload<GroupProduct>) => {
      state.current = action.payload;
      state.openDialog = true;
    },
    hideDialog: (state) => {
      state.current = null;
      state.openDialog = false;
    },
    fetchCreateGroupProduct: (
      state,
      action: ActionPayload<CreateGroupProductPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    fetchHeaderData: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    setHeaderData: (state, action: ActionPayload<GroupProductHeader[]>) => {
      state.headerData = action.payload;
    },
    back: (state) => {
      state.isBack = true;
    },
    fetchUpdateGroupProduct: (
      state,
      action: ActionPayload<UpdateGroupProductPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    setGroupProductEditing: (
      state,
      action: ActionPayload<GroupProduct | null>
    ) => {
      state.groupProductEditing = action.payload;
    },
    fetchGetGroupProductById: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchDeleteGroupProduct: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
      state.isDeleted = false;
    },
    fetchSoftDeleteGroupProduct: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchRestoreGroupProduct: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    deleted: (state) => {
      state.isDeleted = true;
    },
    restore: (state, action: ActionPayload<number>) => {
      const index = state.groupProductData.items.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1) {
        state.groupProductData.items[index].deletedAt = null;
      }
    },
    softDelete: (state, action: ActionPayload<number>) => {
      const index = state.groupProductData.items.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1) {
        state.groupProductData.items[index].deletedAt =
          new Date().toISOString();
      }
    },
  },
});

export const groupProductManagementReducers = {
  fetchGroupProductData: `${NAME_SLICE}/fetchGroupProductData`,
  fetchCreateGroupProduct: `${NAME_SLICE}/fetchCreateGroupProduct`,
  fetchHeaderData: `${NAME_SLICE}/fetchHeaderData`,
  fetchGetGroupProductById: `${NAME_SLICE}/fetchGetGroupProductById`,
  fetchUpdateGroupProduct: `${NAME_SLICE}/fetchUpdateGroupProduct`,
  fetchDeleteGroupProduct: `${NAME_SLICE}/fetchDeleteGroupProduct`,
  fetchSoftDeleteGroupProduct: `${NAME_SLICE}/fetchSoftDeleteGroupProduct`,
  fetchRestoreGroupProduct: `${NAME_SLICE}/fetchRestoreGroupProduct`,
};
export const groupProductManagementSelector = (state: RootState): State =>
  state.groupProductManagement;
export const groupProductManagementActions =
  groupProductManagementSlice.actions;
export default groupProductManagementSlice.reducer;
