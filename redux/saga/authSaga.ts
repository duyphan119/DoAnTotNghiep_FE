import { call, put, takeEvery } from "redux-saga/effects";
import {
  changeProfile,
  ChangeProfile,
  getProfile,
  login,
  LoginDTO,
  logout,
  register,
  RegisterDTO,
} from "../../apis/auth";
import { MSG_SUCCESS } from "../../utils/constants";
import { authActions, authReducers } from "../slice/authSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

function* fetchProfile() {
  try {
    const { message, data } = yield call(() => getProfile());
    yield put(authActions.setProfile(message === MSG_SUCCESS ? data : null));
  } catch (error) {
    console.log("authActions.fetchError", error);
    yield put(authActions.fetchError());
  }
}

function* fetchLogin({ payload }: ActionPayload<LoginDTO>) {
  try {
    const { message, data } = yield call(() => login(payload));
    if (message === MSG_SUCCESS) {
      yield put(authActions.login(data));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );
    } else yield put(authActions.fetchError());
  } catch (error) {
    console.log("authActions.fetchLogin", error);
    yield put(authActions.fetchError());
  }
}

function* fetchRegister({ payload }: ActionPayload<RegisterDTO>) {
  try {
    const { message, data } = yield call(() => register(payload));
    if (message === MSG_SUCCESS) {
      yield put(authActions.login(data));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );
    } else yield put(authActions.fetchError());
  } catch (error) {
    console.log("authActions.fetchLogin", error);
    yield put(authActions.fetchError());
  }
}

function* fetchChangeProfile({ payload }: ActionPayload<ChangeProfile>) {
  try {
    const { message, data } = yield call(() => changeProfile(payload));
    if (message === MSG_SUCCESS) {
      yield put(authActions.changeProfile(data));
      yield put(
        snackbarActions.show({ msg: "Cập nhật thành công", type: "success" })
      );
    } else yield put(authActions.fetchError());
  } catch (error) {
    console.log("authActions.fetchChangeProfile", error);
    yield put(authActions.fetchError());
  }
}

function* fetchLogout() {
  try {
    const { message } = yield call(() => logout());
    if (message === MSG_SUCCESS) {
      yield put(authActions.logout());
    } else yield put(authActions.fetchError());
  } catch (error) {
    console.log("authActions.fetchLogout", error);
    yield put(authActions.fetchError());
  }
}

export function* authSaga() {
  yield takeEvery(authReducers.fetchProfile, fetchProfile);
  yield takeEvery(authReducers.fetchLogin, fetchLogin);
  yield takeEvery(authReducers.fetchRegister, fetchRegister);
  yield takeEvery(authReducers.fetchChangeProfile, fetchChangeProfile);
  yield takeEvery(authReducers.fetchLogout, fetchLogout);
}
