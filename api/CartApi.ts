import { privateAxios } from "../config/configAxios";
import { OrderItemModel, OrderModel } from "../models";
import { CreateCartItemDTO } from "../types/dtos";
import { MSG_SUCCESS } from "../utils/constants";

class CartApi {
  nameApi: string;
  constructor() {
    this.nameApi = "cart";
  }

  loginCreateCart(cart: OrderModel): Promise<OrderModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message, data } = await (privateAxios().post(
          `${this.nameApi}/login`,
          { cart }
        ) as Promise<{ message: string; data: any }>);

        resolve(
          message === MSG_SUCCESS && data
            ? new OrderModel(data)
            : new OrderModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getCart(): Promise<OrderModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message, data } = await (privateAxios().get(
          `${this.nameApi}/user`,
          { params: { items: true } }
        ) as Promise<{ message: string; data: any }>);

        resolve(
          message === MSG_SUCCESS && data
            ? new OrderModel(data)
            : new OrderModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  createCartItem(dto: CreateCartItemDTO): Promise<OrderItemModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message, data } = await (privateAxios().post(
          `${this.nameApi}`,
          dto
        ) as Promise<{ message: string; data: any }>);

        resolve(
          message === MSG_SUCCESS && data
            ? new OrderItemModel(data)
            : new OrderItemModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  updateCartItem({
    id,
    newQuantity,
  }: {
    id: number;
    newQuantity: number;
  }): Promise<OrderItemModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message, data } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          {
            newQuantity,
          }
        ) as Promise<{
          message: string;
          data: any;
        }>);

        resolve(
          message === MSG_SUCCESS && data
            ? new OrderItemModel(data)
            : new OrderItemModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  deleteCartItem(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/${id}`
        ) as Promise<{ message: string }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default CartApi;
