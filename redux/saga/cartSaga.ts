import { call, put, takeEvery } from "redux-saga/effects";
import { CartApi } from "../../api";
import { OrderItemModel, OrderModel } from "../../models";
import { CheckoutDTO, CreateCartItemDTO } from "../../types/dtos";

import { cartActions, cartReducer } from "../slice/cartSlice";
import { fetchActions } from "../slice/fetchSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

const cApi = new CartApi();

function* fetchCart() {
  let isError = true;
  try {
    yield put(fetchActions.start(cartReducer.fetchCart));
    let data: OrderModel = yield call(() => cApi.getCart());
    if (data.id > 0) {
      isError = false;
      yield put(cartActions.setCart(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("cartReducer.fetchCart error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchAddToCart({ payload: dto }: ActionPayload<CreateCartItemDTO>) {
  let isError = true;
  try {
    let data: OrderItemModel = yield call(() => cApi.createCartItem(dto));
    if (data.id > 0) {
      isError = false;
      yield put(cartActions.addToCart(data));
      yield put(
        snackbarActions.show({
          msg: "Sản phẩm đã được thêm vào giỏ hàng",
          type: "success",
        })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("cartReducer.fetchAddToCart error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateCartItem({
  payload: dto,
}: ActionPayload<{ id: number; newQuantity: number }>) {
  let isError = true;
  try {
    let data: OrderItemModel = yield call(() => cApi.updateCartItem(dto));
    if (data.id > 0) {
      isError = false;
      yield put(cartActions.updateCartItem(dto));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("cartReducer.fetchUpdateCartItem error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchDeleteCartItem({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    let result: boolean = yield call(() => cApi.deleteCartItem(id));
    if (result) {
      isError = false;
      yield put(cartActions.deleteCartItem(id));
      yield put(
        snackbarActions.show({
          msg: "Sản phẩm đã được xóa khỏi giỏ hàng",
          type: "success",
        })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("cartReducer.fetchDeleteCartItem error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCheckout({ payload }: ActionPayload<CheckoutDTO>) {
  let isError = true;
  // try {
  //   let { message } = yield call(() => checkout(payload));
  //   if (message === MSG_SUCCESS) yield put(cartActions.paymentSuccess());
  //   else yield put(cartActions.fetchError());
  // } catch (error) {
  //   console.log("cartReducer.fetchCheckout error", error);
  //   yield put(cartActions.fetchError());
  // }
  if (isError) yield put(fetchActions.endAndError());
}

export function* cartSaga() {
  yield takeEvery(cartReducer.fetchCart, fetchCart);
  yield takeEvery(cartReducer.fetchAddToCart, fetchAddToCart);
  yield takeEvery(cartReducer.fetchUpdateCartItem, fetchUpdateCartItem);
  yield takeEvery(cartReducer.fetchDeleteCartItem, fetchDeleteCartItem);
}
