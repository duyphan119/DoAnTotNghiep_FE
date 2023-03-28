import { privateAxios } from "@/config/configAxios";
import { OrderModel, ResponseGetAllModel } from "@/models";
import { CheckoutDTO } from "@/types/dtos";
import { OrderParams, PaginationParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

class OrderApi {
  nameApi: string;
  constructor() {
    this.nameApi = "order";
  }

  getListFromJson(json: any): OrderModel[] {
    return json.map((item: any) => new OrderModel(item));
  }

  getAll(params: OrderParams): Promise<ResponseGetAllModel<OrderModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);
        const { items, count } = data;
        const response =
          message === MSG_SUCCESS
            ? new ResponseGetAllModel<OrderModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<OrderModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
      }
    });
  }

  getById(id: number): Promise<OrderModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const response =
          message === MSG_SUCCESS ? new OrderModel(data) : new OrderModel();
        resolve(response);
      } catch (error) {
        console.log(error);
      }
    });
  }

  checkout(dto: CheckoutDTO): Promise<OrderModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/checkout`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS ? new OrderModel(data) : new OrderModel()
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  getUserOrderData(
    params: PaginationParams
  ): Promise<ResponseGetAllModel<OrderModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/user`,
          {
            params,
          }
        ) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);
        const { items, count } = data;
        const response =
          message === MSG_SUCCESS
            ? new ResponseGetAllModel<OrderModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<OrderModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
      }
    });
  }

  updateStatus(id: number): Promise<OrderModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}/status`
        ) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS ? new OrderModel(data) : new OrderModel()
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  cancel(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/user/${id}`
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default OrderApi;
