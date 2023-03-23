import { privateAxios } from "@/config/configAxios";
import { NotificationModel, ResponseGetAllModel } from "@/models";
import { CreateNotificationDTO } from "@/types/dtos";
import { NotificationJson } from "@/types/json";
import { NotificationParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

class NotificationApi {
  nameApi: string;

  constructor() {
    this.nameApi = "notification";
  }

  getListFromJson(json: NotificationJson[]): NotificationModel[] {
    return json.map((item: NotificationJson) => new NotificationModel(item));
  }

  getAll(params?: NotificationParams): Promise<{
    data: ResponseGetAllModel<NotificationModel>;
    countUnRead: number;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          message,
          data: { items, count, countUnRead },
        } = await (privateAxios().get(this.nameApi, {
          params,
        }) as Promise<{
          data: { items: any; count: number; countUnRead?: number };
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? {
                data: new ResponseGetAllModel<NotificationModel>(
                  this.getListFromJson(items),
                  count
                ),
                countUnRead: countUnRead || 0,
              }
            : { data: new ResponseGetAllModel(), countUnRead: 0 }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateNotificationDTO): Promise<NotificationModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{ data: any; message: string }>);

        resolve(
          message === MSG_SUCCESS
            ? new NotificationModel(data)
            : new NotificationModel()
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
    dto: Partial<CreateNotificationDTO>;
  }): Promise<NotificationModel> {
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
            ? new NotificationModel(data)
            : new NotificationModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  read(id: number): Promise<NotificationModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/read/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new NotificationModel(data)
            : new NotificationModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<NotificationModel> {
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
            ? new NotificationModel(data)
            : new NotificationModel()
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

export default NotificationApi;
