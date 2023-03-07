import { privateAxios, publicAxios } from "../config/configAxios";
import { BlogModel } from "../models";
import ResponseGetAllModel from "../models/ResponseGetAllModel";
import { BlogParams } from "../types/params";
import { CreateBlogDTO, CreateVariantDTO } from "../types/dtos";
import { MSG_SUCCESS } from "../utils/constants";

class BlogApi {
  nameApi: string;
  constructor() {
    this.nameApi = "blog";
  }
  getListFromJson(json: any): BlogModel[] {
    return json.map((item: any) => new BlogModel(item));
  }

  getAll(params?: BlogParams): Promise<ResponseGetAllModel<BlogModel>> {
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
            ? new ResponseGetAllModel<BlogModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<BlogModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateBlogDTO): Promise<BlogModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const blog = this.getListFromJson([data])[0];
        resolve(message === MSG_SUCCESS ? blog : new BlogModel());
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
    dto: Partial<CreateBlogDTO>;
  }): Promise<BlogModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const blog = this.getListFromJson([data])[0];
        resolve(message === MSG_SUCCESS ? blog : new BlogModel());
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<BlogModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS ? new BlogModel(data) : new BlogModel()
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

export default BlogApi;
