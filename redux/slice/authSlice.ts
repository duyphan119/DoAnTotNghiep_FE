import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

import { OrderModel, ResponseGetAllModel, UserModel } from "@/models";
import { ActionPayload, RootState } from "@/redux/store";
import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  LoginDTO,
  RegisterDTO,
} from "@/types/dtos";
import { OrderParams } from "@/types/params";
import { COOKIE_ACCESSTOKEN_NAME, COOKIE_PROFILE } from "@/utils/constants";

type State = {
  profile: UserModel;
  accessToken: string;
  openModalAuth: boolean;
  orderData: ResponseGetAllModel<OrderModel>;
};

const NAME_SLICE = "auth";

const INITIAL_STATE: State = {
  profile: new UserModel(),
  accessToken: "",
  openModalAuth: false,
  orderData: new ResponseGetAllModel(),
};

const authSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetProfile: (state) => {},
    setProfile: (state, action: ActionPayload<UserModel>) => {
      state.profile = action.payload;
    },
    showModalAuth: (state) => {
      state.openModalAuth = true;
    },
    hideModalAuth: (state) => {
      state.openModalAuth = false;
    },
    fetchLogin: (state, action: ActionPayload<LoginDTO>) => {},
    login: (
      state,
      action: ActionPayload<{ user: UserModel; accessToken: string }>
    ) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.profile = user;
      state.openModalAuth = false;
      setCookie(COOKIE_ACCESSTOKEN_NAME, accessToken, {
        maxAge: 6000,
      });
    },
    fetchRegister: (state, action: ActionPayload<RegisterDTO>) => {},
    fetchChangeProfile: (state, action: ActionPayload<ChangeProfileDTO>) => {},
    fetchLogout: (state) => {},
    logout: (state) => {
      state.profile = new UserModel();
      state.accessToken = "";
      deleteCookie(COOKIE_ACCESSTOKEN_NAME);
    },
    fetchChangePassword: (
      state,
      action: ActionPayload<ChangePasswordDTO>
    ) => {},
    fetchUserOrderData: (state, action: ActionPayload<OrderParams>) => {},
    setUserOrderData: (
      state,
      action: ActionPayload<ResponseGetAllModel<OrderModel>>
    ) => {
      state.orderData = action.payload;
    },
  },
});
export const authReducer = {
  fetchGetProfile: `${NAME_SLICE}/fetchGetProfile`,
  fetchLogin: `${NAME_SLICE}/fetchLogin`,
  fetchRegister: `${NAME_SLICE}/fetchRegister`,
  fetchChangeProfile: `${NAME_SLICE}/fetchChangeProfile`,
  fetchLogout: `${NAME_SLICE}/fetchLogout`,
  fetchChangePassword: `${NAME_SLICE}/fetchChangePassword`,
  fetchUserOrderData: `${NAME_SLICE}/fetchUserOrderData`,
};
export const authSelector = (state: RootState): State => state.auth;
export const authActions = authSlice.actions;
export default authSlice.reducer;
