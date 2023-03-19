import CommentProductApi from "@/api/CommentProductApi";
import { ActionPayload } from "@/redux/store";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  CommentProductModel,
  ProductModel,
  ResponseGetAllModel,
} from "@/models";
import { fetchActions } from "@/redux/slice/fetchSlice";
import {
  productDetailActions,
  productDetailReducer,
  SetPagePayload,
} from "@/redux/slice/productDetailSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import { CreateCommentProductDTO } from "@/types/dtos";
import { CommentProductParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

const cpApi = new CommentProductApi();

function* setProduct({ payload }: ActionPayload<ProductModel>) {
  if (payload) {
    try {
      let product = payload;
      let { message, data } = yield call(() =>
        cpApi.getAll({
          productId: product.id,
          limit: 4,
          p: 1,
        })
      );
      if (message === MSG_SUCCESS) {
        yield put(productDetailActions.setCommentProductData(data));
      }
    } catch (error) {
      console.log("productDetailReducer.setProduct error", error);
    }
  }
}

function* setPage({
  payload: { product, page },
}: ActionPayload<{ page: number; product: ProductModel }>) {
  if (product) {
    try {
      let { message, data } = yield call(() =>
        cpApi.getAll({
          productId: product.id,
          limit: 4,
          p: page,
        })
      );
      if (message === MSG_SUCCESS) {
        yield put(productDetailActions.setCommentProductData(data));
      }
    } catch (error) {
      console.log("productDetailReducer.setPage error", error);
    }
  }
}

function* fetchAddCommnetProduct({
  payload: dto,
}: ActionPayload<CreateCommentProductDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productDetailReducer.fetchAddCommnetProduct));
    const data: CommentProductModel = yield call(() => cpApi.create(dto));
    if (data.id > 0) {
      yield put(productDetailActions.addCommentProduct(data));
      yield put(
        snackbarActions.show({
          msg: "Cảm ơn bài đánh giá của bạn",
          type: "success",
        })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("productDetailReducer.fetchAddCommnetProduct error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateCommentProduct({
  payload: { id, dto },
}: ActionPayload<{ id: number; dto: CreateCommentProductDTO }>) {
  let isError = true;
  try {
    yield put(
      fetchActions.start(productDetailReducer.fetchUpdateCommentProduct)
    );
    const data: CommentProductModel = yield call(() =>
      cpApi.update({ id, dto })
    );
    if (data.id > 0) {
      isError = false;
      yield put(productDetailActions.updateCommnetProduct(data));
      yield put(
        snackbarActions.show({
          msg: "Sửa bài đánh giá thành công",
          type: "success",
        })
      );
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("productDetailReducer.fetchUpdateCommentProduct error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetAllCommentProduct({
  payload: params,
}: ActionPayload<CommentProductParams>) {
  let isError = true;
  try {
    yield put(
      fetchActions.start(productDetailReducer.fetchGetAllCommentProduct)
    );
    const {
      commentProductData,
      userCommentProduct,
    }: {
      commentProductData: ResponseGetAllModel<CommentProductModel>;
      userCommentProduct: CommentProductModel;
    } = yield call(() => cpApi.getAll(params));
    isError = false;
    yield put(productDetailActions.setCommentProductData(commentProductData));
    yield put(productDetailActions.setUserCommentProduct(userCommentProduct));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("productDetailReducer.fetchGetAllCommentProduct error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* productDetailSaga() {
  yield takeEvery(productDetailReducer.setProduct, setProduct);
  yield takeEvery(productDetailReducer.setPage, setPage);
  yield takeEvery(
    productDetailReducer.fetchAddCommnetProduct,
    fetchAddCommnetProduct
  );
  yield takeEvery(
    productDetailReducer.fetchUpdateCommentProduct,
    fetchUpdateCommentProduct
  );
  yield takeEvery(
    productDetailReducer.fetchGetAllCommentProduct,
    fetchGetAllCommentProduct
  );
}
