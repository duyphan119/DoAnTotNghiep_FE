import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { blogManamentSaga } from "./blogManamentSaga";
import { cartSaga } from "./cartSaga";
import { groupProductManamentSaga } from "./groupProductManamentSaga";
import { productDetailSaga } from "./productDetailSaga";
import { productManamentSaga } from "./productManamentSaga";
import { productVariantSaga } from "./productVariantSaga";
import { userAddressSaga } from "./userAddressSaga";
import { variantSaga } from "./variantSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    cartSaga(),
    productDetailSaga(),
    userAddressSaga(),
    productManamentSaga(),
    groupProductManamentSaga(),
    productVariantSaga(),
    variantSaga(),
    blogManamentSaga(),
  ]);
}
