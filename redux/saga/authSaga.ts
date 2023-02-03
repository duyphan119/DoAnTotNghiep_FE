import { call, put, takeEvery } from "redux-saga/effects";
import {
  changePassword,
  ChangePassword,
  changeProfile,
  ChangeProfile,
  getProfile,
  login,
  LoginDTO,
  logout,
  register,
  RegisterDTO,
} from "../../apis/auth";
import { myOrders, OrderQueryParams } from "../../apis/order";
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
  let isError = true;
  try {
    const { message, data } = yield call(() => login(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(authActions.login(data));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );
    }
  } catch (error) {
    console.log("authActions.fetchLogin", error);
  }
  if (isError) yield put(authActions.fetchError());
}

function* fetchRegister({ payload }: ActionPayload<RegisterDTO>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => register(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(authActions.login(data));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );
    }
  } catch (error) {
    console.log("authActions.fetchLogin", error);
  }
  if (isError) yield put(authActions.fetchError());
}

function* fetchChangeProfile({ payload }: ActionPayload<ChangeProfile>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => changeProfile(payload));
    if (message === MSG_SUCCESS) {
      yield put(authActions.changeProfile(data));
      yield put(
        snackbarActions.show({ msg: "Cập nhật thành công", type: "success" })
      );
    }
  } catch (error) {
    console.log("authActions.fetchChangeProfile", error);
  }
  if (isError) yield put(authActions.fetchError());
}

function* fetchLogout() {
  let isError = true;
  try {
    const { message, data } = yield call(() => logout());
    if (message === MSG_SUCCESS || data) {
      isError = false;
      yield put(authActions.logout());
    }
  } catch (error) {
    console.log("authActions.fetchLogout", error);
  }
  if (isError) yield put(authActions.fetchError());
}

function* fetchChangePassword({ payload }: ActionPayload<ChangePassword>) {
  let isError = true;
  try {
    const { message } = yield call(() => changePassword(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(authActions.fetchSuccess());
      yield put(
        snackbarActions.show({
          msg: "Đổi mật khẩu thành công",
          type: "success",
        })
      );
    }
  } catch (error) {
    console.log("authActions.fetchChangePassword", error);
  }
  if (isError) yield put(authActions.fetchError());
}

function* fetchMyOrderData({ payload }: ActionPayload<OrderQueryParams>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => myOrders(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(authActions.setMyOrderData(data));
    }
  } catch (error) {
    console.log("authActions.fetchMyOrderData", error);
  }
  if (isError) yield put(authActions.fetchError());
}

export function* authSaga() {
  yield takeEvery(authReducers.fetchProfile, fetchProfile);
  yield takeEvery(authReducers.fetchLogin, fetchLogin);
  yield takeEvery(authReducers.fetchRegister, fetchRegister);
  yield takeEvery(authReducers.fetchChangeProfile, fetchChangeProfile);
  yield takeEvery(authReducers.fetchLogout, fetchLogout);
  yield takeEvery(authReducers.fetchChangePassword, fetchChangePassword);
  yield takeEvery(authReducers.fetchMyOrderData, fetchMyOrderData);
}
