import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import cartSlice from "./slice/cartSlice";
import groupProductManagementSlice from "./slice/groupProductManagementSlice";
import groupProductSlice from "./slice/groupProductSlice";
import productDetailSlice from "./slice/productDetailSlice";
import productSlice from "./slice/productSlice";
import productVariantSlice from "./slice/productVariantSlice";
import snackbarSlice from "./slice/snackbarSlice";
import userAddressSlice from "./slice/userAddressSlice";
import variantSlice from "./slice/variantSlice";
import blogSlice from "./slice/blogSlice";
import advertisementSlice from "./slice/advertisementSlice";
import blogCategorySlice from "./slice/blogCategorySlice";
import fetchSlice from "./slice/fetchSlice";
import confirmDialogSlice from "./slice/confirmDialogSlice";
import orderSlice from "./slice/orderSlice";
import userSlice from "./slice/userSlice";
import commentProductSlice from "./slice/commentProductSlice";
export const rootReducer = combineReducers({
  cart: cartSlice,
  groupProduct: groupProductSlice,
  snackbar: snackbarSlice,
  auth: authSlice,
  productDetail: productDetailSlice,
  userAddress: userAddressSlice,
  product: productSlice,
  groupProductManagement: groupProductManagementSlice,
  productVariant: productVariantSlice,
  variant: variantSlice,
  blog: blogSlice,
  advertisement: advertisementSlice,
  blogCategory: blogCategorySlice,
  fetch: fetchSlice,
  confirmDialog: confirmDialogSlice,
  order: orderSlice,
  user: userSlice,
  commentProduct: commentProductSlice,
});
