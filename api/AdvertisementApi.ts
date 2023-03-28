import { privateAxios, publicAxios } from "@/config/configAxios";
import { AdvertisementModel, ResponseGetAllModel } from "@/models";

import { CreateAdvertisementDTO } from "@/types/dtos";
import { AdvertisementJson } from "@/types/json";
import { AdvertisementParams } from "@/types/params";
import { EMPTY_ITEMS, MSG_SUCCESS } from "@/utils/constants";
import UploadApi from "./UploadApi";

class AdvertisementApi {
  nameApi: string;
  constructor() {
    this.nameApi = "advertisement";
  }

  getListFromJson(json: any): AdvertisementModel[] {
    return json.map((item: any) => new AdvertisementModel(item));
  }

  getAllJson(
    params?: AdvertisementParams
  ): Promise<{ items: AdvertisementJson[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: AdvertisementJson[]; count: number };
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
    params?: AdvertisementParams
  ): Promise<ResponseGetAllModel<AdvertisementModel>> {
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
            ? new ResponseGetAllModel<AdvertisementModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<AdvertisementModel>();
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
    dto: CreateAdvertisementDTO;
  }): Promise<AdvertisementModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let path = dto?.path ?? "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          path = secure_url;
        }
        const { data, message } = await (privateAxios().post(this.nameApi, {
          ...dto,
          path,
        }) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new AdvertisementModel(data)
            : new AdvertisementModel()
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
    dto: Partial<CreateAdvertisementDTO>;
  }): Promise<AdvertisementModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let path = dto.path || "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          path = secure_url;
        }
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          {
            ...dto,
            ...(path !== "" ? { path } : {}),
          }
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const groupProduct = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? groupProduct : new AdvertisementModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<AdvertisementModel> {
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
            ? new AdvertisementModel(data)
            : new AdvertisementModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  deleteSingle(id: number): Promise<boolean> {
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

  deleteMultiple(listId: number[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/many`,
          { params: { listId: JSON.stringify(listId) } }
        ) as Promise<{ message: string }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default AdvertisementApi;
