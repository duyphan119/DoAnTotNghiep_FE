import { createSlice } from "@reduxjs/toolkit";
import { CommentProductDTO } from "../../apis/commentproduct";
import { formatProductVariants } from "../../utils/helpers";
import {
  CommentProduct,
  FetchState,
  Product,
  ProductVariant,
  RenderVariantValues,
  ResponseItems,
  VariantValue,
} from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type CommentProductData = ResponseItems<CommentProduct> & {
  userComment: CommentProduct | null;
};

export type SetPagePayload = {
  page: number;
  product: Product | null;
};

export type FetchUpdateCommentProductPayload = {
  id: number;
} & Partial<CommentProductDTO>;

type State = {
  product: Product | null;
  selectedVariantValues: VariantValue[];
  selectedProductVariant: ProductVariant | null;
  renderVariantValues: RenderVariantValues;
  commentProductData: CommentProductData;
  page: number;
  totalPage: number;
} & FetchState;

const NAME_SLICE = "productDetail";

const INITIAL_STATE: State = {
  product: null,
  selectedVariantValues: [],
  selectedProductVariant: null,
  renderVariantValues: {
    keys: [],
    values: {},
  },
  commentProductData: {
    items: [],
    count: 0,
    userComment: null,
  },
  page: 1,
  totalPage: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const productDetailSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setProduct: (state, action: ActionPayload<Product | null>) => {
      let product = action.payload;
      state.product = product;
      if (product) state.renderVariantValues = formatProductVariants(product);
    },
    clickVariantValue: (state, action: ActionPayload<VariantValue>) => {
      let variantValue = action.payload;
      let index = state.selectedVariantValues.findIndex(
        (i: VariantValue) =>
          i.variant &&
          variantValue.variant &&
          i.variant.name === variantValue.variant.name
      );
      if (index === -1) state.selectedVariantValues.push(variantValue);
      else state.selectedVariantValues[index] = variantValue;

      let productVariant = state.product?.productVariants?.find(
        (pv: ProductVariant) =>
          pv.variantValues.every(
            (vv: VariantValue) =>
              state.selectedVariantValues.findIndex(
                (_vv: VariantValue) => vv.id === _vv.id
              ) !== -1
          )
      );
      state.selectedProductVariant = productVariant || null;
    },
    setCommentProductData: (
      state,
      action: ActionPayload<CommentProductData>
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
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    addCommentProduct: (state, action: ActionPayload<CommentProduct>) => {
      state.commentProductData.userComment = action.payload;
      state.commentProductData.count += 1;
      state.commentProductData.items.unshift(action.payload);
      state.totalPage = Math.ceil(state.commentProductData.count / 4);
      if (
        state.page < state.totalPage &&
        state.commentProductData.items.length > 5
      ) {
        state.commentProductData.items.pop();
      }
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchUpdateCommentProduct: (
      state,
      action: ActionPayload<FetchUpdateCommentProductPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    updateCommnetProduct: (state, action: ActionPayload<CommentProduct>) => {
      let data = action.payload;
      state.commentProductData.userComment = data;
      state.commentProductData.items = state.commentProductData.items.map((i) =>
        i.id === data.id ? data : i
      );
      state.isSuccess = true;
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
