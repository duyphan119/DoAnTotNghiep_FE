import { call, put, takeEvery } from "redux-saga/effects";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsClient,
  getBlogById,
  restoreBlog,
  softDeleteBlog,
  updateBlog,
} from "../../apis/blog";
import { ProductQueryParams } from "../../apis/product";
import { uploadSingle } from "../../apis/upload";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  blogActions,
  blogReducers,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "../slice/blogSlice";
import { fetchActions } from "../slice/fetchSlice";
import { ActionPayload } from "../store";

function* fetchBlogData({
  payload: params,
}: ActionPayload<ProductQueryParams>): any {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchBlogData));
  try {
    const { p, sortBy, sortType, limit } = params;
    const { message, data } = yield call(() =>
      getAllBlogsClient({
        p: p || 1,
        limit,
        sortBy,
        sortType,
        withDeleted: true,
      })
    );
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogActions.setBlogData(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogActions.fetchBlogData", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreateBlog({ payload }: ActionPayload<CreateBlogPayload>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchCreateBlog));
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
      createBlog({
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.back());
    }
  } catch (error) {
    console.log("blogActions.fetchCreateBlog", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdateBlog({ payload }: ActionPayload<UpdateBlogPayload>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchUpdateBlog));
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
      updateBlog(id, {
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.back());
    }
  } catch (error) {
    console.log("blogActions.fetchUpdateBlog", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetBlogById({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchGetBlogById));
  try {
    const { message, data } = yield call(() => getBlogById(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.setBlogEditing(data));
    }
  } catch (error) {
    console.log("blogActions.fetchGetBlogById", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchDeleteBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchDeleteBlog));
  try {
    const { message } = yield call(() => deleteBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.deleted());
    }
  } catch (error) {
    console.log("blogActions.fetchDeleteBlog", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchRestoreBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchRestoreBlog));
  try {
    const { message } = yield call(() => restoreBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.restore(payload));
    }
  } catch (error) {
    console.log("blogActions.fetchRestoreBlog", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchSoftDeleteBlog));
  try {
    const { message } = yield call(() => softDeleteBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
      yield put(blogActions.softDelete(payload));
    }
  } catch (error) {
    console.log("blogActions.fetchSoftDeleteBlog", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* blogManamentSaga() {
  yield takeEvery(blogReducers.fetchBlogData, fetchBlogData);
  yield takeEvery(blogReducers.fetchCreateBlog, fetchCreateBlog);
  yield takeEvery(blogReducers.fetchUpdateBlog, fetchUpdateBlog);
  yield takeEvery(blogReducers.fetchGetBlogById, fetchGetBlogById);
  yield takeEvery(blogReducers.fetchDeleteBlog, fetchDeleteBlog);
  yield takeEvery(blogReducers.fetchRestoreBlog, fetchRestoreBlog);
  yield takeEvery(blogReducers.fetchSoftDeleteBlog, fetchSoftDeleteBlog);
}
