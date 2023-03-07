import { createSlice } from "@reduxjs/toolkit";
import { CreateAdvertisementDTO } from "../../apis/advertisement";
import { AdvertisementModel, ResponseGetAllModel } from "../../models";
import { AdvertisementParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

type State = {
  advertisementData: ResponseGetAllModel<AdvertisementModel>;
  current: AdvertisementModel;
  isDeleted: boolean;
};

const NAME_SLICE = "advertisement";

const INITIAL_STATE: State = {
  advertisementData: new ResponseGetAllModel(),
  current: new AdvertisementModel(),
  isDeleted: false,
};

const advertisementSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<AdvertisementParams>) => {},
    setAdvertisementData: (
      state,
      action: ActionPayload<ResponseGetAllModel<AdvertisementModel>>
    ) => {
      state.advertisementData = action.payload;
    },
    deleted: (state) => {
      state.isDeleted = true;
    },
    fetchCreate: (
      state,
      action: ActionPayload<{
        files: FileList | null;
        dto: CreateAdvertisementDTO;
      }>
    ) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        files: FileList | null;
        dto: CreateAdvertisementDTO;
      }>
    ) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    setCurrent: (state, action: ActionPayload<AdvertisementModel>) => {
      state.current = action.payload;
    },
    fetchDelete: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
    },
  },
});

export const advertisementReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchDeleteSingle: `${NAME_SLICE}/fetchDeleteSingle`,
};
export const advertisementActions = advertisementSlice.actions;
export const advertisementSelector = (state: RootState): State =>
  state.advertisement;
export default advertisementSlice.reducer;
