import { createSlice } from "@reduxjs/toolkit";
import {
  ProductModel,
  ProductVariantModel,
  ResponseGetAllModel,
} from "../../models";
import { CreateProductDTO } from "../../types/dtos";
import { ProductParams } from "../../types/params";
import { ActionPayload, RootState } from "@/redux/store";

const NAME_SLICE = "product";

type State = {
  productData: ResponseGetAllModel<ProductModel>;
  current: ProductModel;
  isDeleted: boolean;
  openModalPreview: boolean;
};

const INITIAL_STATE: State = {
  productData: new ResponseGetAllModel<ProductModel>(),
  current: new ProductModel(),
  isDeleted: false,
  openModalPreview: false,
};

const productSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<ProductParams>) => {},
    setProductData: (
      state,
      action: ActionPayload<ResponseGetAllModel<ProductModel>>
    ) => {
      state.productData = action.payload;
    },
    setCurrent: (state, action: ActionPayload<ProductModel>) => {
      state.current = action.payload;
    },
    fetchCreate: (state, action: ActionPayload<CreateProductDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<
        CreateProductDTO & {
          id: number;
          newProductVariants: ProductVariantModel[];
          deleteImages: number[];
          updateImages: Array<{
            id: number;
            variantValueId: number | null;
          }>;
          newImages: Array<{
            path: string;
            variantValueId: number | null;
          }>;
        }
      >
    ) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
    },
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {
      state.isDeleted = false;
    },
    fetchGetById: (state, action: ActionPayload<number>) => {},
    deleted: (state) => {
      state.isDeleted = true;
    },
    showModalPreview: (state, action: ActionPayload<ProductModel>) => {
      state.current = action.payload;
      state.openModalPreview = true;
    },
    hideModalPreview: (state) => {
      state.current = new ProductModel();
      state.openModalPreview = false;
    },
  },
});

export const productReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
};
export const productSelector = (state: RootState): State => state.product;
export const productActions = productSlice.actions;
export default productSlice.reducer;
