import { createSlice } from "@reduxjs/toolkit";
import { CheckoutDTO } from "../../apis/order";
import { CartItem, FetchState, Order, OrderItem } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "cart";

type State = {
  cart: {
    items: OrderItem[] | CartItem[];
  } & Partial<Order>;
  count: number;
  total: number;
  isPaymentSuccess: boolean;
} & FetchState;

export type FetchAddToCartPayload = {
  item: CartItem;
  price: number;
};

export type FetchUpdateCartItemPayload = {
  id: number;
  newQuantity: number;
};

const INITIAL_STATE: State = {
  cart: { items: [] },
  isLoading: false,
  isError: false,
  count: 0,
  total: 0,
  isSuccess: false,
  isPaymentSuccess: false,
};

export const cartSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchCart: (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    setCart: (state, action) => {
      let cart = action.payload;
      state.cart = cart;
      state.count = cart
        ? cart.items.reduce(
            (p: number, c: CartItem | OrderItem) => p + c.quantity,
            0
          )
        : 0;
      let total = 0;
      state.cart.items.forEach((item: OrderItem | CartItem) => {
        total +=
          (item.productVariant ? item.productVariant.price : 0) * item.quantity;
      });
      state.total = total;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchAddToCart: (state, action: ActionPayload<FetchAddToCartPayload>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    addToCart: (state, action: ActionPayload<OrderItem>) => {
      let item = action.payload;
      let index = state.cart.items.findIndex(
        (i: OrderItem) => i.productVariantId === item.productVariantId
      );

      let { order, ...orderItem } = item;

      if (index !== -1) {
        state.cart.items[index].quantity += orderItem.quantity;
      } else {
        state.cart.items.push(orderItem);
      }
      state.count += orderItem.quantity;
      let total = 0;
      state.cart.items.forEach((item: OrderItem | CartItem) => {
        total +=
          (item.productVariant ? item.productVariant.price : 0) * item.quantity;
      });
      state.total = total;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchUpdateCartItem: (
      state,
      action: ActionPayload<FetchUpdateCartItemPayload>
    ) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    updateCartItem: (
      state,
      action: ActionPayload<FetchUpdateCartItemPayload>
    ) => {
      let { id, newQuantity } = action.payload;
      let index = state.cart.items.findIndex((i: OrderItem) => i.id === id);

      if (index !== -1) {
        if (newQuantity <= 0) {
          state.count -= state.cart.items[index].quantity;
          state.cart.items.splice(index, 1);
        } else {
          state.count -= state.cart.items[index].quantity;
          state.count += newQuantity;
          state.cart.items[index].quantity = newQuantity;
        }
      }
      let total = 0;
      state.cart.items.forEach((item: OrderItem | CartItem) => {
        total +=
          (item.productVariant ? item.productVariant.price : 0) * item.quantity;
      });
      state.total = total;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchDeleteCartItem: (state, action: ActionPayload<number>) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
    },
    deleteCartItem: (state, action: ActionPayload<number>) => {
      let id = action.payload;
      let index = state.cart.items.findIndex((i: OrderItem) => i.id === id);
      if (index !== -1) {
        state.count -= state.cart.items[index].quantity;
        state.cart.items.splice(index, 1);
      }
      let total = 0;
      state.cart.items.forEach((item: OrderItem | CartItem) => {
        total +=
          (item.productVariant ? item.productVariant.price : 0) * item.quantity;
      });
      state.total = total;
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchCheckout: (state, action: ActionPayload<CheckoutDTO>) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    },
    paymentSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isPaymentSuccess = true;
      state.cart = { items: [] };
    },
  },
});
export const cartReducers = {
  fetchCart: `${NAME_SLICE}/fetchCart`,
  fetchAddToCart: `${NAME_SLICE}/fetchAddToCart`,
  fetchUpdateCartItem: `${NAME_SLICE}/fetchUpdateCartItem`,
  fetchDeleteCartItem: `${NAME_SLICE}/fetchDeleteCartItem`,
  fetchCheckout: `${NAME_SLICE}/fetchCheckout`,
};
export const cartSelector = (state: RootState) => state.cart;
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
