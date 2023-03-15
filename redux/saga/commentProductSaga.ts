import { call, put, takeEvery } from "redux-saga/effects";
import { RepCommentProductApi } from "../../api";
import CommentProductApi from "../../api/CommentProductApi";
import {
  CommentProductModel,
  RepCommentProductModel,
  ResponseGetAllModel,
} from "../../models";
import { CreateRepCommentProductDTO } from "../../types/dtos";
import { CommentProductParams } from "../../types/params";
import {
  commentProductActions,
  commentProductReducer,
} from "../slice/commentProductSlice";
import { fetchActions } from "../slice/fetchSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

const cpApi = new CommentProductApi();
const rcpApi = new RepCommentProductApi();

function* fetchGetAll({
  payload: params,
}: ActionPayload<CommentProductParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(commentProductReducer.fetchGetAll));
    const {
      commentProductData,
    }: {
      commentProductData: ResponseGetAllModel<CommentProductModel>;
      userCommentProduct: CommentProductModel;
    } = yield call(() => cpApi.getAll(params));
    isError = false;
    yield put(commentProductActions.setCommentProductData(commentProductData));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("commentProductReducer.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreateRep({
  payload: dto,
}: ActionPayload<CreateRepCommentProductDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(commentProductReducer.fetchCreateRep));
    const data: RepCommentProductModel = yield call(() =>
      rcpApi.createOne(dto)
    );
    if (data.id > 0) {
      isError = false;
      yield put(commentProductActions.createRep(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("commentProductReducer.fetchCreateRep error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateRep({
  payload: { id, dto },
}: ActionPayload<{ id: number; dto: CreateRepCommentProductDTO }>) {
  let isError = true;
  try {
    yield put(fetchActions.start(commentProductReducer.fetchUpdateRep));
    const data: RepCommentProductModel = yield call(() =>
      rcpApi.updateOne({ id, dto })
    );
    if (data.id > 0) {
      isError = false;
      yield put(commentProductActions.updateRep(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("commentProductReducer.fetchUpdateRep error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchDeleteRep({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(commentProductReducer.fetchDeleteRep));
    const isDeleted: boolean = yield call(() => rcpApi.deleteOne(id));
    if (isDeleted) {
      isError = false;
      yield put(commentProductActions.deleteRep(id));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("commentProductReducer.fetchDeleteRep error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* commentProductSaga() {
  yield takeEvery(commentProductReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(commentProductReducer.fetchCreateRep, fetchCreateRep);
  yield takeEvery(commentProductReducer.fetchUpdateRep, fetchUpdateRep);
  yield takeEvery(commentProductReducer.fetchDeleteRep, fetchDeleteRep);
}
