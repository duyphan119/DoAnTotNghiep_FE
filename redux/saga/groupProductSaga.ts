import { call, put, takeEvery } from "redux-saga/effects";
import { GroupProductParams } from "../../types/params";
import {
  GroupProductHeaderModel,
  GroupProductModel,
  ResponseGetAllModel,
} from "../../models";
import { GroupProductApi, GroupProductHeaderApi } from "../../api";
import { fetchActions } from "../slice/fetchSlice";
import {
  groupProductActions,
  groupProductReducer,
} from "../slice/groupProductSlice";
import { ActionPayload } from "../store";
import { CreateGroupProductDTO } from "../../types/dtos";

const gpApi = new GroupProductApi();
const gphApi = new GroupProductHeaderApi();

function* fetchGetAll({ payload: params }: ActionPayload<GroupProductParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchGetAll));
    const data: ResponseGetAllModel<GroupProductModel> = yield call(() =>
      gpApi.getAll(params)
    );
    isError = false;
    yield put(groupProductActions.setGroupProductData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}
function* fetchGetRelated({
  payload: params,
}: ActionPayload<GroupProductParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchGetAll));
    const data: ResponseGetAllModel<GroupProductModel> = yield call(() =>
      gpApi.getAll(params)
    );
    isError = false;
    yield put(groupProductActions.setRelatedGroupProductData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchGetGroupProductHeaders() {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchGetAll));
    const data: GroupProductHeaderModel[] = yield call(() => gphApi.getAll());
    isError = false;
    yield put(groupProductActions.setGroupProductHeaders(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchCreate({
  payload: { files, dto },
}: ActionPayload<{ files: FileList | null; dto: CreateGroupProductDTO }>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchCreate));
    const data: GroupProductModel = yield call(() =>
      gpApi.create({ files, dto })
    );
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchUpdate({
  payload: { id, dto, files },
}: ActionPayload<{
  id: number;
  files: FileList | null;
  dto: CreateGroupProductDTO;
}>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchUpdate));
    const data: GroupProductModel = yield call(() =>
      gpApi.update({ id, files, dto })
    );
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchSoftDeleteSingle));
    const result: boolean = yield call(() => gpApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(groupProductActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchGetById));
    const data: GroupProductModel = yield call(() => gpApi.getById(id));
    if (data) {
      isError = false;
      yield put(groupProductActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchSoftDeleteMultiple({ payload: ids }: ActionPayload<number[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(groupProductReducer.fetchSoftDeleteMultiple));
    const result: boolean = yield call(() => gpApi.softDeleteMultiple(ids));
    if (result) {
      isError = false;
      yield put(groupProductActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("error:::", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

export function* groupProductSaga() {
  yield takeEvery(groupProductReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(
    groupProductReducer.fetchGetGroupProductHeaders,
    fetchGetGroupProductHeaders
  );
  yield takeEvery(groupProductReducer.fetchCreate, fetchCreate);
  yield takeEvery(groupProductReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(
    groupProductReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(
    groupProductReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
  yield takeEvery(groupProductReducer.fetchGetById, fetchGetById);
  yield takeEvery(groupProductReducer.fetchGetRelated, fetchGetRelated);
}
