import { createSlice } from "@reduxjs/toolkit";
import { OrderModel, ResponseGetAllModel } from "../../models";
import { CheckoutDTO } from "../../types/dtos";
import { OrderParams } from "../../types/params";
import { ActionPayload, RootState } from "../store";

type State = {
  orderData: ResponseGetAllModel<OrderModel>;
  isCheckoutSuccess: boolean;
  current: OrderModel;
};

const NAME_SLICE = "order";

const INITIAL_STATE: State = {
  orderData: new ResponseGetAllModel(),
  isCheckoutSuccess: false,
  current: new OrderModel(),
};

const orderSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<OrderParams>) => {},
    fetchUpdateStatus: (state, action: ActionPayload<number>) => {},
    fetchGetById: (state, action: ActionPayload<number>) => {},
    fetchCheckout: (state, action: ActionPayload<CheckoutDTO>) => {},
    checkout: (state) => {
      state.isCheckoutSuccess = true;
    },
    setOrderData: (
      state,
      action: ActionPayload<ResponseGetAllModel<OrderModel>>
    ) => {
      state.orderData = action.payload;
    },
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {},
    setCurrent: (state, action: ActionPayload<OrderModel>) => {
      state.current = action.payload;
    },
  },
});

export const orderReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
  fetchCheckout: `${NAME_SLICE}/fetchCheckout`,
  fetchUpdateStatus: `${NAME_SLICE}/fetchUpdateStatus`,
};
export const orderSelector = (state: RootState): State => state.order;
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
