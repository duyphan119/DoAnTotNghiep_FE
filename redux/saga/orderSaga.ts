import { call, put, takeEvery } from "redux-saga/effects";
import { OrderApi } from "../../api";
import { OrderModel, ResponseGetAllModel } from "../../models";
import { CheckoutDTO } from "../../types/dtos";
import { OrderParams } from "../../types/params";
import { cartActions } from "../slice/cartSlice";
import { fetchActions } from "../slice/fetchSlice";
import { orderActions, orderReducer } from "../slice/orderSlice";
import { snackbarActions } from "../slice/snackbarSlice";
import { ActionPayload } from "@/redux/store";

const oApi = new OrderApi();

function* fetchCheckout({ payload: dto }: ActionPayload<CheckoutDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderReducer.fetchCheckout));
    const data: OrderModel = yield call(() => oApi.checkout(dto));
    if (data.id > 0) {
      isError = false;
      yield put(orderActions.checkout());
      yield put(cartActions.setCart(new OrderModel()));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("orderSaga.fetchCheckout error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetAll({ payload: params }: ActionPayload<OrderParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderReducer.fetchGetAll));
    const data: ResponseGetAllModel<OrderModel> = yield call(() =>
      oApi.getAll(params)
    );
    isError = false;
    yield put(orderActions.setOrderData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("orderSaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderReducer.fetchGetById));
    const data: OrderModel = yield call(() => oApi.getById(id));
    if (data.id > 0) {
      isError = false;
      yield put(orderActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("orderSaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateStatus({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    yield put(fetchActions.start(orderReducer.fetchUpdateStatus));
    const data: OrderModel = yield call(() => oApi.updateStatus(id));
    if (data.id > 0) {
      isError = false;
      yield put(
        snackbarActions.show({
          type: "success",
          msg: "Cập nhật trạng thái đơn hàng thành công",
        })
      );
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("orderSaga.fetchUpdateStatus error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* orderSaga() {
  yield takeEvery(orderReducer.fetchCheckout, fetchCheckout);
  yield takeEvery(orderReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(orderReducer.fetchGetById, fetchGetById);
  yield takeEvery(orderReducer.fetchUpdateStatus, fetchUpdateStatus);
}
