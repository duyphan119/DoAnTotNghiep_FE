import { privateAxios } from "@/config/configAxios";
import { OrderDiscountModel, ResponseGetAllModel } from "@/models";
import { CreateOrderDiscountDTO } from "@/types/dtos";
import { OrderDiscountParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";
import { ICrudApi } from "./interfaces";

class OrderDiscountApi
  implements
    ICrudApi<
      ResponseGetAllModel<OrderDiscountModel>,
      OrderDiscountModel,
      OrderDiscountParams,
      CreateOrderDiscountDTO
    >
{
  nameApi: string;
  constructor() {
    this.nameApi = "order-discount";
  }
  getListFromJson(json: any): OrderDiscountModel[] {
    return json.map((item: any) => new OrderDiscountModel(item));
  }
  getAll(
    params: OrderDiscountParams
  ): Promise<ResponseGetAllModel<OrderDiscountModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);

        const { items, count } = data;

        resolve(
          message === MSG_SUCCESS
            ? new ResponseGetAllModel(this.getListFromJson(items), count)
            : new ResponseGetAllModel()
        );
      } catch (error) {
        console.log("OrderDiscountApi.getAll error", error);
      }
    });
  }
  getById(id: number): Promise<OrderDiscountModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{ data: any; message: string }>);

        resolve(
          message === MSG_SUCCESS
            ? new OrderDiscountModel(data)
            : new OrderDiscountModel()
        );
      } catch (error) {
        console.log("OrderDiscountApi.getById error", error);
      }
    });
  }
  createOne(dto: CreateOrderDiscountDTO): Promise<OrderDiscountModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new OrderDiscountModel(data)
            : new OrderDiscountModel()
        );
      } catch (error) {
        console.log("OrderDiscountApi.createOne error", error);
      }
    });
  }
  createMany(listDto: CreateOrderDiscountDTO[]): Promise<OrderDiscountModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(this.nameApi, {
          inputs: listDto,
        }) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(message === MSG_SUCCESS ? this.getListFromJson(data) : []);
      } catch (error) {
        console.log("OrderDiscountApi.createMany error", error);
      }
    });
  }
  updateOne({
    id,
    dto,
  }: {
    id: number;
    dto: CreateOrderDiscountDTO;
  }): Promise<OrderDiscountModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new OrderDiscountModel(data)
            : new OrderDiscountModel()
        );
      } catch (error) {
        console.log("OrderDiscountApi.updateOne error", error);
      }
    });
  }
  updateMany(
    listInput: { id: number; dto: CreateOrderDiscountDTO }[]
  ): Promise<OrderDiscountModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(this.nameApi, {
          inputs: listInput,
        }) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(message === MSG_SUCCESS ? this.getListFromJson(data) : []);
      } catch (error) {
        console.log("OrderDiscountApi.updateMany error", error);
      }
    });
  }
  deleteOne(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/force/${id}`
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.deleteOne error", error);
      }
    });
  }
  deleteMany(listId: number[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/force/many`,
          {
            params: { listId: JSON.stringify(listId) },
          }
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.deleteMany error", error);
      }
    });
  }
  softDeleteOne(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/${id}`
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.softDeleteOne error", error);
      }
    });
  }
  softDeleteMany(listId: number[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/many`,
          {
            params: { listId: JSON.stringify(listId) },
          }
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.softDeleteMany error", error);
      }
    });
  }
  restoreOne(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/restore/${id}`
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.restoreOne error", error);
      }
    });
  }
  restoreMany(listId: number[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/restore/many`,
          {
            params: { listId: JSON.stringify(listId) },
          }
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("OrderDiscountApi.restoreMany error", error);
      }
    });
  }

  check({
    code,
    total,
  }: {
    code: string;
    total: number;
  }): Promise<OrderDiscountModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/check`,
          {
            params: { code, total },
          }
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new OrderDiscountModel(data)
            : new OrderDiscountModel()
        );
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default OrderDiscountApi;
