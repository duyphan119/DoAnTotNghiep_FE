import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import cartSlice from "./slice/cartSlice";
import groupProductManagementSlice from "./slice/groupProductManagementSlice";
import groupProductSlice from "./slice/groupProductSlice";
import productDetailSlice from "./slice/productDetailSlice";
import productManagementSlice from "./slice/productManagementSlice";
import snackbarSlice from "./slice/snackbarSlice";
import userAddressSlice from "./slice/userAddressSlice";
export const rootReducer = combineReducers({
  cart: cartSlice,
  groupProduct: groupProductSlice,
  snackbar: snackbarSlice,
  auth: authSlice,
  productDetail: productDetailSlice,
  userAddress: userAddressSlice,
  productManagement: productManagementSlice,
  groupProductManagement: groupProductManagementSlice,
});
