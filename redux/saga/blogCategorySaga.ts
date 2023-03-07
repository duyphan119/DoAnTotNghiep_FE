import { call, put, takeEvery } from "redux-saga/effects";
import {
  BlogCategoryQueryParams,
  createBlogCategory,
  CreateBlogCategoryDTO,
  deleteBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
} from "../../apis/blogCategory";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  blogCategoryActions,
  blogCategoryReducers,
} from "../slice/blogCategorySlice";
import { fetchActions } from "../slice/fetchSlice";
import { ActionPayload } from "../store";

function* fetchBlogCategoryData({
  payload,
}: ActionPayload<BlogCategoryQueryParams>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchBlogCategoryData));
  try {
    const { message, data } = yield call(() => getAllBlogCategories(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogCategoryActions.setBlogCategoryData(data));
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchBlogCategoryData error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreateBlogCategory({
  payload,
}: ActionPayload<CreateBlogCategoryDTO>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchCreateBlogCategory));
  try {
    const { message } = yield call(() => createBlogCategory(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogCategoryActions.back());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchCreateBlogCategory error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateBlogCategory({
  payload,
}: ActionPayload<{ id: number } & Partial<CreateBlogCategoryDTO>>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchUpdateBlogCategory));
  try {
    const { id, ...dto } = payload;
    const { message } = yield call(() => updateBlogCategory(id, dto));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogCategoryActions.back());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchCreateBlogCategory error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchDeleteBlogCategory({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchDeleteBlogCategory));
  try {
    const { message } = yield call(() => deleteBlogCategory(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchDeleteBlogCategory error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetBlogCategoryById({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogCategoryReducers.fetchGetBlogCategoryById));
  try {
    const { message, data } = yield call(() => getBlogCategoryById(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogCategoryActions.setBlogCategoryEditing(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogCategorySaga.fetchGetBlogCategoryById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* blogCategorySaga() {
  yield takeEvery(
    blogCategoryReducers.fetchBlogCategoryData,
    fetchBlogCategoryData
  );
  yield takeEvery(
    blogCategoryReducers.fetchCreateBlogCategory,
    fetchCreateBlogCategory
  );
  yield takeEvery(
    blogCategoryReducers.fetchUpdateBlogCategory,
    fetchUpdateBlogCategory
  );
  yield takeEvery(
    blogCategoryReducers.fetchDeleteBlogCategory,
    fetchDeleteBlogCategory
  );
  yield takeEvery(
    blogCategoryReducers.fetchGetBlogCategoryById,
    fetchGetBlogCategoryById
  );
}
