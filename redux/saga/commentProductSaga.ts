import { call, put, takeEvery } from "redux-saga/effects";
import CommentProductApi from "../../api/CommentProductApi";
import { CommentProductModel, ResponseGetAllModel } from "../../models";
import { CommentProductParams } from "../../types/params";
import {
  commentProductActions,
  commentProductReducer,
} from "../slice/commentProductSlice";
import { fetchActions } from "../slice/fetchSlice";
import { ActionPayload } from "../store";

const cpApi = new CommentProductApi();

function* fetchGetAll({
  payload: params,
}: ActionPayload<CommentProductParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(commentProductReducer.fetchGetAll));

    const data: ResponseGetAllModel<CommentProductModel> = yield call(() =>
      cpApi.getAll(params)
    );
    isError = false;
    yield put(commentProductActions.setCommentProductData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("commentProductReducer.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* commentProductSaga() {
  yield takeEvery(commentProductReducer.fetchGetAll, fetchGetAll);
}
