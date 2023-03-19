import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "@/redux/store";
import { BlogModel, ResponseGetAllModel } from "@/models";
import { BlogParams } from "@/types/params";
import { CreateBlogDTO } from "@/types/dtos";

const NAME_SLICE = "blog";

type State = {
  blogData: ResponseGetAllModel<BlogModel>;
  current: BlogModel;
};

const INITIAL_STATE: State = {
  blogData: new ResponseGetAllModel(),
  current: new BlogModel(),
};

export const blogSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<BlogParams>) => {},
    setBlogData: (
      state,
      action: ActionPayload<ResponseGetAllModel<BlogModel>>
    ) => {
      const blogData = action.payload;
      state.blogData = blogData;
    },

    fetchCreate: (
      state,
      action: ActionPayload<{ files: FileList | null; dto: CreateBlogDTO }>
    ) => {},
    setCurrent: (state, action: ActionPayload<BlogModel>) => {
      state.current = action.payload;
    },
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        files: FileList | null;
        dto: Partial<CreateBlogDTO>;
      }>
    ) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
  },
});

export const blogReducers = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
};
export const blogSelector = (state: RootState): State => state.blog;
export const blogActions = blogSlice.actions;
export default blogSlice.reducer;
