import { call, put, takeEvery } from "redux-saga/effects";
import { UserApi } from "../../api";
import { ResponseGetAllModel, UserModel } from "../../models";
import { UserParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { userActions, userReducer } from "../slice/userSlice";
import { ActionPayload } from "../store";

const uApi = new UserApi();

function* fetchGetAll({ payload: params }: ActionPayload<UserParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(userReducer.fetchGetAll));

    const data: ResponseGetAllModel<UserModel> = yield call(() =>
      uApi.getAll(params)
    );
    isError = false;
    yield put(userActions.setUserData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log(error);
  }

  if (isError) yield put(fetchActions.endAndError());
}

export function* userSaga() {
  yield takeEvery(userReducer.fetchGetAll, fetchGetAll);
}
