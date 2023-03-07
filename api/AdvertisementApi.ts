import { CreateAdvertisementDTO } from "../apis/advertisement";
import { privateAxios, publicAxios } from "../config/configAxios";
import { AdvertisementModel } from "../models";
import ResponseGetAllModel from "../models/ResponseGetAllModel";
import UploadRepository from "../repositories/UploadRepository";
import { CreateGroupProductDTO } from "../types/dtos";
import { AdvertisementParams, GroupProductParams } from "../types/params";
import { MSG_SUCCESS } from "../utils/constants";

class AdvertisementApi {
  nameApi: string;
  constructor() {
    this.nameApi = "advertisement";
  }
  getListFromJson(json: any): AdvertisementModel[] {
    return json.map((item: any) => new AdvertisementModel(item));
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
          const { secure_url } = await new UploadRepository().uploadSingle(
            files[0]
          );
          path = secure_url;
        }
        const { data, message } = await (privateAxios().post(this.nameApi, {
          ...dto,
          path,
        }) as Promise<{
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
          const { secure_url } = await new UploadRepository().uploadSingle(
            files[0]
          );
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
}

export default AdvertisementApi;
