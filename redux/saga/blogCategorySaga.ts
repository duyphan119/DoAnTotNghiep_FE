import { BlogCategoryApi } from "@/api";
import { BlogCategoryModel, ResponseGetAllModel } from "@/models";
import {
  blogCategoryActions,
  blogCategoryReducer,
} from "@/redux/slice/blogCategorySlice";
import { fetchActions } from "@/redux/slice/fetchSlice";
import { ActionPayload } from "@/redux/store";
import { CreateBlogCategoryDTO } from "@/types/dtos";
import { BlogCategoryParams } from "@/types/params";
import { call, put, takeEvery } from "redux-saga/effects";
import { snackbarActions } from "../slice/snackbarSlice";

const bcApi = new BlogCategoryApi();

function* fetchGetAll({ payload: params }: ActionPayload<BlogCategoryParams>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchGetAll));
  try {
    const data: ResponseGetAllModel<BlogCategoryModel> = yield call(() =>
      bcApi.getAll(params)
    );
    isError = false;
    yield put(blogCategoryActions.setBlogCategoryData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("blogCategorySaga.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreate({ payload: dto }: ActionPayload<CreateBlogCategoryDTO>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchCreate));
  try {
    const data: BlogCategoryModel = yield call(() => bcApi.create(dto));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndResetForm());
      yield put(snackbarActions.success("Thêm thành công"));
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchCreate error", error);
  }
  if (isError) {
    yield put(fetchActions.endAndError());
    yield put(snackbarActions.error("Thêm không thành công"));
  }
}

function* fetchUpdate({
  payload: { id, ...dto },
}: ActionPayload<{ id: number } & Partial<CreateBlogCategoryDTO>>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchUpdate));
  try {
    const data: BlogCategoryModel = yield call(() => bcApi.update({ id, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndResetForm());
      yield put(snackbarActions.success("Cập nhật thành công"));
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchUpdate error", error);
  }
  if (isError) {
    yield put(fetchActions.endAndError());
    yield put(snackbarActions.error("Cập nhật không thành công"));
  }
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchSoftDeleteSingle));
  try {
    const result: boolean = yield call(() => bcApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchGetById));
  try {
    const data: BlogCategoryModel = yield call(() => bcApi.getById(id));
    if (data.id > 0) {
      isError = false;
      yield put(blogCategoryActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteMultiple({
  payload: listId,
}: ActionPayload<number[]>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducer.fetchSoftDeleteMultiple));
  try {
    const result: boolean = yield call(() => bcApi.softDeleteMultiple(listId));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndDeleted());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchSoftDeleteMultiple error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* blogCategorySaga() {
  yield takeEvery(blogCategoryReducer.fetchGetAll, fetchGetAll);
  yield takeEvery(blogCategoryReducer.fetchCreate, fetchCreate);
  yield takeEvery(blogCategoryReducer.fetchUpdate, fetchUpdate);
  yield takeEvery(
    blogCategoryReducer.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(blogCategoryReducer.fetchGetById, fetchGetById);
  yield takeEvery(
    blogCategoryReducer.fetchSoftDeleteMultiple,
    fetchSoftDeleteMultiple
  );
}
