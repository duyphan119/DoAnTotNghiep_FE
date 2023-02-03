import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
import { ChangeProfile, LoginDTO, RegisterDTO } from "../../apis/auth";
import { COOKIE_ACCESSTOKEN_NAME } from "../../utils/constants";
import { FetchState, User } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type State = {
  profile: User | null;
  accessToken: string;
  openModalAuth: boolean;
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
    },
  },
});
export const authReducers = {
  fetchProfile: `${NAME_SLICE}/fetchProfile`,
  fetchLogin: `${NAME_SLICE}/fetchLogin`,
  fetchRegister: `${NAME_SLICE}/fetchRegister`,
  fetchChangeProfile: `${NAME_SLICE}/fetchChangeProfile`,
  fetchLogout: `${NAME_SLICE}/fetchLogout`,
};
export const authSelector = (state: RootState): State => state.auth;
export const authActions = authSlice.actions;
export default authSlice.reducer;
