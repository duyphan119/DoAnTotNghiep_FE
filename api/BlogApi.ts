import { privateAxios, publicAxios } from "@/config/configAxios";
import { BlogModel, ResponseGetAllModel } from "@/models";
import { CreateBlogDTO } from "@/types/dtos";
import { BlogJson } from "@/types/json";
import { BlogParams } from "@/types/params";
import { EMPTY_ITEMS, MSG_SUCCESS } from "@/utils/constants";
import UploadApi from "./UploadApi";

class BlogApi {
  nameApi: string;
  constructor() {
    this.nameApi = "blog";
  }
  getListFromJson(json: BlogJson[]): BlogModel[] {
    return json.map((item: BlogJson) => new BlogModel(item));
  }

  getAllJson(
    params?: BlogParams
  ): Promise<{ items: BlogJson[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: BlogJson[]; count: number };
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

  create({
    files,
    dto,
  }: {
    files: FileList | null;
    dto: CreateBlogDTO;
  }): Promise<BlogModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let thumbnail = dto?.thumbnail ?? "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          thumbnail = secure_url;
        }
        const { data, message } = await (privateAxios().post(this.nameApi, {
          ...dto,
          thumbnail,
        }) as Promise<{
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
    files,
  }: {
    id: number;
    dto: Partial<CreateBlogDTO>;
    files: FileList | null;
  }): Promise<BlogModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let thumbnail = dto.thumbnail || "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          thumbnail = secure_url;
        }
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          {
            ...dto,
            ...(thumbnail !== "" ? { thumbnail } : {}),
          }
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
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/many`,
          {
            params: { listId: JSON.stringify(ids) },
          }
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
