import { privateAxios, publicAxios } from "@/config/configAxios";
import { GroupProductModel, ResponseGetAllModel } from "@/models";
import { CreateGroupProductDTO } from "@/types/dtos";
import { GroupProductJson } from "@/types/json";
import { GroupProductParams } from "@/types/params";
import { EMPTY_ITEMS, MSG_SUCCESS } from "@/utils/constants";
import UploadApi from "./UploadApi";

class GroupProductApi {
  nameApi: string;
  constructor() {
    this.nameApi = "group-product";
  }
  getListFromJson(json: any): GroupProductModel[] {
    return json.map((item: any) => new GroupProductModel(item));
  }

  getAllJson(
    params?: GroupProductParams
  ): Promise<{ items: GroupProductJson[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: GroupProductJson[]; count: number };
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
    params?: GroupProductParams
  ): Promise<ResponseGetAllModel<GroupProductModel>> {
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
            ? new ResponseGetAllModel<GroupProductModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<GroupProductModel>();
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
    dto: CreateGroupProductDTO;
  }): Promise<GroupProductModel> {
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
        const groupProduct = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? groupProduct : new GroupProductModel()
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
    files,
  }: {
    id: number;
    files: FileList | null;
    dto: Partial<CreateGroupProductDTO>;
  }): Promise<GroupProductModel> {
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
        const groupProduct = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? groupProduct : new GroupProductModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<GroupProductModel> {
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
            ? new GroupProductModel(data)
            : new GroupProductModel()
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

export default GroupProductApi;
