import { privateAxios, publicAxios } from "@/config/configAxios";
import { ProductVariantModel, ResponseGetAllModel } from "@/models";
import { CreateProductVariantDTO } from "@/types/dtos";
import { ProductVariantParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

class ProductVariantApi {
  nameApi: string;
  constructor() {
    this.nameApi = "product-variant";
  }
  getListFromJson(json: any): ProductVariantModel[] {
    return json.map((item: any) => new ProductVariantModel(item));
  }

  getAll(
    params?: ProductVariantParams
  ): Promise<ResponseGetAllModel<ProductVariantModel>> {
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
            ? new ResponseGetAllModel<ProductVariantModel>(
                this.getListFromJson(items),
                count
              )
            : new ResponseGetAllModel<ProductVariantModel>();
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  createMany(dtos: CreateProductVariantDTO[]): Promise<ProductVariantModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          `${this.nameApi}/many`,
          {
            inputs: dtos,
          }
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const items = this.getListFromJson(data);
        resolve(message === MSG_SUCCESS ? items : []);
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
    dto: Partial<CreateProductVariantDTO>;
  }): Promise<ProductVariantModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/${id}`,
          dto
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const productVariant = this.getListFromJson([data])[0];
        resolve(
          message === MSG_SUCCESS ? productVariant : new ProductVariantModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  updateMany(inputs: ProductVariantModel[]): Promise<ProductVariantModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApi}/many`,
          { inputs }
        ) as Promise<{
          data: any;
          message: string;
        }>);
        const items = this.getListFromJson(data);
        resolve(message === MSG_SUCCESS ? items : []);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getById(id: number): Promise<ProductVariantModel> {
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
            ? new ProductVariantModel(data)
            : new ProductVariantModel()
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

export default ProductVariantApi;
