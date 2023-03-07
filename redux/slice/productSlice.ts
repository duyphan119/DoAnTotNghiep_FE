// import { createSlice } from "@reduxjs/toolkit";
// import { CreateProductDTO, ProductQueryParams } from "../../apis/product";
// import { ProductInputs } from "../../pages/admin/product/create";
// import { EMPTY_ITEMS } from "../../utils/constants";
// import { FetchState, Product, ResponseItems } from "../../utils/types";
// import { ActionPayload, RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";
import {
  ProductModel,
  ProductVariantModel,
  ResponseGetAllModel,
} from "../../models";
import { CreateProductDTO } from "../../types/dtos";
import { ProductParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

// const NAME_SLICE = "product";

// export type CreateProductPayload = {
//   files: FileList | null;
//   inputs: ProductInputs;
// };

// export type UpdateProductPayload = CreateProductPayload & { id: number };

// type ProductManagementState = {
//   productData: ResponseItems<Product>;
//   openModalPVI: boolean;
//   openModalPV: boolean;
//   openModalPreview: boolean;
//   current: Product | null;
//   openDialog: boolean;
//   productEditing: Product | null;
//   isBack: boolean;
// };

// type State = ProductManagementState & FetchState;

// const INITIAL_STATE: State = {
//   productData: EMPTY_ITEMS,
//   openModalPVI: false,
//   openModalPreview: false,
//   openModalPV: false,
//   openDialog: false,
//   current: null,
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
//   productEditing: null,
//   isBack: false,
// };

// export const productManagementSlice = createSlice({
//   name: NAME_SLICE,
//   initialState: INITIAL_STATE,
//   reducers: {
//     fetchProductData: (state, action: ActionPayload<ProductQueryParams>) => {
//       state.isError = false;
//       state.isLoading = true;
//       state.isSuccess = false;
//       state.isBack = false;
//     },
//     fetchError: (state) => {
//       state.isError = true;
//       state.isLoading = false;
//     },
//     setProductData: (state, action: ActionPayload<ResponseItems<Product>>) => {
//       const productData = action.payload;
//       state.productData = productData;
//       state.isLoading = false;
//       state.isSuccess = true;
//     },
//     showModalPVI: (state, action: ActionPayload<Product>) => {
//       state.current = action.payload;
//       state.openModalPVI = true;
//     },
//     hideModalPVI: (state) => {
//       state.current = null;
//       state.openModalPVI = false;
//     },
//     showModalPV: (state, action: ActionPayload<Product>) => {
//       state.current = action.payload;
//       state.openModalPV = true;
//     },
//     hideModalPV: (state) => {
//       state.current = null;
//       state.openModalPV = false;
//     },
//     showModalPreview: (state, action: ActionPayload<Product>) => {
//       state.current = action.payload;
//       state.openModalPreview = true;
//     },
//     hideModalPreview: (state) => {
//       state.current = null;
//       state.openModalPreview = false;
//     },
//     showDialog: (state, action: ActionPayload<Product>) => {
//       state.current = action.payload;
//       state.openDialog = true;
//     },
//     hideDialog: (state) => {
//       state.current = null;
//       state.openDialog = false;
//     },
//     fetchCreateProduct: (state, action: ActionPayload<any>) => {
//       state.isError = false;
//       state.isLoading = true;
//       state.isSuccess = false;
//       state.isBack = false;
//     },
//     fetchSuccess: (state) => {
//       state.isSuccess = true;
//       state.isLoading = false;
//     },
//     fetchGetProductById: (state, action: ActionPayload<number>) => {
//       state.isError = false;
//       state.isLoading = true;
//       state.isSuccess = false;
//       state.isBack = false;
//     },
//     setProductEditing: (state, action: ActionPayload<Product | null>) => {
//       state.productEditing = action.payload;
//       state.isSuccess = true;
//       state.isLoading = false;
//     },
//     fetchUpdateProduct: (state, action: ActionPayload<any>) => {
//       state.isError = false;
//       state.isLoading = true;
//       state.isSuccess = false;
//       state.isBack = false;
//     },
//     back: (state) => {
//       state.isBack = true;
//     },
//   },
// });

// export const productManagementReducers = {
//   fetchProductData: `${NAME_SLICE}/fetchProductData`,
//   fetchCreateProduct: `${NAME_SLICE}/fetchCreateProduct`,
//   fetchGetProductById: `${NAME_SLICE}/fetchGetProductById`,
//   fetchUpdateProduct: `${NAME_SLICE}/fetchUpdateProduct`,
// };
// export const productManagementSelector = (state: RootState): State =>
//   state.productManagement;
// export const productManagementActions = productManagementSlice.actions;
// export default productManagementSlice.reducer;

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
