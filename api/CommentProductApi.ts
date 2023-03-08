import { privateAxios, publicAxios } from "../config/configAxios";
import { CommentProductModel, ResponseGetAllModel } from "../models";
import { CreateCommentProductDTO } from "../types/dtos";
import { CommentProductParams } from "../types/params";
import { MSG_SUCCESS } from "../utils/constants";

class CommentProductApi {
  nameApi: string;
  constructor() {
    this.nameApi = "comment-product";
  }
  getListFromJson(json: any): CommentProductModel[] {
    return json.map((item: any) => new CommentProductModel(item));
  }

  getAll(
    params?: CommentProductParams
  ): Promise<ResponseGetAllModel<CommentProductModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);
        const { items, count } = data;
        const response =
          message === MSG_SUCCESS
            ? new ResponseGetAllModel<CommentProductModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<CommentProductModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateCommentProductDTO): Promise<CommentProductModel> {
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
            ? new CommentProductModel(data)
            : new CommentProductModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  update({
    id,
    dto,
  }: {
    id: number;
    dto: Partial<CreateCommentProductDTO>;
  }): Promise<CommentProductModel> {
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
            ? new CommentProductModel(data)
            : new CommentProductModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<CommentProductModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new CommentProductModel(data)
            : new CommentProductModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  softDeleteSingle(id: number): Promise<boolean> {
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

  softDeleteMultiple(ids: number[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().put(
          `${this.nameApi}/delete-multiple`,
          { ids }
        ) as Promise<{ message: string }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default CommentProductApi;
