import { privateAxios } from "@/config/configAxios";
import { RepCommentProductModel, ResponseGetAllModel } from "@/models";
import { CreateRepCommentProductDTO } from "@/types/dtos";
import { RepCommentProductParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";
import { ICrudApi } from "./interfaces";

class RepCommentProductApi
  implements
    ICrudApi<
      ResponseGetAllModel<RepCommentProductModel>,
      RepCommentProductModel,
      RepCommentProductParams,
      CreateRepCommentProductDTO
    >
{
  nameApi: string;

  constructor() {
    this.nameApi = "rep-comment-product";
  }
  getListFromJson(json: any): RepCommentProductModel[] {
    return json.map((item: any) => new RepCommentProductModel(item));
  }
  getAll(
    params: RepCommentProductParams
  ): Promise<ResponseGetAllModel<RepCommentProductModel>> {
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
        console.log("RepCommentProductApi.getAll error", error);
        reject(error);
      }
    });
  }
  getById(id: number): Promise<RepCommentProductModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{ data: any; message: string }>);

        resolve(
          message === MSG_SUCCESS
            ? new RepCommentProductModel(data)
            : new RepCommentProductModel()
        );
      } catch (error) {
        console.log("RepCommentProductApi.getById error", error);
        reject(error);
      }
    });
  }
  createOne(dto: CreateRepCommentProductDTO): Promise<RepCommentProductModel> {
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
            ? new RepCommentProductModel(data)
            : new RepCommentProductModel()
        );
      } catch (error) {
        console.log("RepCommentProductApi.createOne error", error);
        reject(error);
      }
    });
  }
  createMany(
    listDto: CreateRepCommentProductDTO[]
  ): Promise<RepCommentProductModel[]> {
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
        console.log("RepCommentProductApi.createMany error", error);
        reject(error);
      }
    });
  }
  updateOne({
    id,
    dto,
  }: {
    id: number;
    dto: CreateRepCommentProductDTO;
  }): Promise<RepCommentProductModel> {
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
            ? new RepCommentProductModel(data)
            : new RepCommentProductModel()
        );
      } catch (error) {
        console.log("RepCommentProductApi.updateOne error", error);
        reject(error);
      }
    });
  }
  updateMany(
    listInput: { id: number; dto: CreateRepCommentProductDTO }[]
  ): Promise<RepCommentProductModel[]> {
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
        console.log("RepCommentProductApi.updateMany error", error);
        reject(error);
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
        console.log("RepCommentProductApi.deleteOne error", error);
        reject(error);
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
        console.log("RepCommentProductApi.deleteMany error", error);
        reject(error);
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
        console.log("RepCommentProductApi.softDeleteOne error", error);
        reject(error);
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
        console.log("RepCommentProductApi.softDeleteMany error", error);
        reject(error);
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
        console.log("RepCommentProductApi.restoreOne error", error);
        reject(error);
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
        console.log("RepCommentProductApi.restoreMany error", error);
        reject(error);
      }
    });
  }
}

export default RepCommentProductApi;
