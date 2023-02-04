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
  blogManagementActions,
  blogManagementReducers,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "../slice/blogManagementSlice";
import { ActionPayload } from "../store";

function* fetchBlogData({
  payload: params,
}: ActionPayload<ProductQueryParams>): any {
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

    yield put(
      blogManagementActions.setBlogData(
        message === MSG_SUCCESS ? data : { items: 0, count: 0 }
      )
    );
  } catch (error) {
    console.log("blogManagementActions.fetchBlogData", error);
    yield put(blogManagementActions.fetchError());
  }
}

function* fetchCreateBlog({ payload }: ActionPayload<CreateBlogPayload>) {
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
      createBlog({
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.back());
    }
  } catch (error) {
    console.log("blogManagementActions.fetchCreateBlog", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

function* fetchUpdateBlog({ payload }: ActionPayload<UpdateBlogPayload>) {
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
      updateBlog(id, {
        ...dto,
        ...(url !== "" ? { thumbnail: url } : {}),
      })
    );
    if (msg === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.back());
    }
  } catch (error) {
    console.log("blogManagementActions.fetchUpdateBlog", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

function* fetchGetBlogById({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message, data } = yield call(() => getBlogById(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.setBlogEditing(data));
    }
  } catch (error) {
    console.log("blogManagementActions.fetchGetBlogById", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

function* fetchDeleteBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => deleteBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.deleted());
    }
  } catch (error) {
    console.log("blogManagementActions.fetchDeleteBlog", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

function* fetchRestoreBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => restoreBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.restore(payload));
    }
  } catch (error) {
    console.log("blogManagementActions.fetchRestoreBlog", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

function* fetchSoftDeleteBlog({ payload }: ActionPayload<number>) {
  let isError = true;
  try {
    const { message } = yield call(() => softDeleteBlog(payload));
    if (message === MSG_SUCCESS) {
      isError = false;
      yield put(blogManagementActions.fetchSuccess());
      yield put(blogManagementActions.softDelete(payload));
    }
  } catch (error) {
    console.log("blogManagementActions.fetchSoftDeleteBlog", error);
  }
  if (isError) yield put(blogManagementActions.fetchError());
}

export function* blogManamentSaga() {
  yield takeEvery(blogManagementReducers.fetchBlogData, fetchBlogData);
  yield takeEvery(blogManagementReducers.fetchCreateBlog, fetchCreateBlog);
  yield takeEvery(blogManagementReducers.fetchUpdateBlog, fetchUpdateBlog);
  yield takeEvery(blogManagementReducers.fetchGetBlogById, fetchGetBlogById);
  yield takeEvery(blogManagementReducers.fetchDeleteBlog, fetchDeleteBlog);
  yield takeEvery(blogManagementReducers.fetchRestoreBlog, fetchRestoreBlog);
  yield takeEvery(
    blogManagementReducers.fetchSoftDeleteBlog,
    fetchSoftDeleteBlog
  );
}
