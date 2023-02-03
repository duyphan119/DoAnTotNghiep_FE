import { call, put, takeEvery } from "redux-saga/effects";
import {
  createProduct,
  getAllProducts,
  getProductById,
  ProductQueryParams,
  updateProduct,
} from "../../apis/product";
import { uploadSingle } from "../../apis/upload";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  CreateProductPayload,
  productManagementActions,
  productManagementReducers,
  UpdateProductPayload,
} from "../slice/productManagementSlice";
import { ActionPayload } from "../store";

function* fetchProductData({
  payload: params,
}: ActionPayload<ProductQueryParams>): any {
  try {
    const { p, sortBy, sortType, limit } = params;
    const { message, data } = yield call(() =>
      getAllProducts({
        p: p || 1,
        limit,
        sortBy,
        sortType,
        withDeleted: true,
        group_product: true,
      })
    );

    yield put(
      productManagementActions.setProductData(
        message === MSG_SUCCESS ? data : { items: 0, count: 0 }
      )
    );
  } catch (error) {
    console.log("productManamentSaga.fetchProductData", error);
    yield put(productManagementActions.fetchError());
  }
}

function* fetchCreateProduct({
  payload,
}: ActionPayload<CreateProductPayload>): any {
  let isError = true;
  try {
    const { files, inputs: dto } = payload;
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        console.log("Uploaded file: ", dataImage);
        const url = dataImage.secure_url;
        const { message: msg } = yield call(() =>
          createProduct({
            ...dto,
            thumbnail: url,
            groupProductId: +dto.groupProductId,
          })
        );
        if (msg === MSG_SUCCESS) {
          isError = false;
          yield put(productManagementActions.fetchSuccess());
          yield put(productManagementActions.back());
        }
      }
    }
  } catch (error) {
    console.log("productManamentSaga.fetchCreateProduct", error);
  }
  if (isError) yield put(productManagementActions.fetchError());
}

function* fetchGetProductById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getProductById(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(productManagementActions.setProductEditing(data));
    }
  } catch (error) {
    console.log("productManamentSaga.fetchGetProductById", error);
  }
  if (isError) yield put(productManagementActions.fetchError());
}

function* fetchUpdateProduct({
  payload,
}: ActionPayload<UpdateProductPayload>): any {
  let isError = true;
  try {
    const { files, inputs: dto, id } = payload;
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        console.log("Uploaded file: ", dataImage);
        const url = dataImage.secure_url;
        const { message: msg } = yield call(() =>
          updateProduct(id, {
            ...dto,
            thumbnail: url,
            groupProductId: +dto.groupProductId,
          })
        );
        if (msg === MSG_SUCCESS) {
          isError = false;
          yield put(productManagementActions.fetchSuccess());
          yield put(productManagementActions.back());
        }
      }
    }
  } catch (error) {
    console.log("productManamentSaga.fetchCreateProduct", error);
  }
  if (isError) yield put(productManagementActions.fetchError());
}

export function* productManamentSaga() {
  yield takeEvery(productManagementReducers.fetchProductData, fetchProductData);
  yield takeEvery(
    productManagementReducers.fetchCreateProduct,
    fetchCreateProduct
  );
  yield takeEvery(
    productManagementReducers.fetchGetProductById,
    fetchGetProductById
  );
  yield takeEvery(
    productManagementReducers.fetchUpdateProduct,
    fetchUpdateProduct
  );
}
