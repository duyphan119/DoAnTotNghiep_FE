import { createSlice } from "@reduxjs/toolkit";
import { CreateBlogDTO, BlogQueryParams } from "../../apis/blog";
import { EMPTY_ITEMS } from "../../utils/constants";
import { FetchState, Blog, ResponseItems } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "blog";

export type CreateBlogPayload = {
  dto: CreateBlogDTO;
} & Partial<{ files: FileList | null }>;
export type UpdateBlogPayload = {
  id: number;
} & Partial<CreateBlogPayload>;

type BlogManagementState = {
  blogData: ResponseItems<Blog>;
  openModalPVI: boolean;
  openModalPV: boolean;
  openModalPreview: boolean;
  current: Blog | null;
  openDialog: boolean;
  isBack: boolean;
  blogEditing: Blog | null;
  isDeleted: boolean;
};

type State = BlogManagementState & FetchState;

const INITIAL_STATE: State = {
  blogData: EMPTY_ITEMS,
  openModalPVI: false,
  openModalPreview: false,
  openModalPV: false,
  openDialog: false,
  current: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isBack: false,
  blogEditing: null,
  isDeleted: false,
};

export const blogManagementSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchBlogData: (state, action: ActionPayload<BlogQueryParams>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    setBlogData: (state, action: ActionPayload<ResponseItems<Blog>>) => {
      const blogData = action.payload;
      state.blogData = blogData;
      state.isLoading = false;
      state.isSuccess = true;
    },
    showDialog: (state, action: ActionPayload<Blog>) => {
      state.current = action.payload;
      state.openDialog = true;
    },
    hideDialog: (state) => {
      state.current = null;
      state.openDialog = false;
    },
    fetchCreateBlog: (state, action: ActionPayload<CreateBlogPayload>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    fetchHeaderData: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    back: (state) => {
      state.isBack = true;
    },
    fetchUpdateBlog: (state, action: ActionPayload<UpdateBlogPayload>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    setBlogEditing: (state, action: ActionPayload<Blog | null>) => {
      state.blogEditing = action.payload;
    },
    fetchGetBlogById: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchDeleteBlog: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
      state.isDeleted = false;
    },
    fetchSoftDeleteBlog: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    fetchRestoreBlog: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isBack = false;
    },
    deleted: (state) => {
      state.isDeleted = true;
    },
    restore: (state, action: ActionPayload<number>) => {
      const index = state.blogData.items.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1) {
        state.blogData.items[index].deletedAt = null;
      }
    },
    softDelete: (state, action: ActionPayload<number>) => {
      const index = state.blogData.items.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1) {
        state.blogData.items[index].deletedAt = new Date().toISOString();
      }
    },
  },
});

export const blogManagementReducers = {
  fetchBlogData: `${NAME_SLICE}/fetchBlogData`,
  fetchCreateBlog: `${NAME_SLICE}/fetchCreateBlog`,
  fetchHeaderData: `${NAME_SLICE}/fetchHeaderData`,
  fetchGetBlogById: `${NAME_SLICE}/fetchGetBlogById`,
  fetchUpdateBlog: `${NAME_SLICE}/fetchUpdateBlog`,
  fetchDeleteBlog: `${NAME_SLICE}/fetchDeleteBlog`,
  fetchSoftDeleteBlog: `${NAME_SLICE}/fetchSoftDeleteBlog`,
  fetchRestoreBlog: `${NAME_SLICE}/fetchRestoreBlog`,
};
export const blogManagementSelector = (state: RootState): State =>
  state.blogManagement;
export const blogManagementActions = blogManagementSlice.actions;
export default blogManagementSlice.reducer;
