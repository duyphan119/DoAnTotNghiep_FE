import { call, put, takeEvery } from "redux-saga/effects";
import { getAllVariants, VariantQueryParams } from "../../apis/variant";
import { MSG_SUCCESS } from "../../utils/constants";
import { variantActions, variantReducers } from "../slice/variantSlice";
import { ActionPayload } from "../store";

function* fetchGetAllVariants({ payload }: ActionPayload<VariantQueryParams>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getAllVariants(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(variantActions.setVariants(data.items));
    }
  } catch (error) {
    console.log("variantSaga.fetchGetAllVariants error", error);
  }
  if (isError) yield put(variantActions.fetchError);
}

export function* variantSaga() {
  yield takeEvery(variantReducers.fetchGetAllVariants, fetchGetAllVariants);
}
