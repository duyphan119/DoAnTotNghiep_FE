import { privateAxios } from "@/config/configAxios";
import { ResponseGetAllModel, UserAddressModel } from "@/models";
import { CreateUserAddressDTO } from "@/types/dtos";
import { PaginationParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

class UserAddressApi {
  nameApi: string;

  constructor() {
    this.nameApi = "user-address";
  }

  getListFromJson(json: any): UserAddressModel[] {
    return json.map((item: any) => new UserAddressModel(item));
  }

  getAll(
    params: PaginationParams
  ): Promise<ResponseGetAllModel<UserAddressModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/user`,
          { params }
        ) as Promise<{ data: { items: any; count: number }; message: string }>);

        const { items, count } = data;

        resolve(
          message === MSG_SUCCESS
            ? new ResponseGetAllModel(this.getListFromJson(items), count)
            : new ResponseGetAllModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  create(dto: CreateUserAddressDTO): Promise<UserAddressModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().post(
          this.nameApi,
          dto
        ) as Promise<{ data: any; message: string }>);
        resolve(
          message === MSG_SUCCESS
            ? new UserAddressModel(data)
            : new UserAddressModel()
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
    dto: Partial<CreateUserAddressDTO>;
  }): Promise<UserAddressModel> {
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
            ? new UserAddressModel(data)
            : new UserAddressModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApi}/${id}`
        ) as Promise<{
          message: string;
        }>);
        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default UserAddressApi;
