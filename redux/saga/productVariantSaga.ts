import { call, put, takeEvery } from "redux-saga/effects";
import { ProductVariantApi } from "../../api";
import { ProductVariantModel, ResponseGetAllModel } from "../../models";
import { CreateProductVariantDTO } from "../../types/dtos";
import { ProductVariantParams } from "../../types/params";
import { MSG_SUCCESS } from "../../utils/constants";
import { fetchActions } from "../slice/fetchSlice";
import {
  productVariantActions,
  productVariantReducer,
} from "../slice/productVariantSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "../store";

const pvApi = new ProductVariantApi();

function* fetchCreateMany({
  payload: dtos,
}: ActionPayload<CreateProductVariantDTO[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productVariantReducer.fetchCreateMany));
    const data: ProductVariantModel[] = yield call(() =>
      pvApi.createMany(dtos)
    );
    isError = false;
    yield put(productVariantActions.setProductVariants(data));
    yield put(productVariantActions.setInputs([]));
    yield put(
      snackbarActions.show({ msg: "Đã tạo thành công", type: "success" })
    );
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("productVariantSaga.fetchCreateMany error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateMany({
  payload: inputs,
}: ActionPayload<ProductVariantModel[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productVariantReducer.fetchUpdateMany));
    const { message } = yield call(() => pvApi.updateMany(inputs));

    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(snackbarActions.show({ msg: "Đã lưu", type: "success" }));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("productVariantSaga.fetchUpdateMany error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetAll({
  payload: params,
}: ActionPayload<ProductVariantParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productVariantReducer.fetchUpdateMany));
    const data: ResponseGetAllModel<ProductVariantModel> = yield call(() =>
      pvApi.getAll(params)
    );
    isError = false;
    yield put(productVariantActions.setProductVariants(data.items));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("productVariantSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productVariantReducer.fetchSoftDeleteSingle));
    const result: boolean = yield call(() => pvApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(productVariantActions.deleteProductVariant(id));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("productVariantSaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* productVariantSaga() {
  yield takeEvery(productVariantReducer.fetchUpdateMany, fetchUpdateMany);
  yield takeEvery(productVariantReducer.fetchCreateMany, fetchCreateMany);
  yield takeEvery(productVariantReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(
    productVariantReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
}
