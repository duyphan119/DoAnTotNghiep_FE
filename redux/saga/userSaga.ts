import { call, put, takeEvery } from "redux-saga/effects";
import { UserApi } from "../../api";
import { ResponseGetAllModel, UserModel } from "../../models";
import { UserParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { userActions, userReducer } from "../slice/userSlice";
import { ActionPayload } from "@/redux/store";
import { CreateUserDTO } from "@/types/dtos";
import { snackbarActions } from "../slice/snackbarSlice";

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

function* fetchCreate({ payload: dto }: ActionPayload<CreateUserDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(userReducer.fetchCreate));

    const data: UserModel = yield call(() => uApi.createOne(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndResetForm());
      yield put(snackbarActions.success("Thêm thành công"));
    }
  } catch (error) {
    console.log(error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
    yield put(snackbarActions.error("Thêm không thành công"));
  }
}

export function* userSaga() {
  yield takeEvery(userReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(userReducer.fetchCreate, fetchCreate);
}
