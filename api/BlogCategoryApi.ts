import { privateAxios, publicAxios } from "@/config/configAxios";
import { BlogCategoryModel, ResponseGetAllModel } from "@/models";
import { CreateBlogCategoryDTO } from "@/types/dtos";
import { BlogCategoryJson } from "@/types/json";
import { BlogCategoryParams } from "@/types/params";
import { EMPTY_ITEMS, MSG_SUCCESS } from "@/utils/constants";

class BlogCategoryApi {
  nameApi: string;
  constructor() {
    this.nameApi = "blog-category";
  }
  getListFromJson(json: any): BlogCategoryModel[] {
    return json.map((item: any) => new BlogCategoryModel(item));
  }

  getAllJson(
    params?: BlogCategoryParams
  ): Promise<{ items: BlogCategoryJson[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: BlogCategoryJson[]; count: number };
          message: string;
        }>);
        const response = message === MSG_SUCCESS ? data : EMPTY_ITEMS;
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getAll(
    params?: BlogCategoryParams
  ): Promise<ResponseGetAllModel<BlogCategoryModel>> {
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
            ? new ResponseGetAllModel<BlogCategoryModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<BlogCategoryModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateBlogCategoryDTO): Promise<BlogCategoryModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{
          data: BlogCategoryJson;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new BlogCategoryModel(data)
            : new BlogCategoryModel()
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
    dto: Partial<CreateBlogCategoryDTO>;
  }): Promise<BlogCategoryModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: BlogCategoryJson;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new BlogCategoryModel(data)
            : new BlogCategoryModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<BlogCategoryModel> {
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
            ? new BlogCategoryModel(data)
            : new BlogCategoryModel()
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
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/many`,
          { params: { listId: JSON.stringify(ids) } }
        ) as Promise<{ message: string }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default BlogCategoryApi;
