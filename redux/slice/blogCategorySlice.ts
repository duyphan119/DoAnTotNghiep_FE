import { createSlice } from "@reduxjs/toolkit";
import { BlogCategoryModel, ResponseGetAllModel } from "@/models";
import { ActionPayload, RootState } from "@/redux/store";
import { CreateBlogCategoryDTO } from "@/types/dtos";
import { BlogCategoryParams } from "@/types/params";

const NAME_SLICE = "blogCategory";

type State = {
  blogCategoryData: ResponseGetAllModel<BlogCategoryModel>;
  current: BlogCategoryModel;
};

const INITIAL_STATE: State = {
  blogCategoryData: new ResponseGetAllModel(),
  current: new BlogCategoryModel(),
};

const blogCategorySlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<BlogCategoryParams>) => {},
    fetchCreate: (state, action: ActionPayload<CreateBlogCategoryDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{ id: number } & Partial<CreateBlogCategoryDTO>>
    ) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {},
    setBlogCategoryData: (
      state,
      action: ActionPayload<ResponseGetAllModel<BlogCategoryModel>>
    ) => {
      state.blogCategoryData = action.payload;
    },
    setCurrent: (state, action: ActionPayload<BlogCategoryModel>) => {
      state.current = action.payload;
    },
  },
});

export const blogCategoryReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
};
export const blogCategorySeletor = (state: RootState): State =>
  state.blogCategory;
export const blogCategoryActions = blogCategorySlice.actions;
export default blogCategorySlice.reducer;
