import { NotificationTypeApi } from "@/api";
import { NotificationTypeModel, ResponseGetAllModel } from "@/models";
import { ActionPayload } from "@/redux/store";
import { CreateNotificationTypeDTO } from "@/types/dtos";
import { NotificationTypeParams } from "@/types/params";
import { call, put, takeEvery } from "redux-saga/effects";
import { MSG_SUCCESS } from "@/utils/constants";
import {
  notificationTypeActions,
  notificationTypeReducer,
} from "@/redux/slice/notificationTypeSlice";
import { fetchActions } from "@/redux/slice/fetchSlice";

const ntApi = new NotificationTypeApi();

function* fetchGetAll({
  payload: params,
}: ActionPayload<NotificationTypeParams>) {
  let isError = true;
  yield put(fetchActions.start(notificationTypeReducer.fetchGetAll));
  try {
    const data: ResponseGetAllModel<NotificationTypeModel> = yield call(() =>
      ntApi.getAll(params)
    );
    isError = false;
    yield put(notificationTypeActions.setNotificationTypeData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("notificationTypeSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreate({
  payload: { files, dto },
}: ActionPayload<{ files: FileList | null; dto: CreateNotificationTypeDTO }>) {
  let isError = true;
  yield put(fetchActions.start(notificationTypeReducer.fetchCreate));
  try {
    const { message } = yield call(() => ntApi.create({ files, dto }));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("notificationTypeSaga.fetchCreate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdate({
  payload: { id, files, dto },
}: ActionPayload<{
  id: number;
  files: FileList | null;
  dto: Partial<CreateNotificationTypeDTO>;
}>) {
  let isError = true;
  yield put(fetchActions.start(notificationTypeReducer.fetchUpdate));
  try {
    const { message } = yield call(() => ntApi.update({ id, files, dto }));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("notificationTypeSaga.fetchUpdate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(notificationTypeReducer.fetchSoftDeleteSingle));
  try {
    const { message } = yield call(() => ntApi.softDeleteSingle(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("notificationTypeSaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteMultiple({
  payload: listId,
}: ActionPayload<number[]>) {
  let isError = true;
  yield put(
    fetchActions.start(notificationTypeReducer.fetchSoftDeleteMultiple)
  );
  try {
    const { message } = yield call(() => ntApi.softDeleteMultiple(listId));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("notificationTypeSaga.fetchSoftDeleteMultiple error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(notificationTypeReducer.fetchGetById));
  try {
    const { message, data } = yield call(() => ntApi.getById(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(notificationTypeActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("notificationTypeSaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* notificationTypeSaga() {
  yield takeEvery(notificationTypeReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(notificationTypeReducer.fetchCreate, fetchCreate);
  yield takeEvery(notificationTypeReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(
    notificationTypeReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(notificationTypeReducer.fetchGetById, fetchGetById);
  yield takeEvery(
    notificationTypeReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
}
