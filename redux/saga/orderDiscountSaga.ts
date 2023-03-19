import { call, put, takeEvery } from "redux-saga/effects";
import { OrderDiscountParams } from "../../types/params";
import { OrderDiscountModel, ResponseGetAllModel } from "../../models";
import { OrderDiscountApi } from "../../api";
import { fetchActions } from "../slice/fetchSlice";
import {
  orderDiscountActions,
  orderDiscountReducer,
} from "../slice/orderDiscountSlice";
import { ActionPayload } from "@/redux/store";
import { CreateOrderDiscountDTO } from "../../types/dtos";

const odApi = new OrderDiscountApi();

function* fetchGetAll({ payload: params }: ActionPayload<OrderDiscountParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchGetAll));
    const data: ResponseGetAllModel<OrderDiscountModel> = yield call(() =>
      odApi.getAll(params)
    );
    isError = false;
    yield put(orderDiscountActions.setOrderDiscountData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("orderDiscountSaga.fetchGetAll", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchCreate({ payload: dto }: ActionPayload<CreateOrderDiscountDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchCreate));
    const data: OrderDiscountModel = yield call(() => odApi.createOne(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("orderDiscountSaga.fetchCreate", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchUpdate({
  payload: { id, dto },
}: ActionPayload<{
  id: number;
  dto: CreateOrderDiscountDTO;
}>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchUpdate));
    const data: OrderDiscountModel = yield call(() =>
      odApi.updateOne({ id, dto })
    );
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("orderDiscountSaga.fetchUpdate", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchSoftDeleteSingle));
    const result: boolean = yield call(() => odApi.softDeleteOne(id));
    if (result) {
      isError = false;
      yield put(orderDiscountActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("orderDiscountSaga.fetchSoftDeleteSingle", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchGetById));
    const data: OrderDiscountModel = yield call(() => odApi.getById(id));
    if (data) {
      isError = false;
      yield put(orderDiscountActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("orderDiscountSaga.fetchGetById", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

function* fetchSoftDeleteMultiple({ payload: ids }: ActionPayload<number[]>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderDiscountReducer.fetchSoftDeleteMultiple));
    const result: boolean = yield call(() => odApi.softDeleteMany(ids));
    if (result) {
      isError = false;
      yield put(orderDiscountActions.deleted());
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("orderDiscountSaga.fetchSoftDeleteMultiple", error);
  }

  if (isError) {
    yield put(fetchActions.endAndError());
  }
}

export function* orderDiscountSaga() {
  yield takeEvery(orderDiscountReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(orderDiscountReducer.fetchCreate, fetchCreate);
  yield takeEvery(orderDiscountReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(
    orderDiscountReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(
    orderDiscountReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
  yield takeEvery(orderDiscountReducer.fetchGetById, fetchGetById);
}
