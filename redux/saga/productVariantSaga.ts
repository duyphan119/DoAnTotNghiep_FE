import { call, put, takeEvery } from "redux-saga/effects";
import {
  CreateProductVariant,
  createProductVariants,
  deleteProductVariant,
  getAllProductVariants,
  ProductVariantQueryParams,
  updateProductVariants,
} from "../../apis/productvariant";
import { MSG_SUCCESS } from "../../utils/constants";
import { ProductVariant } from "../../utils/types";
import {
  productVariantActions,
  productVariantReducers,
} from "../slice/productVariantSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

function* fetchCreateProductVariants({
  payload,
}: ActionPayload<CreateProductVariant[]>) {
  let isError = true;
  try {
    const { message } = yield call(() => createProductVariants(payload));

    if (message === MSG_SUCCESS && payload[0]) {
      const { message: msg, data } = yield call(() =>
        getAllProductVariants({
          variant_values: true,
          productId: payload[0].productId,
        })
      );
      if (msg === MSG_SUCCESS) {
        isError = false;
        yield put(productVariantActions.setProductVariants(data.items));
        yield put(productVariantActions.setInputs([]));
        yield put(
          snackbarActions.show({ msg: "Đã tạo thành công", type: "success" })
        );
      }
    }
  } catch (error) {
    console.log("productVariantSaga.fetchCreateProductVariants error", error);
  }
  if (isError) yield put(productVariantActions.fetchError);
}

function* fetchUpdateProductVariants({
  payload,
}: ActionPayload<ProductVariant[]>) {
  let isError = true;
  try {
    const { message } = yield call(() =>
      updateProductVariants(
        payload.map((productVariant: ProductVariant) => ({
          id: productVariant.id,
          inventory: productVariant.inventory,
          price: productVariant.price,
        }))
      )
    );

    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(productVariantActions.fetchSuccess());
      yield put(snackbarActions.show({ msg: "Đã lưu", type: "success" }));
    }
  } catch (error) {
    console.log("productVariantSaga.fetchUpdateProductVariants error", error);
  }
  if (isError) yield put(productVariantActions.fetchError);
}

function* fetchGetAllProductVariants({
  payload,
}: ActionPayload<ProductVariantQueryParams>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getAllProductVariants(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(productVariantActions.setProductVariants(data.items));
    }
  } catch (error) {
    console.log("productVariantSaga.fetchGetAllProductVariants error", error);
  }
  if (isError) yield put(productVariantActions.fetchError);
}

function* fetchDeleteProductVariant({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => deleteProductVariant(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(productVariantActions.deleteProductVariant(id));
    }
  } catch (error) {
    console.log("productVariantSaga.fetchDeleteProductVariant error", error);
  }
  if (isError) yield put(productVariantActions.fetchError);
}

export function* productVariantSaga() {
  yield takeEvery(
    productVariantReducers.fetchCreateProductVariants,
    fetchCreateProductVariants
  );
  yield takeEvery(
    productVariantReducers.fetchUpdateProductVariants,
    fetchUpdateProductVariants
  );
  yield takeEvery(
    productVariantReducers.fetchGetAllProductVariants,
    fetchGetAllProductVariants
  );
  yield takeEvery(
    productVariantReducers.fetchDeleteProductVariant,
    fetchDeleteProductVariant
  );
}
