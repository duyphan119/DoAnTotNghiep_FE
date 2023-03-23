import { privateAxios } from "@/config/configAxios";
import { NotificationTypeModel, ResponseGetAllModel } from "@/models";
import { CreateNotificationTypeDTO } from "@/types/dtos";
import { NotificationTypeJson } from "@/types/json";
import { NotificationTypeParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";
import UploadApi from "./UploadApi";

class NotificationTypeApi {
  nameApi: string;

  constructor() {
    this.nameApi = "notification-type";
  }

  getListFromJson(json: NotificationTypeJson[]): NotificationTypeModel[] {
    return json.map(
      (item: NotificationTypeJson) => new NotificationTypeModel(item)
    );
  }

  getAll(
    params?: NotificationTypeParams
  ): Promise<ResponseGetAllModel<NotificationTypeModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          message,
          data: { items, count },
        } = await (privateAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new ResponseGetAllModel<NotificationTypeModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel()
        );
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
    dto: CreateNotificationTypeDTO;
  }): Promise<NotificationTypeModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let icon = dto?.icon ?? "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          icon = secure_url;
        }

        const { data, message } = await (privateAxios().post(this.nameApi, {
          ...dto,
          icon,
        }) as Promise<{ data: any; message: string }>);

        resolve(
          message === MSG_SUCCESS
            ? new NotificationTypeModel(data)
            : new NotificationTypeModel()
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
    dto: Partial<CreateNotificationTypeDTO>;
  }): Promise<NotificationTypeModel> {
    return new Promise(async (resolve, reject) => {
      try {
        let icon = dto.icon || "";
        if (files) {
          const { secure_url } = await new UploadApi().uploadSingle(files[0]);
          icon = secure_url;
        }
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          {
            ...dto,
            ...(icon !== "" ? { icon } : {}),
          }
        ) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new NotificationTypeModel(data)
            : new NotificationTypeModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<NotificationTypeModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new NotificationTypeModel(data)
            : new NotificationTypeModel()
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

export default NotificationTypeApi;
