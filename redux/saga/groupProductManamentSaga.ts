import { call, put, takeEvery } from "redux-saga/effects";
import {
  createGroupProduct,
  deleteGroupProduct,
  getAllGroupProducts,
  getGroupProductById,
  restoreGroupProduct,
  softDeleteGroupProduct,
  updateGroupProduct,
} from "../../apis/groupProduct";
import {
  createProduct,
  getAllProducts,
  ProductQueryParams,
} from "../../apis/product";
import { uploadSingle } from "../../apis/upload";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  groupProductManagementReducers,
  groupProductManagementActions,
  CreateGroupProductPayload,
  UpdateGroupProductPayload,
} from "../slice/groupProductManagementSlice";
import { ActionPayload } from "../store";

function* fetchGroupProductData({
  payload: params,
}: ActionPayload<ProductQueryParams>): any {
  try {
    const { p, sortBy, sortType, limit } = params;
    const { message, data } = yield call(() =>
      getAllGroupProducts({
        p: p || 1,
        limit,
        sortBy,
        sortType,
        withDeleted: true,
      })
    );

    yield put(
      groupProductManagementActions.setGroupProductData(
        message === MSG_SUCCESS ? data : { items: 0, count: 0 }
      )
    );
  } catch (error) {
    console.log("groupProductManagementActions.fetchGroupProductData", error);
    yield put(groupProductManagementActions.fetchError());
  }
}

function* fetchHeaderData() {
  try {
    const { message, data } = yield call(() =>
      getAllGroupProducts({ forHeader: true })
    );

    yield put(
      groupProductManagementActions.setHeaderData(
        message === MSG_SUCCESS ? data : []
      )
    );
  } catch (error) {
    console.log("groupProductManagementActions.fetchHeaderData", error);
    yield put(groupProductManagementActions.fetchError());
  }
}

function* fetchCreateGroupProduct({
  payload,
}: ActionPayload<CreateGroupProductPayload>) {
  let isError = true;
  try {
    const { files, dto } = payload;
    let url = "";
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        url = dataImage.secure_url;
      }
    }
    const { message: msg } = yield call(() =>
      createGroupProduct({
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.back());
    }
  } catch (error) {
    console.log("groupProductManagementActions.fetchCreateGroupProduct", error);
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

function* fetchUpdateGroupProduct({
  payload,
}: ActionPayload<UpdateGroupProductPayload>) {
  let isError = true;
  try {
    const { files, dto, id } = payload;
    let url = "";
    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const { message, data: dataImage } = yield call(() =>
        uploadSingle(formData)
      );
      if (message === MSG_SUCCESS) {
        url = dataImage.secure_url;
      }
    }
    const { message: msg } = yield call(() =>
      updateGroupProduct(id, {
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.back());
    }
  } catch (error) {
    console.log("groupProductManagementActions.fetchUpdateGroupProduct", error);
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

function* fetchGetGroupProductById({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getGroupProductById(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.setGroupProductEditing(data));
    }
  } catch (error) {
    console.log(
      "groupProductManagementActions.fetchGetGroupProductById",
      error
    );
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

function* fetchDeleteGroupProduct({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => deleteGroupProduct(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.deleted());
    }
  } catch (error) {
    console.log("groupProductManagementActions.fetchDeleteGroupProduct", error);
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

function* fetchRestoreGroupProduct({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => restoreGroupProduct(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.restore(payload));
    }
  } catch (error) {
    console.log(
      "groupProductManagementActions.fetchRestoreGroupProduct",
      error
    );
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

function* fetchSoftDeleteGroupProduct({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => softDeleteGroupProduct(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(groupProductManagementActions.fetchSuccess());
      yield put(groupProductManagementActions.softDelete(payload));
    }
  } catch (error) {
    console.log(
      "groupProductManagementActions.fetchSoftDeleteGroupProduct",
      error
    );
  }
  if (isError) yield put(groupProductManagementActions.fetchError());
}

export function* groupProductManamentSaga() {
  yield takeEvery(
    groupProductManagementReducers.fetchGroupProductData,
    fetchGroupProductData
  );
  yield takeEvery(
    groupProductManagementReducers.fetchHeaderData,
    fetchHeaderData
  );
  yield takeEvery(
    groupProductManagementReducers.fetchCreateGroupProduct,
    fetchCreateGroupProduct
  );
  yield takeEvery(
    groupProductManagementReducers.fetchUpdateGroupProduct,
    fetchUpdateGroupProduct
  );
  yield takeEvery(
    groupProductManagementReducers.fetchGetGroupProductById,
    fetchGetGroupProductById
  );
  yield takeEvery(
    groupProductManagementReducers.fetchDeleteGroupProduct,
    fetchDeleteGroupProduct
  );
  yield takeEvery(
    groupProductManagementReducers.fetchRestoreGroupProduct,
    fetchRestoreGroupProduct
  );
  yield takeEvery(
    groupProductManagementReducers.fetchSoftDeleteGroupProduct,
    fetchSoftDeleteGroupProduct
  );
}
