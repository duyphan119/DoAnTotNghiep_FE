import { call, put, takeEvery } from "redux-saga/effects";
import { ResponseGetAllModel, UserAddressModel } from "@/models";
import { PaginationParams } from "@/types/params";
import { fetchActions } from "@/redux/slice/fetchSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import {
  userAddressActions,
  userAddressReducer,
} from "@/redux/slice/userAddressSlice";
import { ActionPayload } from "@/redux/store";
import { UserAddressApi } from "@/api";
import { CreateUserAddressDTO } from "@/types/dtos";

const udApi = new UserAddressApi();

function* fetchGetAll({ payload: params }: ActionPayload<PaginationParams>) {
  let isError = true;
  try {
    yield put(fetchActions.start(userAddressReducer.fetchGetAll));
    const data: ResponseGetAllModel<UserAddressModel> = yield call(() =>
      udApi.getAll(params)
    );
    isError = false;
    yield put(userAddressActions.setUserAddressData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("userAddressReducer.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreate({ payload: dto }: ActionPayload<CreateUserAddressDTO>) {
  let isError = true;
  try {
    yield put(fetchActions.start(userAddressReducer.fetchCreate));
    const data: UserAddressModel = yield call(() => udApi.create(dto));
    if (data.id > 0) {
      isError = false;
      yield put(userAddressActions.createOne(data));
      yield put(userAddressActions.closeModal());
      yield put(fetchActions.endAndSuccess());
      yield put(
        snackbarActions.show({
          msg: "Thêm thành công",
          type: "success",
        })
      );
    }
  } catch (error) {
    console.log("userAddressReducer.fetchCreate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdate({
  payload: { id, dto },
}: ActionPayload<{ id: number; dto: CreateUserAddressDTO }>) {
  let isError = true;
  try {
    yield put(fetchActions.start(userAddressReducer.fetchUpdate));
    const data: UserAddressModel = yield call(() => udApi.update({ id, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(userAddressActions.updateUserAddress(data));
      yield put(userAddressActions.closeModal());
      yield put(fetchActions.endAndSuccess());
      yield put(
        snackbarActions.show({
          msg: "Sửa thành công",
          type: "success",
        })
      );
    }
  } catch (error) {
    console.log("userAddressReducer.fetchUpdate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchDelete({ payload: id }: ActionPayload<number>) {
  let isError = true;
  try {
    const result: boolean = yield call(() => udApi.delete(id));
    if (result) {
      isError = false;
      yield put(userAddressActions.deleteUserAddress(id));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("userAddressReducer.fetchDelete error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* userAddressSaga() {
  yield takeEvery(userAddressReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(userAddressReducer.fetchCreate, fetchCreate);
  yield takeEvery(userAddressReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(userAddressReducer.fetchDelete, fetchDelete);
}
