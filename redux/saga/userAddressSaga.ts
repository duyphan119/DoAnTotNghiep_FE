import { call, put, takeEvery } from "redux-saga/effects";
import {
  createUserAddress,
  CreateUserAddressDTO,
  deleteUserAddress,
  getMyUserAddresses,
  updateUserAddress,
} from "../../apis/useraddress";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  FetchUpdateUserAddressPayload,
  userAddressActions,
  userAddressReducers,
} from "../slice/userAddressSlice";
import { ActionPayload } from "../store";

function* fetchGetUserAddresses() {
  try {
    const { message, data } = yield call(() => getMyUserAddresses());
    yield put(
      userAddressActions.setUserAddresses(
        message === MSG_SUCCESS ? data.items : []
      )
    );
  } catch (error) {
    console.log("userAddressReducers.fetchGetUserAddresses error", error);
    yield put(userAddressActions.fetchError());
  }
}

function* fetchCreateUserAddress({
  payload,
}: ActionPayload<CreateUserAddressDTO>) {
  try {
    const { message, data } = yield call(() => createUserAddress(payload));
    if (message === MSG_SUCCESS) {
      yield put(userAddressActions.createUserAddress(data));
    } else yield put(userAddressActions.fetchError());
  } catch (error) {
    console.log("userAddressReducers.fetchCreateUserAddress error", error);
    yield put(userAddressActions.fetchError());
  }
}

function* fetchUpdateUserAddress({
  payload,
}: ActionPayload<FetchUpdateUserAddressPayload>) {
  try {
    const { id, ...others } = payload;
    const { message, data } = yield call(() => updateUserAddress(id, others));
    if (message === MSG_SUCCESS) {
      yield put(userAddressActions.updateUserAddress(payload));
    } else yield put(userAddressActions.fetchError());
  } catch (error) {
    console.log("userAddressReducers.fetchUpdateUserAddress error", error);
    yield put(userAddressActions.fetchError());
  }
}

function* fetchDeleteUserAddress({ payload }: ActionPayload<number>) {
  try {
    const { message, data } = yield call(() => deleteUserAddress(payload));
    if (message === MSG_SUCCESS) {
      yield put(userAddressActions.deleteUserAddress(payload));
    } else yield put(userAddressActions.fetchError());
  } catch (error) {
    console.log("userAddressReducers.fetchDeleteUserAddress error", error);
    yield put(userAddressActions.fetchError());
  }
}

export function* userAddressSaga() {
  yield takeEvery(
    userAddressReducers.fetchGetUserAddresses,
    fetchGetUserAddresses
  );
  yield takeEvery(
    userAddressReducers.fetchCreateUserAddress,
    fetchCreateUserAddress
  );
  yield takeEvery(
    userAddressReducers.fetchUpdateUserAddress,
    fetchUpdateUserAddress
  );
  yield takeEvery(
    userAddressReducers.fetchDeleteUserAddress,
    fetchDeleteUserAddress
  );
}
