import { BlogCategoryApi } from "@/api";
import { BlogCategoryModel, ResponseGetAllModel } from "@/models";
import { ActionPayload } from "@/redux/store";
import { CreateBlogCategoryDTO } from "@/types/dtos";
import { BlogCategoryParams } from "@/types/params";
import { call, put, takeEvery } from "redux-saga/effects";
import { MSG_SUCCESS } from "@/utils/constants";
import {
  blogCategoryActions,
  blogCategoryReducers,
} from "@/redux/slice/blogCategorySlice";
import { fetchActions } from "@/redux/slice/fetchSlice";

const bcApi = new BlogCategoryApi();

function* fetchGetAll({ payload: params }: ActionPayload<BlogCategoryParams>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchGetAll));
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
  yield put(fetchActions.start(blogCategoryReducers.fetchCreate));
  try {
    const { message } = yield call(() => bcApi.create(dto));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchCreate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdate({
  payload: { id, ...dto },
}: ActionPayload<{ id: number } & Partial<CreateBlogCategoryDTO>>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchUpdate));
  try {
    const { message } = yield call(() => bcApi.update({ id, dto }));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchUpdate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchSoftDeleteSingle));
  try {
    const { message } = yield call(() => bcApi.softDeleteSingle(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchGetById));
  try {
    const { message, data } = yield call(() => bcApi.getById(id));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogCategoryActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* blogCategorySaga() {
  yield takeEvery(blogCategoryReducers.fetchGetAll, fetchGetAll);
  yield takeEvery(blogCategoryReducers.fetchCreate, fetchCreate);
  yield takeEvery(blogCategoryReducers.fetchUpdate, fetchUpdate);
  yield takeEvery(
    blogCategoryReducers.fetchSoftDeleteSingle,
    fetchSoftDeleteSingle
  );
  yield takeEvery(blogCategoryReducers.fetchGetById, fetchGetById);
}
