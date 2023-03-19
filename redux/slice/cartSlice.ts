import { createSlice } from "@reduxjs/toolkit";
import { OrderItemModel, OrderModel } from "../../models";
import { CreateCartItemDTO } from "../../types/dtos";
import { ActionPayload, RootState } from "@/redux/store";

type State = {
  cart: OrderModel;
  isCheckoutSuccess: boolean;
};

const NAME_SLICE = "cart";

const INITIAL_STATE: State = {
  cart: new OrderModel(),
  isCheckoutSuccess: false,
};

const cartSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchCart: (state) => {},
    fetchAddToCart: (state, action: ActionPayload<CreateCartItemDTO>) => {},
    fetchUpdateCartItem: (
      state,
      action: ActionPayload<{ id: number; newQuantity: number }>
    ) => {},
    fetchDeleteCartItem: (state, action: ActionPayload<number>) => {},
    setCart: (state, action: ActionPayload<OrderModel>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: ActionPayload<OrderItemModel>) => {
      const orderItem = action.payload;
      const index = state.cart.items.findIndex(
        (item) => item.id === orderItem.id
      );
      if (state.cart.id === 0) state.cart.id = orderItem.orderId;
      if (index !== -1) {
        state.cart.items[index] = orderItem;
      } else {
        state.cart.items.unshift(orderItem);
      }
      state.cart = new OrderModel(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartItem: (
      state,
      action: ActionPayload<{ id: number; newQuantity: number }>
    ) => {
      const { id, newQuantity } = action.payload;
      const index = state.cart.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cart.items[index].quantity = newQuantity;
        state.cart = new OrderModel(state.cart);
      }
    },
    deleteCartItem: (state, action: ActionPayload<number>) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      state.cart = new OrderModel(state.cart);
    },
    getCart: (state) => {
      state.cart = new OrderModel(
        JSON.parse("" + localStorage.getItem("cart"))
      );
    },
  },
});

export const cartReducer = {
  fetchCart: `${NAME_SLICE}/fetchCart`,
  fetchAddToCart: `${NAME_SLICE}/fetchAddToCart`,
  fetchUpdateCartItem: `${NAME_SLICE}/fetchUpdateCartItem`,
  fetchDeleteCartItem: `${NAME_SLICE}/fetchDeleteCartItem`,
  fetchCheckout: `${NAME_SLICE}/fetchCheckout`,
};
export const cartSelector = (state: RootState): State => state.cart;
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
