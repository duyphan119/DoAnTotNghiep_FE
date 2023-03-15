import { createSlice } from "@reduxjs/toolkit";
import {
  CommentProductModel,
  RepCommentProductModel,
  ResponseGetAllModel,
} from "../../models";
import {
  CreateCommentProductDTO,
  CreateRepCommentProductDTO,
} from "../../types/dtos";
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
    fetchCreateRep: (
      state,
      action: ActionPayload<CreateRepCommentProductDTO>
    ) => {},
    createRep: (state, action: ActionPayload<RepCommentProductModel>) => {
      const { payload } = action;
      const index = state.commentProductData.items.findIndex(
        (item) => item.id === payload.commentProductId
      );

      if (index !== -1) {
        const newCommentProductData = state.commentProductData;
        newCommentProductData.items[index].repComments.push(payload);
        state.commentProductData = newCommentProductData;
      }
    },
    fetchUpdateRep: (
      state,
      action: ActionPayload<{ id: number; dto: CreateRepCommentProductDTO }>
    ) => {},
    updateRep: (state, action: ActionPayload<RepCommentProductModel>) => {
      const { payload } = action;
      const index = state.commentProductData.items.findIndex(
        (item) => item.id === payload.commentProductId
      );

      if (index !== -1) {
        const newCommentProductData = state.commentProductData;
        const index2 = newCommentProductData.items[index].repComments.findIndex(
          (item) => item.id === payload.id
        );
        if (index2 !== -1) {
          const newRepComments = newCommentProductData.items[index].repComments;
          newRepComments[index2].content = payload.content;
          newCommentProductData.items[index].repComments = newRepComments;
          state.commentProductData = newCommentProductData;
        }
      }
    },
    fetchDeleteRep: (state, action: ActionPayload<number>) => {},
    deleteRep: (state, { payload: id }: ActionPayload<number>) => {
      const newCommentProductData = state.commentProductData;
      newCommentProductData.items = newCommentProductData.items.map((item) => ({
        ...item,
        repComments: item.repComments.filter((subItem) => subItem.id !== id),
      }));
      state.commentProductData = newCommentProductData;
    },
  },
});

export const commentProductReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreateRep: `${NAME_SLICE}/fetchCreateRep`,
  fetchUpdateRep: `${NAME_SLICE}/fetchUpdateRep`,
  fetchDeleteRep: `${NAME_SLICE}/fetchDeleteRep`,
};
export const commentProductActions = commentProductSlice.actions;
export const commentProductSelector = (state: RootState): State =>
  state.commentProduct;
export default commentProductSlice.reducer;
