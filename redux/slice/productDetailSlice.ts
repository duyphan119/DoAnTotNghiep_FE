import { ActionPayload, RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import {
  CommentProductModel,
  ProductModel,
  ProductVariantModel,
  ResponseGetAllModel,
  VariantValueModel,
} from "@/models";
import { CreateCommentProductDTO } from "@/types/dtos";
import { CommentProductParams } from "@/types/params";

export type SetPagePayload = {
  page: number;
  product: ProductModel;
};

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
  userCommentProduct: CommentProductModel;
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
  userCommentProduct: new CommentProductModel(),
};

const productDetailSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setProduct: (state, action: ActionPayload<ProductModel>) => {
      let product = action.payload;
      state.product = product;
      if (product.id)
        state.renderVariantValues = product.formatProductVariants();
      if (product.productVariants.length > 0) {
        const selectedProductVariant = product.productVariants.find(
          (item) => item.inventory > 0
        );

        if (selectedProductVariant) {
          state.selectedProductVariant = selectedProductVariant;
          state.selectedVariantValues = selectedProductVariant.variantValues;
        }
      }
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
    },
    setPage: (state, action: ActionPayload<SetPagePayload>) => {
      let { page } = action.payload;
      state.page = page;
    },
    fetchAddCommnetProduct: (
      state,
      action: ActionPayload<CreateCommentProductDTO>
    ) => {},
    addCommentProduct: (state, action: ActionPayload<CommentProductModel>) => {
      state.commentProductData.items.unshift(action.payload);
      state.totalPage = Math.ceil(state.commentProductData.count / 4);
      if (
        state.page < state.totalPage &&
        state.commentProductData.items.length > 5
      ) {
        state.commentProductData.items.pop();
      }
      state.commentProductData = new ResponseGetAllModel(
        state.commentProductData.items,
        state.commentProductData.count + 1
      );
    },
    fetchUpdateCommentProduct: (
      state,
      action: ActionPayload<{ id: number; dto: CreateCommentProductDTO }>
    ) => {},
    updateCommnetProduct: (
      state,
      action: ActionPayload<CommentProductModel>
    ) => {
      let data = action.payload;
      const newCommentProductData = state.commentProductData;
      newCommentProductData.items = newCommentProductData.items.map((item) =>
        item.id === data.id ? data : item
      );
      state.commentProductData = newCommentProductData;
      state.userCommentProduct = action.payload;
    },
    fetchGetAllCommentProduct: (
      state,
      action: ActionPayload<CommentProductParams>
    ) => {},
    setUserCommentProduct: (
      state,
      action: ActionPayload<CommentProductModel>
    ) => {
      state.userCommentProduct = action.payload;
    },
    updateStar: (
      state,
      { payload: { id, star } }: ActionPayload<{ id: number; star: number }>
    ) => {
      if (id === state.product.id)
        state.product = new ProductModel({ ...state.product, star });
    },
  },
});
export const productDetailReducer = {
  setProduct: `${NAME_SLICE}/setProduct`,
  setPage: `${NAME_SLICE}/setPage`,
  fetchAddCommnetProduct: `${NAME_SLICE}/fetchAddCommnetProduct`,
  fetchUpdateCommentProduct: `${NAME_SLICE}/fetchUpdateCommentProduct`,
  fetchGetAllCommentProduct: `${NAME_SLICE}/fetchGetAllCommentProduct`,
};
export const productDetailSelector = (state: RootState): State =>
  state.productDetail;
export const productDetailActions = productDetailSlice.actions;
export default productDetailSlice.reducer;
