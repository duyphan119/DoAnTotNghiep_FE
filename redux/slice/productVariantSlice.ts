import { createSlice } from "@reduxjs/toolkit";
import {
  CreateProductVariant,
  ProductVariantQueryParams,
} from "../../apis/productvariant";
import {
  FetchState,
  Product,
  ProductVariant,
  Variant,
  VariantValue,
} from "../../utils/types";
import { ActionPayload, RootState } from "../store";

export type ProductVariantInput = {
  price: number;
  inventory: number;
  name: string;
};

type State = {
  productVariants: ProductVariant[];
  inputs: ProductVariantInput[];
  openDialog: boolean;
} & FetchState;

const NAME_SLICE = "productVariant";

const INITIAL_STATE: State = {
  productVariants: [],
  inputs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  openDialog: false,
};

const productVariantSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchCreateProductVariants: (
      state,
      action: ActionPayload<CreateProductVariant[]>
    ) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    fetchSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    setProductVariants: (state, action: ActionPayload<ProductVariant[]>) => {
      state.productVariants = action.payload;
    },
    setInputs: (state, action: ActionPayload<ProductVariantInput[]>) => {
      state.inputs = action.payload;
    },
    fetchGetAllProductVariants: (
      state,
      action: ActionPayload<ProductVariantQueryParams>
    ) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    generateInputs: (
      state,
      action: ActionPayload<{
        selected: Variant[];
        count: number;
        product?: Product;
        variants: Variant[];
      }>
    ) => {
      const { count, selected, variants, product } = action.payload;
      let results = new Array(count).fill("");
      selected.forEach((variant: Variant, index1: number) => {
        if (variant.variantValues.length > 0)
          results = results.map((result: any, index2: number) => {
            const LENGTH = variant.variantValues.length;
            if (index1 === variants.length - 1) {
              return [
                ...result,
                variant.variantValues[Math.floor(index2 % LENGTH)],
              ];
            } else {
              return [
                ...result,
                variant.variantValues[Math.floor((index2 * LENGTH) / count)],
              ];
            }
          });
      });
      state.inputs = results.map((variantValues: VariantValue[]) => {
        return {
          name: (() => {
            variantValues.sort(
              (a: VariantValue, b: VariantValue) => a.id - b.id
            );
            return variantValues
              .map((variantValue: VariantValue) => variantValue.value)
              .join(" / ");
          })(),
          price: product ? product.price : 0,
          inventory: product ? product.inventory : 0,
          variantValues,
        };
      });
    },
    fetchUpdateProductVariants: (
      state,
      action: ActionPayload<ProductVariant[]>
    ) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    changeInput: (state, action: ActionPayload<ProductVariantInput>) => {
      const data = action.payload;
      const index1 = state.productVariants.findIndex(
        (productVariant: ProductVariant) => productVariant.name === data.name
      );
      if (index1 === -1) {
        const index2 = state.inputs.findIndex(
          (input: ProductVariantInput) => input.name === data.name
        );
        if (index2 !== -1) {
          state.inputs[index2] = { ...state.inputs[index2], ...data };
        }
      } else {
        state.productVariants[index1] = {
          ...state.productVariants[index1],
          ...data,
        };
      }
    },
    fetchDeleteProductVariant: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    },
    deleteProductVariant: (state, action: ActionPayload<number>) => {
      state.productVariants = state.productVariants.filter(
        (item) => item.id !== action.payload
      );
      state.isSuccess = true;
      state.isLoading = false;
    },
  },
});

export const productVariantReducers = {
  fetchCreateProductVariants: `${NAME_SLICE}/fetchCreateProductVariants`,
  fetchUpdateProductVariants: `${NAME_SLICE}/fetchUpdateProductVariants`,
  fetchGetAllProductVariants: `${NAME_SLICE}/fetchGetAllProductVariants`,
  fetchDeleteProductVariant: `${NAME_SLICE}/fetchDeleteProductVariant`,
};
export const productVariantSelector = (state: RootState): State =>
  state.productVariant;
export const productVariantActions = productVariantSlice.actions;
export default productVariantSlice.reducer;
