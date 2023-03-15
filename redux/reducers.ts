import { combineReducers } from "redux";
import advertisementSlice from "./slice/advertisementSlice";
import authSlice from "./slice/authSlice";
import blogCategorySlice from "./slice/blogCategorySlice";
import blogSlice from "./slice/blogSlice";
import cartSlice from "./slice/cartSlice";
import commentProductSlice from "./slice/commentProductSlice";
import confirmDialogSlice from "./slice/confirmDialogSlice";
import fetchSlice from "./slice/fetchSlice";
import groupProductManagementSlice from "./slice/groupProductManagementSlice";
import groupProductSlice from "./slice/groupProductSlice";
import orderDiscountSlice from "./slice/orderDiscountSlice";
import orderSlice from "./slice/orderSlice";
import productDetailSlice from "./slice/productDetailSlice";
import productSlice from "./slice/productSlice";
import productVariantSlice from "./slice/productVariantSlice";
import snackbarSlice from "./slice/snackbarSlice";
import userAddressSlice from "./slice/userAddressSlice";
import userSlice from "./slice/userSlice";
import variantSlice from "./slice/variantSlice";
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
  orderDiscount: orderDiscountSlice,
});
