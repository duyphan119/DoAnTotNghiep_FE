import { createSlice } from "@reduxjs/toolkit";
import { CreateUserAddressDTO } from "../../apis/useraddress";
import { FetchState, UserAddress } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type State = {
  userAddresses: UserAddress[];
  current: UserAddress | null;
  openDialog: boolean;
  openModal: boolean;
} & FetchState;

export type FetchUpdateUserAddressPayload = {
  id: number;
} & Partial<CreateUserAddressDTO>;

const NAME_SLICE = "userAddress";

const INITIAL_STATE: State = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  userAddresses: [],
  current: null,
  openDialog: false,
  openModal: false,
};

const userAddressSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetUserAddresses: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    setUserAddresses: (state, action: ActionPayload<UserAddress[]>) => {
      state.userAddresses = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    fetchCreateUserAddress: (
      state,
      action: ActionPayload<CreateUserAddressDTO>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    createUserAddress: (state, action: ActionPayload<UserAddress>) => {
      state.userAddresses.unshift(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchUpdateUserAddress: (
      state,
      action: ActionPayload<FetchUpdateUserAddressPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    updateUserAddress: (
      state,
      action: ActionPayload<FetchUpdateUserAddressPayload>
    ) => {
      const data = action.payload;
      const index = state.userAddresses.findIndex(
        (item) => item.id === data.id
      );
      if (index !== -1)
        state.userAddresses[index] = { ...state.userAddresses[index], ...data };
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchDeleteUserAddress: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    deleteUserAddress: (state, action: ActionPayload<number>) => {
      const id = action.payload;
      state.userAddresses = state.userAddresses.filter(
        (item) => item.id !== id
      );

      state.isLoading = false;
      state.isSuccess = true;
    },
    showDialog: (state, action: ActionPayload<UserAddress>) => {
      state.current = action.payload;
      state.openDialog = true;
    },
    closeDialog: (state) => {
      state.current = null;
      state.openDialog = false;
    },
    showModal: (state, action: ActionPayload<UserAddress | null>) => {
      state.current = action.payload;
      state.openModal = true;
    },
    closeModal: (state) => {
      state.current = null;
      state.openModal = false;
    },
  },
});
export const userAddressReducers = {
  fetchGetUserAddresses: `${NAME_SLICE}/fetchGetUserAddresses`,
  fetchCreateUserAddress: `${NAME_SLICE}/fetchCreateUserAddress`,
  fetchUpdateUserAddress: `${NAME_SLICE}/fetchUpdateUserAddress`,
  fetchDeleteUserAddress: `${NAME_SLICE}/fetchDeleteUserAddress`,
};
export const userAddressSelector = (state: RootState): State =>
  state.userAddress;
export const userAddressActions = userAddressSlice.actions;
export default userAddressSlice.reducer;
