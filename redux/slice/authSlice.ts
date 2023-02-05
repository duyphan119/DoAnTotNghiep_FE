import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
import {
  ChangePassword,
  ChangeProfile,
  LoginDTO,
  RegisterDTO,
} from "../../apis/auth";
import { OrderQueryParams } from "../../apis/order";
import { COOKIE_ACCESSTOKEN_NAME } from "../../utils/constants";
import { FetchState, Order, ResponseItems, User } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type State = {
  profile: User | null;
  accessToken: string;
  openModalAuth: boolean;
  orderData: ResponseItems<Order>;
} & FetchState;

type LoginResponse = {
  user: User;
  accessToken: string;
};

const NAME_SLICE = "auth";

const INITIAL_STATE: State = {
  profile: null,
  accessToken: "",
  isError: false,
  isLoading: false,
  openModalAuth: false,
  isSuccess: false,
  orderData: { items: [], count: 0 },
};

const authSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchProfile: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    setProfile: (state, action: ActionPayload<User | null>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    showModalAuth: (state) => {
      state.openModalAuth = true;
    },
    hideModalAuth: (state) => {
      state.openModalAuth = false;
    },
    fetchLogin: (state, action: ActionPayload<LoginDTO>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    login: (state, action: ActionPayload<LoginResponse>) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.profile = user;
      state.isLoading = false;
      state.openModalAuth = false;
      setCookie(COOKIE_ACCESSTOKEN_NAME, accessToken);
      state.isSuccess = true;
    },
    fetchRegister: (state, action: ActionPayload<RegisterDTO>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchChangeProfile: (state, action: ActionPayload<ChangeProfile>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    changeProfile: (state, action: ActionPayload<ChangeProfile>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
        state.isLoading = false;
        state.isSuccess = true;
      }
    },
    fetchLogout: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    logout: (state) => {
      state.profile = null;
      state.accessToken = "";
      deleteCookie(COOKIE_ACCESSTOKEN_NAME);
      state.isSuccess = true;
      state.isLoading = false;
    },
    fetchChangePassword: (state, action: ActionPayload<ChangePassword>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchMyOrderData: (state, action: ActionPayload<OrderQueryParams>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    setMyOrderData: (state, action: ActionPayload<ResponseItems<Order>>) => {
      state.orderData = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});
export const authReducers = {
  fetchProfile: `${NAME_SLICE}/fetchProfile`,
  fetchLogin: `${NAME_SLICE}/fetchLogin`,
  fetchRegister: `${NAME_SLICE}/fetchRegister`,
  fetchChangeProfile: `${NAME_SLICE}/fetchChangeProfile`,
  fetchLogout: `${NAME_SLICE}/fetchLogout`,
  fetchChangePassword: `${NAME_SLICE}/fetchChangePassword`,
  fetchMyOrderData: `${NAME_SLICE}/fetchMyOrderData`,
};
export const authSelector = (state: RootState): State => state.auth;
export const authActions = authSlice.actions;
export default authSlice.reducer;
