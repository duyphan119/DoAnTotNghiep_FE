import { call, put, takeEvery } from "redux-saga/effects";
import {
  CommentProductDTO,
  createCommentProduct,
  getAllCommentProductsClient,
  updateCommentProduct,
} from "../../apis/commentproduct";
import { MSG_SUCCESS } from "../../utils/constants";
import { Product } from "../../utils/types";
import {
  FetchUpdateCommentProductPayload,
  productDetailActions,
  productDetailReducers,
  SetPagePayload,
} from "../slice/productDetailSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

function* setProduct({ payload }: ActionPayload<Product | null>) {
  if (payload) {
    try {
      let product = payload;
      let { message, data } = yield call(() =>
        getAllCommentProductsClient({
          productId: product.id,
          limit: 4,
          p: 1,
        })
      );
      if (message === MSG_SUCCESS) {
        yield put(productDetailActions.setCommentProductData(data));
      }
    } catch (error) {
      console.log("productDetailReducers.setProduct error", error);
    }
  }
}

function* setPage({ payload }: ActionPayload<SetPagePayload>) {
  const { product, page } = payload;
  if (product) {
    try {
      let { message, data } = yield call(() =>
        getAllCommentProductsClient({
          productId: product.id,
          limit: 4,
          p: page,
        })
      );
      if (message === MSG_SUCCESS) {
        yield put(productDetailActions.setCommentProductData(data));
      }
    } catch (error) {
      console.log("productDetailReducers.setPage error", error);
    }
  }
}

function* fetchAddCommnetProduct({
  payload,
}: ActionPayload<CommentProductDTO>) {
  try {
    let { message, data } = yield call(() => createCommentProduct(payload));
    if (message === MSG_SUCCESS) {
      yield put(productDetailActions.addCommentProduct(data));
      yield put(
        snackbarActions.show({
          msg: "Cảm ơn bài đánh giá của bạn",
          type: "success",
        })
      );
    } else yield put(productDetailActions.fetchError());
  } catch (error) {
    console.log("productDetailReducers.fetchAddCommnetProduct error", error);
    yield put(productDetailActions.fetchError());
  }
}

function* fetchUpdateCommentProduct({
  payload,
}: ActionPayload<FetchUpdateCommentProductPayload>) {
  try {
    const { id, ...others } = payload;
    let { message, data } = yield call(() => updateCommentProduct(id, others));
    if (message === MSG_SUCCESS) {
      yield put(productDetailActions.updateCommnetProduct(data));
      yield put(
        snackbarActions.show({
          msg: "Sửa bài đánh giá thành công",
          type: "success",
        })
      );
    } else yield put(productDetailActions.fetchError());
  } catch (error) {
    console.log("productDetailReducers.fetchAddCommnetProduct error", error);
    yield put(productDetailActions.fetchError());
  }
}

export function* productDetailSaga() {
  yield takeEvery(productDetailReducers.setProduct, setProduct);
  yield takeEvery(productDetailReducers.setPage, setPage);
  yield takeEvery(
    productDetailReducers.fetchAddCommnetProduct,
    fetchAddCommnetProduct
  );
  yield takeEvery(
    productDetailReducers.fetchUpdateCommentProduct,
    fetchUpdateCommentProduct
  );
}
