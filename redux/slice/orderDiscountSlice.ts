import { createSlice } from "@reduxjs/toolkit";
import { OrderDiscountParams } from "../../types/params";
import { OrderDiscountModel, ResponseGetAllModel } from "../../models";
import { ActionPayload, RootState } from "@/redux/store";
import { CreateOrderDiscountDTO } from "../../types/dtos";

const NAME_SLICE = "orderDiscount";

type State = {
  orderDiscountData: ResponseGetAllModel<OrderDiscountModel>;
  relatedOrderDiscountData: ResponseGetAllModel<OrderDiscountModel>;
  current: OrderDiscountModel;
  isDeleted: boolean;
};

const INITIAL_STATE: State = {
  orderDiscountData: new ResponseGetAllModel(),
  relatedOrderDiscountData: new ResponseGetAllModel(),
  current: new OrderDiscountModel(),
  isDeleted: false,
};

export const orderDiscountSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<OrderDiscountParams>) => {},
    setOrderDiscountData: (
      state,
      action: ActionPayload<ResponseGetAllModel<OrderDiscountModel>>
    ) => {
      state.orderDiscountData = action.payload;
    },
    fetchCreate: (state, action: ActionPayload<CreateOrderDiscountDTO>) => {},
    fetchUpdate: (
      state,
      action: ActionPayload<{
        id: number;
        dto: Partial<CreateOrderDiscountDTO>;
      }>
    ) => {},
    fetchSoftDeleteSingle: (state, action: ActionPayload<number>) => {
      state.isDeleted = false;
    },
    fetchSoftDeleteMultiple: (state, action: ActionPayload<number[]>) => {
      state.isDeleted = false;
    },
    fetchGetById: (state, action: ActionPayload<number>) => {},
    deleted: (state) => {
      state.isDeleted = true;
    },
    setCurrent: (state, action: ActionPayload<OrderDiscountModel>) => {
      state.current = action.payload;
    },
  },
});
export const orderDiscountReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
  fetchCreate: `${NAME_SLICE}/fetchCreate`,
  fetchUpdate: `${NAME_SLICE}/fetchUpdate`,
  fetchSoftDeleteSingle: `${NAME_SLICE}/fetchSoftDeleteSingle`,
  fetchSoftDeleteMultiple: `${NAME_SLICE}/fetchSoftDeleteMultiple`,
  fetchGetById: `${NAME_SLICE}/fetchGetById`,
};
export const orderDiscountSelector = (state: RootState): State =>
  state.orderDiscount;
export const orderDiscountActions = orderDiscountSlice.actions;
export default orderDiscountSlice.reducer;
