import { call, put, takeEvery } from "redux-saga/effects";
import { VariantApi } from "../../api";
import { VariantModel, ResponseGetAllModel } from "../../models";
import { VariantParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { variantActions, variantReducer } from "../slice/variantSlice";
import { ActionPayload } from "@/redux/store";
import { CreateVariantDTO } from "@/types/dtos";

const vApi = new VariantApi();

function* fetchGetAll({ payload: params }: ActionPayload<VariantParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchGetAll));
    const data: ResponseGetAllModel<VariantModel> = yield call(() =>
      vApi.getAll(params)
    );
    isError = false;
    yield put(variantActions.setVariantData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("variantSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchGetById));
    const data: VariantModel = yield call(() => vApi.getById(id));
    if (data.id > 0) {
      isError = false;
      yield put(variantActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("variantSaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchCreate({ payload: dto }: ActionPayload<CreateVariantDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchCreate));
    const data: VariantModel = yield call(() => vApi.create(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("variantSaga.fetchCreate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchUpdate({
  payload: { id, dto },
}: ActionPayload<{ id: number; dto: CreateVariantDTO }>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchUpdate));
    const data: VariantModel = yield call(() => vApi.update({ id, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("variantSaga.fetchUpdate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchSoftDeleteSingle));
    const result: boolean = yield call(() => vApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("variantSaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}
function* fetchSoftDeleteMultiple({
  payload: listId,
}: ActionPayload<number[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchSoftDeleteMultiple));
    const result: boolean = yield call(() => vApi.softDeleteMultiple(listId));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("variantSaga.fetchSoftDeleteMultiple error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* variantSaga() {
  yield takeEvery(variantReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(variantReducer.fetchCreate, fetchCreate);
  yield takeEvery(variantReducer.fetchGetById, fetchGetById);
  yield takeEvery(variantReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(variantReducer.fetchSoftDeleteSingle, fetchSoftDeleteSingle);
  yield takeEvery(
    variantReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
}
