// import { createSlice } from "@reduxjs/toolkit";
// import {
//   CreateProductVariant,
//   ProductVariantQueryParams,
// } from "../../apis/productvariant";
// import {
//   FetchState,
//   Product,
//   ProductVariant,
//   Variant,
//   VariantValue,
// } from "../../utils/types";
// import { ActionPayload, RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";
import {
  ProductVariantModel,
  VariantModel,
  VariantValueModel,
} from "../../models";
import { CreateProductVariantDTO } from "../../types/dtos";
import { ProductVariantParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

// export type ProductVariantInput = {
//   price: number;
//   inventory: number;
//   name: string;
// };

// type State = {
//   productVariants: ProductVariant[];
//   inputs: ProductVariantInput[];
//   openDialog: boolean;
// } & FetchState;

// const NAME_SLICE = "productVariant";

// const INITIAL_STATE: State = {
//   productVariants: [],
//   inputs: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: true,
//   openDialog: false,
// };

// const productVariantSlice = createSlice({
//   name: NAME_SLICE,
//   initialState: INITIAL_STATE,
//   reducers: {
//     fetchCreateProductVariants: (
//       state,
//       action: ActionPayload<CreateProductVariant[]>
//     ) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = true;
//     },
//     fetchError: (state) => {
//       state.isError = true;
//       state.isLoading = false;
//     },
//     fetchSuccess: (state) => {
//       state.isSuccess = true;
//       state.isLoading = false;
//     },
//     setProductVariants: (state, action: ActionPayload<ProductVariant[]>) => {
//       state.productVariants = action.payload;
//     },
//     setInputs: (state, action: ActionPayload<ProductVariantInput[]>) => {
//       state.inputs = action.payload;
//     },
//     fetchGetAllProductVariants: (
//       state,
//       action: ActionPayload<ProductVariantQueryParams>
//     ) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = true;
//     },
//     generateInputs: (
//       state,
//       action: ActionPayload<{
//         selected: Variant[];
//         count: number;
//         price: number;
//         inventory: number;
//         variants: Variant[];
//       }>
//     ) => {
//       const { count, selected, variants, price, inventory } = action.payload;
//       let results = new Array(count).fill("");
//       selected.forEach((variant: Variant, index1: number) => {
//         if (variant.variantValues.length > 0)
//           results = results.map((result: any, index2: number) => {
//             const LENGTH = variant.variantValues.length;
//             if (index1 === variants.length - 1) {
//               return [
//                 ...result,
//                 variant.variantValues[Math.floor(index2 % LENGTH)],
//               ];
//             } else {
//               return [
//                 ...result,
//                 variant.variantValues[Math.floor((index2 * LENGTH) / count)],
//               ];
//             }
//           });
//       });
//       state.inputs = results.map((variantValues: VariantValue[]) => {
//         return {
//           name: (() => {
//             variantValues.sort(
//               (a: VariantValue, b: VariantValue) => a.id - b.id
//             );
//             return variantValues
//               .map((variantValue: VariantValue) => variantValue.value)
//               .join(" / ");
//           })(),
//           price,
//           inventory,
//           variantValues,
//         };
//       });
//     },
//     fetchUpdateProductVariants: (
//       state,
//       action: ActionPayload<ProductVariant[]>
//     ) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = true;
//     },
//     changeInput: (state, action: ActionPayload<ProductVariantInput>) => {
// const data = action.payload;
// const index1 = state.productVariants.findIndex(
//   (productVariant: ProductVariant) => productVariant.name === data.name
// );
// if (index1 === -1) {
//   const index2 = state.inputs.findIndex(
//     (input: ProductVariantInput) => input.name === data.name
//   );
//   if (index2 !== -1) {
//     state.inputs[index2] = { ...state.inputs[index2], ...data };
//   }
// } else {
//   state.productVariants[index1] = {
//     ...state.productVariants[index1],
//     ...data,
//   };
// }
//     },
//     fetchDeleteProductVariant: (state, action: ActionPayload<number>) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = true;
//     },
//     deleteProductVariant: (state, action: ActionPayload<number>) => {
//       state.productVariants = state.productVariants.filter(
//         (item) => item.id !== action.payload
//       );
//       state.isSuccess = true;
//       state.isLoading = false;
//     },
//     resetInputs: (state) => {
//       state.inputs = [];
//     },
//   },
// });

// export const productvariantReducer = {
//   fetchCreateProductVariants: `${NAME_SLICE}/fetchCreateProductVariants`,
//   fetchUpdateProductVariants: `${NAME_SLICE}/fetchUpdateProductVariants`,
//   fetchGetAllProductVariants: `${NAME_SLICE}/fetchGetAllProductVariants`,
//   fetchDeleteProductVariant: `${NAME_SLICE}/fetchDeleteProductVariant`,
// };

const NAME_SLICE = "productVariant";

type State = {
  productVariants: ProductVariantModel[];
  inputs: ProductVariantModel[];
};

const INITIAL_STATE: State = {
  productVariants: [],
  inputs: [],
};

const productVariantSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<ProductVariantParams>) => {},
    setInputs: (state, action: ActionPayload<ProductVariantModel[]>) => {
      state.inputs = action.payload;
    },
    setProductVariants: (
      state,
      action: ActionPayload<ProductVariantModel[]>
    ) => {
      state.productVariants = action.payload;
    },
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        dto: Partial<CreateProductVariantDTO>;
      }>
    ) => {},
    fetchCreateMany: (
      state,
      action: ActionPayload<CreateProductVariantDTO[]>
    ) => {},
    fetchUpdateMany: (
      state,
      action: ActionPayload<
        Array<{ id: number; dto: Partial<CreateProductVariantDTO> }>
      >
    ) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    generateInputs: (
      state,
      action: ActionPayload<{
        selected: VariantModel[];
        variants: VariantModel[];
        count: number;
        price: number;
        inventory: number;
      }>
    ) => {
      const { count, selected, variants, price, inventory } = action.payload;
      let results = new Array(count).fill("");
      selected.forEach((variant: VariantModel, index1: number) => {
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
      const lengthResults = results.length;
      let newInventory = Math.floor(inventory / lengthResults);
      state.inputs = results.map((variantValues: VariantValueModel[]) => {
        return new ProductVariantModel({
          name: (() => {
            variantValues.sort(
              (a: VariantValueModel, b: VariantValueModel) => a.id - b.id
            );
            return variantValues
              .map((variantValue: VariantValueModel) => variantValue.value)
              .join(" / ");
          })(),
          price,
          inventory: newInventory,
          variantValues,
        });
      });
      if (newInventory * lengthResults < inventory) {
        state.inputs[state.inputs.length - 1].inventory +=
          inventory - newInventory * lengthResults;
      }
    },
    changeInput: (state, action) => {
      const data = action.payload;
      const index1 = state.productVariants.findIndex(
        (productVariant: ProductVariantModel) =>
          productVariant.name === data.name
      );
      if (index1 === -1) {
        const index2 = state.inputs.findIndex(
          (input: ProductVariantModel) => input.name === data.name
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
    deleteProductVariant: (state, action: ActionPayload<number>) => {
      state.productVariants = state.productVariants.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const productVariantReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreateMany: `${NAME_SLICE}/fetchCreateMany`,
  fetchUpdateMany: `${NAME_SLICE}/fetchUpdateMany`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
};
export const productVariantSelector = (state: RootState): State =>
  state.productVariant;
export const productVariantActions = productVariantSlice.actions;
export default productVariantSlice.reducer;
