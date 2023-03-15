import { privateAxios, publicAxios } from "@/config/configAxios";
import { VariantModel, ResponseGetAllModel } from "@/models";
import { VariantParams } from "@/types/params";
import { CreateVariantDTO } from "@/types/dtos";
import { MSG_SUCCESS } from "@/utils/constants";

class VariantApi {
  nameApi: string;
  constructor() {
    this.nameApi = "variant";
  }
  getListFromJson(json: any): VariantModel[] {
    return json.map((item: any) => new VariantModel(item));
  }

  getAll(params?: VariantParams): Promise<ResponseGetAllModel<VariantModel>> {
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
            ? new ResponseGetAllModel<VariantModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<VariantModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateVariantDTO): Promise<VariantModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const Variant = this.getListFromJson([data])[0];
        resolve(message === MSG_SUCCESS ? Variant : new VariantModel());
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
    dto: Partial<CreateVariantDTO>;
  }): Promise<VariantModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const Variant = this.getListFromJson([data])[0];
        resolve(message === MSG_SUCCESS ? Variant : new VariantModel());
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<VariantModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().get(
          `${this.nameApi}/${id}`
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS ? new VariantModel(data) : new VariantModel()
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

export default VariantApi;
