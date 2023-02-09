import { call, put, takeEvery } from "redux-saga/effects";
import {
  createAdvertisement,
  deleteAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  restoreAdvertisement,
  softDeleteAdvertisement,
  updateAdvertisement,
} from "../../apis/advertisement";
import { ProductQueryParams } from "../../apis/product";
import { uploadSingle } from "../../apis/upload";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  CreateAdvertisementPayload,
  advertisementActions,
  advertisementReducers,
  UpdateAdvertisementPayload,
} from "../slice/advertisementSlice";
import { ActionPayload } from "../store";

function* fetchGetAllAdvertisement({
  payload,
}: ActionPayload<ProductQueryParams>): any {
  try {
    const { message, data } = yield call(() => getAllAdvertisements(payload));

    yield put(
      advertisementActions.setAdvertisementData(
        message === MSG_SUCCESS ? data : { items: 0, count: 0 }
      )
    );

    yield put(advertisementActions.fetchSuccess());
  } catch (error) {
    console.log("advertisementActions.fetchGetAllAdvertisement", error);
    yield put(advertisementActions.fetchError());
  }
}

function* fetchCreateAdvertisement({
  payload,
}: ActionPayload<CreateAdvertisementPayload>) {
  let isError = true;
  try {
    const { files, dto } = payload;
    let url = "";
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        url = dataImage.secure_url;
      }
    }
    const { message: msg } = yield call(() =>
      createAdvertisement({
        ...dto,
        ...(url !== "" ? { path: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(advertisementActions.fetchSuccess());
      yield put(advertisementActions.back());
    }
  } catch (error) {
    console.log("advertisementActions.fetchCreateAdvertisement", error);
  }
  if (isError) yield put(advertisementActions.fetchError());
}

function* fetchUpdateAdvertisement({
  payload,
}: ActionPayload<UpdateAdvertisementPayload>) {
  let isError = true;
  try {
    const { files, dto, id } = payload;
    let url = "";
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        url = dataImage.secure_url;
      }
    }
    const { message: msg } = yield call(() =>
      updateAdvertisement(id, {
        ...dto,
        ...(url !== "" ? { path: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(advertisementActions.fetchSuccess());
      yield put(advertisementActions.back());
    }
  } catch (error) {
    console.log("advertisementActions.fetchUpdateAdvertisement", error);
  }
  if (isError) yield put(advertisementActions.fetchError());
}

function* fetchGetAdvertisementById({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getAdvertisementById(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(advertisementActions.fetchSuccess());
      yield put(advertisementActions.setAdvertisementEditting(data));
    }
  } catch (error) {
    console.log("advertisementActions.fetchGetAdvertisementById", error);
  }
  if (isError) yield put(advertisementActions.fetchError());
}

function* fetchDeleteAdvertisement({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => deleteAdvertisement(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(advertisementActions.fetchSuccess());
      yield put(advertisementActions.deleted());
    }
  } catch (error) {
    console.log("advertisementActions.fetchDeleteAdvertisement", error);
  }
  if (isError) yield put(advertisementActions.fetchError());
}

export function* advertisementSaga() {
  yield takeEvery(
    advertisementReducers.fetchGetAllAdvertisement,
    fetchGetAllAdvertisement
  );
  yield takeEvery(
    advertisementReducers.fetchCreateAdvertisement,
    fetchCreateAdvertisement
  );
  yield takeEvery(
    advertisementReducers.fetchUpdateAdvertisement,
    fetchUpdateAdvertisement
  );
  yield takeEvery(
    advertisementReducers.fetchGetAdvertisementById,
    fetchGetAdvertisementById
  );
  yield takeEvery(
    advertisementReducers.fetchDeleteAdvertisement,
    fetchDeleteAdvertisement
  );
}
