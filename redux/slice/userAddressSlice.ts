import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetAllModel, UserAddressModel } from "../../models";
import { CreateUserAddressDTO } from "../../types/dtos";
import { PaginationParams } from "../../types/params";
import { FetchState, UserAddress } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

type State = {
  userAddressData: ResponseGetAllModel<UserAddressModel>;
  current: UserAddressModel;
  openModal: boolean;
};

export type fetchUpdatePayload = {
  id: number;
} & Partial<CreateUserAddressDTO>;

const NAME_SLICE = "userAddress";

const INITIAL_STATE: State = {
  userAddressData: new ResponseGetAllModel(),
  current: new UserAddressModel(),
  openModal: false,
};

const userAddressSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<PaginationParams>) => {},
    setUserAddressData: (
      state,
      action: ActionPayload<ResponseGetAllModel<UserAddressModel>>
    ) => {
      state.userAddressData = action.payload;
    },
    fetchCreate: (state, action: ActionPayload<CreateUserAddressDTO>) => {},
    createUserAddress: (state, action: ActionPayload<UserAddressModel>) => {
      state.userAddressData.items.unshift(action.payload);
      state.userAddressData = new ResponseGetAllModel(
        state.userAddressData.items,
        state.userAddressData.count + 1
      );
    },
    fetchUpdate: (
      state,
      action: ActionPayload<{ id: number; dto: CreateUserAddressDTO }>
    ) => {},
    updateUserAddress: (state, action: ActionPayload<UserAddressModel>) => {
      const data = action.payload;
      const index = state.userAddressData.items.findIndex(
        (item) => item.id === data.id
      );
      if (index !== -1) state.userAddressData.items[index] = data;
      state.userAddressData = new ResponseGetAllModel(
        state.userAddressData.items,
        state.userAddressData.count
      );
    },
    fetchDelete: (state, action: ActionPayload<number>) => {},
    deleteUserAddress: (state, action: ActionPayload<number>) => {
      const id = action.payload;
      state.userAddressData = new ResponseGetAllModel(
        state.userAddressData.items.filter((item) => item.id !== id),
        state.userAddressData.count - 1
      );
    },

    showModal: (state, action: ActionPayload<UserAddressModel>) => {
      state.current = action.payload;
      state.openModal = true;
    },
    closeModal: (state) => {
      state.current = new UserAddressModel();
      state.openModal = false;
    },
  },
});
export const userAddressReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchDelete: `${NAME_SLICE}/fetchDelete`,
};
export const userAddressSelector = (state: RootState): State =>
  state.userAddress;
export const userAddressActions = userAddressSlice.actions;
export default userAddressSlice.reducer;
