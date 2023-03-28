import { privateAxios, publicAxios } from "@/config/configAxios";
import { VariantValueModel, ResponseGetAllModel } from "@/models";
import { VariantValueParams } from "@/types/params";
import { CreateVariantValueDTO } from "@/types/dtos";
import { MSG_SUCCESS } from "@/utils/constants";

class VariantValueApi {
  nameApi: string;
  constructor() {
    this.nameApi = "variant-value";
  }
  getListFromJson(json: any): VariantValueModel[] {
    return json.map((item: any) => new VariantValueModel(item));
  }

  getAll(
    params?: VariantValueParams
  ): Promise<ResponseGetAllModel<VariantValueModel>> {
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
            ? new ResponseGetAllModel<VariantValueModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<VariantValueModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
      }
    });
  }

  create(dto: CreateVariantValueDTO): Promise<VariantValueModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const VariantValue = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? VariantValue : new VariantValueModel()
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  update({
    id,
    dto,
  }: {
    id: number;
    dto: Partial<CreateVariantValueDTO>;
  }): Promise<VariantValueModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const VariantValue = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? VariantValue : new VariantValueModel()
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  getById(id: number): Promise<VariantValueModel> {
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
            ? new VariantValueModel(data)
            : new VariantValueModel()
        );
      } catch (error) {
        console.log(error);
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
      }
    });
  }
}

export default VariantValueApi;
