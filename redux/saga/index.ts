import { all } from "redux-saga/effects";
import { advertisementSaga } from "./advertisementSaga";
import { authSaga } from "./authSaga";
import { blogCategorySaga } from "./blogCategorySaga";
import { blogManamentSaga } from "./blogSaga";
import { cartSaga } from "./cartSaga";
import { groupProductSaga } from "./groupProductSaga";
import { orderSaga } from "./orderSaga";
import { productDetailSaga } from "./productDetailSaga";
import { productSaga } from "./productSaga";
import { productVariantSaga } from "./productVariantSaga";
import { userAddressSaga } from "./userAddressSaga";
import { variantSaga } from "./variantSaga";
import { userSaga } from "./userSaga";
import { commentProductSaga } from "./commentProductSaga";
import { orderDiscountSaga } from "./orderDiscountSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    cartSaga(),
    productDetailSaga(),
    userAddressSaga(),
    productSaga(),
    productVariantSaga(),
    variantSaga(),
    blogManamentSaga(),
    advertisementSaga(),
    blogCategorySaga(),
    groupProductSaga(),
    orderSaga(),
    userSaga(),
    commentProductSaga(),
    orderDiscountSaga(),
  ]);
}
