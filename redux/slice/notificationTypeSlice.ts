import { NotificationTypeModel, ResponseGetAllModel } from "@/models";
import { CreateNotificationTypeDTO } from "@/types/dtos";
import { NotificationTypeParams } from "@/types/params";
import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "../store";

type State = {
  notificationTypeData: ResponseGetAllModel<NotificationTypeModel>;
  current: NotificationTypeModel;
};

const NAME_SLICE = "notificationType";

const INITIAL_STATE: State = {
  notificationTypeData: new ResponseGetAllModel(),
  current: new NotificationTypeModel(),
};

const notificationTypeSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<NotificationTypeParams>) => {},
    fetchCreate: (
      state,
      action: ActionPayload<{
        files: FileList | null;
        dto: CreateNotificationTypeDTO;
      }>
    ) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        files: FileList | null;
        dto: Partial<CreateNotificationTypeDTO>;
      }>
    ) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {},

    setNotificationTypeData: (
      state,
      { payload }: ActionPayload<ResponseGetAllModel<NotificationTypeModel>>
    ) => {
      state.notificationTypeData = payload;
    },
    setCurrent: (state, { payload }: ActionPayload<NotificationTypeModel>) => {
      state.current = payload;
    },
  },
});

export const notificationTypeReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
};

export const notificationTypeActions = notificationTypeSlice.actions;

export const notificationTypeSelector = (state: RootState): State =>
  state.notificationType;

export default notificationTypeSlice.reducer;
