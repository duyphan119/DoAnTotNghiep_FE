import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { cartSaga } from "./cartSaga";
import { productDetailSaga } from "./productDetailSaga";
import { userAddressSaga } from "./userAddressSaga";

export default function* rootSaga() {
  yield all([authSaga(), cartSaga(), productDetailSaga(), userAddressSaga()]);
}
