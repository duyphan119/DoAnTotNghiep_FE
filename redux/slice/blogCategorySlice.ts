import { createSlice } from "@reduxjs/toolkit";
import {
  BlogCategoryQueryParams,
  CreateBlogCategoryDTO,
} from "../../apis/blogCategory";
import { EMPTY_ITEMS } from "../../utils/constants";
import { BlogCategory, FetchState, ResponseItems } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "blogCategory";

type State = {
  blogCategoryData: ResponseItems<BlogCategory>;
  isBack: boolean;
  openDialog: boolean;
  current: BlogCategory | null;
  blogCategoryEditing: BlogCategory | null;
};

const INITIAL_STATE: State = {
  isBack: false,
  blogCategoryData: EMPTY_ITEMS,
  openDialog: false,
  current: null,
  blogCategoryEditing: null,
};

const blogCategorySlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchBlogCategoryData: (
      state,
      action: ActionPayload<BlogCategoryQueryParams>
    ) => {
      state.isBack = false;
    },
    fetchCreateBlogCategory: (
      state,
      action: ActionPayload<CreateBlogCategoryDTO>
    ) => {
      state.isBack = false;
    },
    fetchUpdateBlogCategory: (
      state,
      action: ActionPayload<{ id: number } & Partial<CreateBlogCategoryDTO>>
    ) => {
      state.isBack = false;
    },
    fetchGetBlogCategoryById: (state, action: ActionPayload<number>) => {
      state.isBack = false;
    },
    fetchDeleteBlogCategory: (state, action: ActionPayload<number>) => {
      state.isBack = false;
    },
    setBlogCategoryData: (
      state,
      action: ActionPayload<ResponseItems<BlogCategory>>
    ) => {
      state.blogCategoryData = action.payload;
    },
    back: (state) => {
      state.isBack = true;
    },
    showDialog: (state, action: ActionPayload<BlogCategory | null>) => {
      state.openDialog = true;
      state.current = action.payload;
    },
    hideDialog: (state) => {
      state.openDialog = false;
      state.current = null;
    },
    setCurrent: (state, action: ActionPayload<BlogCategory | null>) => {
      state.current = action.payload;
    },
    setBlogCategoryEditing: (
      state,
      action: ActionPayload<BlogCategory | null>
    ) => {
      state.blogCategoryEditing = action.payload;
    },
  },
});

export const blogCategoryReducers = {
  fetchBlogCategoryData: `${NAME_SLICE}/fetchBlogCategoryData`,
  fetchCreateBlogCategory: `${NAME_SLICE}/fetchCreateBlogCategory`,
  fetchUpdateBlogCategory: `${NAME_SLICE}/fetchUpdateBlogCategory`,
  fetchGetBlogCategoryById: `${NAME_SLICE}/fetchGetBlogCategoryById`,
  fetchDeleteBlogCategory: `${NAME_SLICE}/fetchDeleteBlogCategory`,
};
export const blogCategorySeletor = (state: RootState): State =>
  state.blogCategory;
export const blogCategoryActions = blogCategorySlice.actions;
export default blogCategorySlice.reducer;
