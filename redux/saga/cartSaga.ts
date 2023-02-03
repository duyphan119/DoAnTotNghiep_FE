import { hasCookie } from "cookies-next";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  checkout,
  CheckoutDTO,
  createCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../../apis/order";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../../utils/constants";
import {
  cartActions,
  cartReducers,
  FetchAddToCartPayload,
  FetchUpdateCartItemPayload,
} from "../slice/cartSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

function* fetchCart() {
  try {
    if (hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
      let { message, data } = yield call(() => getCart());

      yield put(
        cartActions.setCart(
          message === MSG_SUCCESS && data && data.items && data.items[0]
            ? data.items[0]
            : { items: [] }
        )
      );
    } else {
      yield put(cartActions.setCart({ items: [] }));
    }
  } catch (error) {
    console.log("cartReducers.fetchCart error", error);
    yield put(cartActions.setCart({ items: [] }));
  }
}

function* fetchAddToCart({ payload }: ActionPayload<FetchAddToCartPayload>) {
  try {
    let { item, price } = payload;
    let { productVariantId, quantity } = item;
    let { message, data } = yield call(() =>
      createCartItem({
        productVariantId,
        quantity,
        price,
      })
    );
    if (message === MSG_SUCCESS) {
      yield put(cartActions.addToCart(data));
      yield put(
        snackbarActions.show({
          msg: "Sản phẩm đã được thêm vào giỏ hàng",
          type: "success",
        })
      );
    } else yield put(cartActions.fetchError());
  } catch (error) {
    console.log("cartReducers.fetchAddToCart error", error);
    yield put(cartActions.fetchError());
  }
}

function* fetchUpdateCartItem({
  payload,
}: ActionPayload<FetchUpdateCartItemPayload>) {
  let { id, newQuantity } = payload;
  try {
    let { message } = yield call(() => updateCartItem(id, newQuantity));
    if (message === MSG_SUCCESS) {
      yield put(cartActions.updateCartItem({ id, newQuantity }));
    } else yield put(cartActions.fetchError());
  } catch (error) {
    console.log("cartReducers.fetchUpdateCartItem error", error);
    yield put(cartActions.fetchError());
  }
}

function* fetchDeleteCartItem({ payload }: ActionPayload<number>) {
  let id = payload;
  try {
    let { message } = yield call(() => deleteCartItem(id));
    if (message === MSG_SUCCESS) {
      yield put(cartActions.deleteCartItem(id));
      yield put(
        snackbarActions.show({
          msg: "Sản phẩm đã được xóa khỏi giỏ hàng",
          type: "success",
        })
      );
    } else yield put(cartActions.fetchError());
  } catch (error) {
    console.log("cartReducers.fetchDeleteCartItem error", error);
    yield put(cartActions.fetchError());
  }
}

function* fetchCheckout({ payload }: ActionPayload<CheckoutDTO>) {
  try {
    let { message } = yield call(() => checkout(payload));
    if (message === 0) yield put(cartActions.paymentSuccess());
    else yield put(cartActions.fetchError());
  } catch (error) {
    console.log("cartReducers.fetchCheckout error", error);
    yield put(cartActions.fetchError());
  }
}

export function* cartSaga() {
  yield takeEvery(cartReducers.fetchCart, fetchCart);
  yield takeEvery(cartReducers.fetchAddToCart, fetchAddToCart);
  yield takeEvery(cartReducers.fetchUpdateCartItem, fetchUpdateCartItem);
  yield takeEvery(cartReducers.fetchDeleteCartItem, fetchDeleteCartItem);
  yield takeEvery(cartReducers.fetchCheckout, fetchCheckout);
}
