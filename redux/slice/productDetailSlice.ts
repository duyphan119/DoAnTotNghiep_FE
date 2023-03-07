import { createSlice } from "@reduxjs/toolkit";
import { CommentProductDTO } from "../../apis/commentproduct";
import {
  ProductModel,
  ProductVariantModel,
  ResponseGetAllModel,
  VariantValueModel,
} from "../../models";
import CommentProductModel from "../../models/CommentProductModel";
import { ActionPayload, RootState } from "../store";

export type SetPagePayload = {
  page: number;
  product: ProductModel;
};

export type FetchUpdateCommentProductPayload = {
  id: number;
} & Partial<CommentProductDTO>;

type State = {
  product: ProductModel;
  selectedVariantValues: VariantValueModel[];
  selectedProductVariant: ProductVariantModel;
  renderVariantValues: {
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  };
  commentProductData: ResponseGetAllModel<CommentProductModel>;
  page: number;
  totalPage: number;
};

const NAME_SLICE = "productDetail";

const INITIAL_STATE: State = {
  product: new ProductModel(),
  selectedVariantValues: [],
  selectedProductVariant: new ProductVariantModel(),
  renderVariantValues: {
    keys: [],
    values: {},
  },
  commentProductData: new ResponseGetAllModel(),
  page: 1,
  totalPage: 0,
};

const productDetailSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setProduct: (state, action: ActionPayload<ProductModel>) => {
      let product = action.payload;
      state.product = product;
      if (product) state.renderVariantValues = product.formatProductVariants();
    },
    clickVariantValue: (state, action: ActionPayload<VariantValueModel>) => {
      let variantValue = action.payload;
      let index = state.selectedVariantValues.findIndex(
        (i) =>
          i.variant &&
          variantValue.variant &&
          i.variant.name === variantValue.variant.name
      );
      if (index === -1) state.selectedVariantValues.push(variantValue);
      else state.selectedVariantValues[index] = variantValue;

      let productVariant = state.product?.productVariants?.find((pv) =>
        pv.variantValues.every(
          (vv) =>
            state.selectedVariantValues.findIndex((_vv) => vv.id === _vv.id) !==
            -1
        )
      );
      if (productVariant) state.selectedProductVariant = productVariant;
    },
    setCommentProductData: (
      state,
      action: ActionPayload<ResponseGetAllModel<CommentProductModel>>
    ) => {
      state.commentProductData = action.payload;
      state.totalPage = Math.ceil(action.payload.count / 4);
    },
    setPage: (state, action: ActionPayload<SetPagePayload>) => {
      let { page } = action.payload;
      state.page = page;
    },
    fetchAddCommnetProduct: (
      state,
      action: ActionPayload<CommentProductDTO>
    ) => {},
    addCommentProduct: (state, action: ActionPayload<CommentProductModel>) => {
      // state.commentProductData.userComment = action.payload;
      state.commentProductData.count += 1;
      state.commentProductData.items.unshift(action.payload);
      state.totalPage = Math.ceil(state.commentProductData.count / 4);
      if (
        state.page < state.totalPage &&
        state.commentProductData.items.length > 5
      ) {
        state.commentProductData.items.pop();
      }
    },
    fetchUpdateCommentProduct: (
      state,
      action: ActionPayload<FetchUpdateCommentProductPayload>
    ) => {},
    updateCommnetProduct: (
      state,
      action: ActionPayload<CommentProductModel>
    ) => {
      let data = action.payload;
      // state.commentProductData.userComment = data;
      state.commentProductData.items = state.commentProductData.items.map((i) =>
        i.id === data.id ? data : i
      );
    },
  },
});
export const productDetailReducers = {
  setProduct: `${NAME_SLICE}/setProduct`,
  setPage: `${NAME_SLICE}/setPage`,
  fetchAddCommnetProduct: `${NAME_SLICE}/fetchAddCommnetProduct`,
  fetchUpdateCommentProduct: `${NAME_SLICE}/fetchUpdateCommentProduct`,
};
export const productDetailSelector = (state: RootState): State =>
  state.productDetail;
export const productDetailActions = productDetailSlice.actions;
export default productDetailSlice.reducer;
