import { createSlice } from "@reduxjs/toolkit";
import { CommentProductModel, ResponseGetAllModel } from "../../models";
import { CreateCommentProductDTO } from "../../types/dtos";
import { CommentProductParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

type State = {
  commentProductData: ResponseGetAllModel<CommentProductModel>;
};

const NAME_SLICE = "comment-product";

const INITIAL_STATE: State = {
  commentProductData: new ResponseGetAllModel(),
};

const commentProductSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<CommentProductParams>) => {},
    fetchCreate: (state, action: ActionPayload<CreateCommentProductDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{ id: number; dto: CreateCommentProductDTO }>
    ) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    setCommentProductData: (
      state,
      action: ActionPayload<ResponseGetAllModel<CommentProductModel>>
    ) => {
      state.commentProductData = action.payload;
    },
  },
});

export const commentProductReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
};
export const commentProductActions = commentProductSlice.actions;
export const commentProductSelector = (state: RootState): State =>
  state.commentProduct;
export default commentProductSlice.reducer;
