import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { cartSaga } from "./cartSaga";
import { groupProductManamentSaga } from "./groupProductManamentSaga";
import { productDetailSaga } from "./productDetailSaga";
import { productManamentSaga } from "./productManamentSaga";
import { userAddressSaga } from "./userAddressSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    cartSaga(),
    productDetailSaga(),
    userAddressSaga(),
    productManamentSaga(),
    groupProductManamentSaga(),
  ]);
}
