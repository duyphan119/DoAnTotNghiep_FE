import { ActionPayload } from "@/redux/store";
import { CreateVariantValueDTO } from "@/types/dtos";
import {
  MSG_CREATE_FAIL,
  MSG_CREATE_SUCCESS,
  MSG_UPDATE_FAIL,
  MSG_UPDATE_SUCCESS,
} from "@/utils/constants";
import { call, put, takeEvery } from "redux-saga/effects";
import { VariantValueApi } from "../../api";
import { ResponseGetAllModel, VariantValueModel } from "../../models";
import { VariantValueParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import {
  variantValueActions,
  variantValueReducer,
} from "../slice/variantValueSlice";

const vApi = new VariantValueApi();

function* fetchGetAll({ payload: params }: ActionPayload<VariantValueParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchGetAll));
    const data: ResponseGetAllModel<VariantValueModel> = yield call(() =>
      vApi.getAll(params)
    );
    isError = false;
    yield put(variantValueActions.setVariantValueData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("variantValueSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchGetById));
    const data: VariantValueModel = yield call(() => vApi.getById(id));
    if (data.id > 0) {
      isError = false;
      yield put(variantValueActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("variantValueSaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchCreate({ payload: dto }: ActionPayload<CreateVariantValueDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchCreate));
    const data: VariantValueModel = yield call(() => vApi.create(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndResetForm());
      yield put(snackbarActions.success(MSG_CREATE_SUCCESS));
    }
  } catch (error) {
    console.log("variantValueSaga.fetchCreate error", error);
  }
  if (isError) {
    yield put(snackbarActions.error(MSG_CREATE_FAIL));
    yield put(fetchActions.endAndError());
  }
}
function* fetchUpdate({
  payload: { id, dto },
}: ActionPayload<{ id: number; dto: CreateVariantValueDTO }>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchUpdate));
    const data: VariantValueModel = yield call(() => vApi.update({ id, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndResetForm());
      yield put(snackbarActions.success(MSG_UPDATE_SUCCESS));
    }
  } catch (error) {
    console.log("variantValueSaga.fetchUpdate error", error);
  }
  if (isError) {
    yield put(snackbarActions.success(MSG_UPDATE_FAIL));
    yield put(fetchActions.endAndError());
  }
}
function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchSoftDeleteSingle));
    const result: boolean = yield call(() => vApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("variantValueSaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchSoftDeleteMultiple({
  payload: listId,
}: ActionPayload<number[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantValueReducer.fetchSoftDeleteMultiple));
    const result: boolean = yield call(() => vApi.softDeleteMultiple(listId));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("variantValueSaga.fetchSoftDeleteMultiple error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* variantValueSaga() {
  yield takeEvery(variantValueReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(variantValueReducer.fetchCreate, fetchCreate);
  yield takeEvery(variantValueReducer.fetchGetById, fetchGetById);
  yield takeEvery(variantValueReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(
    variantValueReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(
    variantValueReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
}
