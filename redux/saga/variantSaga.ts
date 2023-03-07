import { call, put, takeEvery } from "redux-saga/effects";
import { VariantApi } from "../../api";
import { VariantModel, ResponseGetAllModel } from "../../models";
import { VariantParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { variantActions, variantReducer } from "../slice/variantSlice";
import { ActionPayload } from "../store";

const vApi = new VariantApi();

function* fetchGetAll({ payload }: ActionPayload<VariantParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(variantReducer.fetchGetAll));
    const data: ResponseGetAllModel<VariantModel> = yield call(() =>
      vApi.getAll(payload)
    );
    isError = false;
    yield put(variantActions.setVariantData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("variantSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* variantSaga() {
  yield takeEvery(variantReducer.fetchGetAll, fetchGetAll);
}
