import { call, put, takeEvery } from "redux-saga/effects";
import { CartApi, OrderApi, UserApi } from "@/api";

import { ActionPayload } from "@/redux/store";
import { OrderModel, ResponseGetAllModel, UserModel } from "@/models";
import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  LoginDTO,
  RegisterDTO,
} from "@/types/dtos";
import { PaginationParams } from "@/types/params";
import { authActions, authReducer } from "@/redux/slice/authSlice";
import { cartActions } from "@/redux/slice/cartSlice";
import { fetchActions } from "@/redux/slice/fetchSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";

const uApi = new UserApi();
const cApi = new CartApi();
const oApi = new OrderApi();

function* fetchGetProfile() {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchGetProfile));
    const data: UserModel = yield call(() => uApi.getProfile());
    if (data.id > 0) {
      isError = false;
      yield put(authActions.setProfile(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("authActions.fetchGetProfile error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchLogin({ payload: dto }: ActionPayload<LoginDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchLogin));
    const { user, accessToken }: { user: UserModel; accessToken: string } =
      yield call(() => uApi.login(dto));
    if (user.id > 0) {
      isError = false;
      yield put(authActions.login({ user, accessToken }));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );
      const cart: OrderModel = yield call(() =>
        cApi.loginCreateCart(
          new OrderModel(JSON.parse("" + localStorage.getItem("cart")))
        )
      );

      yield put(cartActions.setCart(cart));
      localStorage.removeItem("cart");
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("authActions.fetchLogin", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchRegister({ payload }: ActionPayload<RegisterDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchRegister));
    const { user, accessToken }: { user: UserModel; accessToken: string } =
      yield call(() => uApi.register(payload));
    if (user.id > 0) {
      isError = false;
      yield put(authActions.login({ user, accessToken }));
      yield put(
        snackbarActions.show({ msg: "Đăng nhập thành công", type: "success" })
      );

      // đăng ký xong thì lấy giỏ hàng lúc chưa đăng nhập lưu vào db
      const cart: OrderModel = yield call(() =>
        cApi.loginCreateCart(
          new OrderModel(JSON.parse("" + localStorage.getItem("cart")))
        )
      );

      yield put(cartActions.setCart(cart));
      localStorage.removeItem("cart");
      //

      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("authActions.fetchLogin", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchChangeProfile({
  payload: dto,
}: ActionPayload<ChangeProfileDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchChangeProfile));
    const data: UserModel = yield call(() => uApi.changeProfile(dto));
    if (data.id > 0) {
      yield put(authActions.setProfile(data));
      yield put(
        snackbarActions.show({ msg: "Cập nhật thành công", type: "success" })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("authActions.fetchChangeProfile", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchLogout() {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchLogout));
    const result: boolean = yield call(() => uApi.logout());
    if (result) {
      isError = false;
      yield put(authActions.logout());
      yield put(fetchActions.endAndSuccess());
      yield put(cartActions.setCart(new OrderModel()));
    }
  } catch (error) {
    console.log("authActions.fetchLogout", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchChangePassword({
  payload: dto,
}: ActionPayload<ChangePasswordDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchChangePassword));
    const result: boolean = yield call(() => uApi.changePassword(dto));
    if (result) {
      isError = false;
      yield put(
        snackbarActions.show({
          msg: "Đổi mật khẩu thành công",
          type: "success",
        })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("authActions.fetchChangePassword", error);
  }
  if (isError) {
    yield put(
      snackbarActions.show({
        msg: "Đổi mật khẩu không thành công",
        type: "error",
      })
    );
    yield put(fetchActions.endAndError());
  }
}

function* fetchUserOrderData({
  payload: params,
}: ActionPayload<PaginationParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(authReducer.fetchUserOrderData));
    const data: ResponseGetAllModel<OrderModel> = yield call(() =>
      oApi.getUserOrderData(params)
    );
    isError = false;
    yield put(authActions.setUserOrderData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("authActions.fetchUserOrderData", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* authSaga() {
  yield takeEvery(authReducer.fetchGetProfile, fetchGetProfile);
  yield takeEvery(authReducer.fetchLogin, fetchLogin);
  yield takeEvery(authReducer.fetchRegister, fetchRegister);
  yield takeEvery(authReducer.fetchChangeProfile, fetchChangeProfile);
  yield takeEvery(authReducer.fetchLogout, fetchLogout);
  yield takeEvery(authReducer.fetchChangePassword, fetchChangePassword);
  yield takeEvery(authReducer.fetchUserOrderData, fetchUserOrderData);
}
