import { call, put, takeEvery } from "redux-saga/effects";
import { MSG_SUCCESS } from "@/utils/constants";
import { blogActions, blogReducers } from "@/redux/slice/blogSlice";
import { fetchActions } from "@/redux/slice/fetchSlice";
import { ActionPayload } from "@/redux/store";
import { BlogApi } from "@/api";
import { BlogParams } from "@/types/params";
import { CreateBlogDTO } from "@/types/dtos";
import { BlogModel } from "@/models";

const bApi = new BlogApi();

function* fetchGetAll({ payload: params }: ActionPayload<BlogParams>): any {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchGetAll));
  try {
    const data = yield call(() => bApi.getAll(params));
    isError = false;
    yield put(blogActions.setBlogData(data));
    yield put(fetchActions.endAndSuccess());
  } catch (error) {
    console.log("blogActions.fetchGetAll error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchCreate({
  payload: { files, dto },
}: ActionPayload<{ files: FileList | null; dto: CreateBlogDTO }>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchCreate));
  try {
    const data: BlogModel = yield call(() => bApi.create({ files, dto }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("blogActions.fetchCreate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchUpdate({
  payload: { id, files, dto },
}: ActionPayload<{
  id: number;
  files: FileList | null;
  dto: Partial<CreateBlogDTO>;
}>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchUpdate));
  try {
    const data: BlogModel = yield call(() => bApi.update({ id, dto, files }));
    if (data.id > 0) {
      isError = false;
      yield put(fetchActions.endAndSuccessAndBack());
    }
  } catch (error) {
    console.log("blogActions.fetchUpdate error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchGetById({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchGetById));
  try {
    const data: BlogModel = yield call(() => bApi.getById(id));
    if (data.id > 0) {
      isError = false;
      yield put(blogActions.setCurrent(data));
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogActions.fetchGetById error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

function* fetchSoftDeleteSingle({ payload: id }: ActionPayload<number>) {
  let isError = true;
  yield put(fetchActions.start(blogReducers.fetchSoftDeleteSingle));
  try {
    const result: boolean = yield call(() => bApi.softDeleteSingle(id));
    if (result) {
      isError = false;
      yield put(fetchActions.endAndSuccess());
    }
  } catch (error) {
    console.log("blogActions.fetchSoftDeleteSingle error", error);
  }
  if (isError) yield put(fetchActions.endAndError());
}

export function* blogManamentSaga() {
  yield takeEvery(blogReducers.fetchGetAll, fetchGetAll);
  yield takeEvery(blogReducers.fetchCreate, fetchCreate);
  yield takeEvery(blogReducers.fetchUpdate, fetchUpdate);
  yield takeEvery(blogReducers.fetchGetById, fetchGetById);
  yield takeEvery(blogReducers.fetchSoftDeleteSingle, fetchSoftDeleteSingle);
}
