import { call, put, takeEvery } from "redux-saga/effects";
import { ProductModel, ResponseGetAllModel } from "../../models";
import { ProductApi } from "../../api";
import { CreateProductDTO, UpdateProductDTO } from "../../types/dtos";
import { ProductParams } from "../../types/params";
import { fetchActions } from "../slice/fetchSlice";
import { productActions, productReducer } from "../slice/productSlice";
import { ActionPayload } from "../store";

const pApi = new ProductApi();

function* fetchGetAll({ payload: params }: ActionPayload<ProductParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productReducer.fetchGetAll));
    const data: ResponseGetAllModel<ProductModel> = yield call(() =>
      pApi.getAll(params)
    );

    isError = false;
    yield put(productActions.setProductData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreate({ payload: dto }: ActionPayload<CreateProductDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productReducer.fetchGetAll));
    const data: ProductModel = yield call(() => pApi.create(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdate({ payload }: ActionPayload<UpdateProductDTO>) {
  let isError = true;
  try {
    const { id, ...dto } = payload;
    yield put(fetchActions.start(productReducer.fetchGetAll));
    const data: ProductModel = yield call(() => pApi.update({ id, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productReducer.fetchGetAll));
    const result: boolean = yield call(() => pApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(productActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteMultiple({ payload: ids }: ActionPayload<number[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productReducer.fetchGetAll));
    const result: boolean = yield call(() => pApi.softDeleteMultiple(ids));
    if (result) {
      isError = false;
      yield put(productActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(productReducer.fetchGetById));
    const data: ProductModel = yield call(() => pApi.getById(id));
    if (data) {
      isError = false;
      yield put(productActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log(error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* productSaga() {
  yield takeEvery(productReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(productReducer.fetchCreate, fetchCreate);
  yield takeEvery(productReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(productReducer.fetchSoftDeleteSingle, fetchSoftDeleteSingle);
  yield takeEvery(productReducer.fetchGetById, fetchGetById);
  yield takeEvery(
    productReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
}
