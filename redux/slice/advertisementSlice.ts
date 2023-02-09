import { createSlice } from "@reduxjs/toolkit";
import { Advertisement, FetchState, ResponseItems } from "../../utils/types";
import { ActionPayload, RootState } from "../store";
import {
  AdvertisementQueryParams,
  CreateAdvertisementDTO,
} from "../../apis/advertisement";

type State = {
  advertisementData: ResponseItems<Advertisement>;
  isBack: boolean;
  current: Advertisement | null;
  advertisementEditting: Advertisement | null;
  openDialog: boolean;
  isDeleted: boolean;
} & FetchState;

export type CreateAdvertisementPayload = {
  files: FileList | null;
  dto: CreateAdvertisementDTO;
};

export type UpdateAdvertisementPayload = CreateAdvertisementPayload & {
  id: number;
};

const NAME_SLICE = "advertisement";

const INITIAL_STATE: State = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  isBack: false,
  current: null,
  advertisementData: { items: [], count: 0 },
  advertisementEditting: null,
  openDialog: false,
  isDeleted: false,
};

const advertisementSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    showDialog: (state, action: ActionPayload<Advertisement | null>) => {
      state.openDialog = true;
      state.current = action.payload;
    },
    hideDialog: (state) => {
      state.openDialog = false;
      state.current = null;
    },
    fetchSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    fetchGetAllAdvertisement: (
      state,
      action: ActionPayload<AdvertisementQueryParams>
    ) => {
      state.isDeleted = false;
      state.isBack = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    setAdvertisementData: (
      state,
      action: ActionPayload<ResponseItems<Advertisement>>
    ) => {
      state.advertisementData = action.payload;
    },
    back: (state) => {
      state.isBack = true;
    },
    deleted: (state) => {
      state.isDeleted = true;
    },
    fetchCreateAdvertisement: (
      state,
      action: ActionPayload<CreateAdvertisementPayload>
    ) => {
      state.isDeleted = false;
      state.isBack = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    fetchUpdateAdvertisement: (
      state,
      action: ActionPayload<UpdateAdvertisementPayload>
    ) => {
      state.isDeleted = false;
      state.isBack = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    fetchGetAdvertisementById: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
      state.isBack = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    setAdvertisementEditting: (
      state,
      action: ActionPayload<Advertisement | null>
    ) => {
      state.advertisementEditting = action.payload;
    },
    fetchDeleteAdvertisement: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
      state.isBack = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
  },
});

export const advertisementReducers = {
  fetchGetAllAdvertisement: `${NAME_SLICE}/fetchGetAllAdvertisement`,
  fetchGetAdvertisementById: `${NAME_SLICE}/fetchGetAdvertisementById`,
  fetchCreateAdvertisement: `${NAME_SLICE}/fetchCreateAdvertisement`,
  fetchUpdateAdvertisement: `${NAME_SLICE}/fetchUpdateAdvertisement`,
  fetchDeleteAdvertisement: `${NAME_SLICE}/fetchDeleteAdvertisement`,
};
export const advertisementActions = advertisementSlice.actions;
export const advertisementSelector = (state: RootState): State =>
  state.advertisement;
export default advertisementSlice.reducer;
