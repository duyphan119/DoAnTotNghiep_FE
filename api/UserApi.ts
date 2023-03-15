import { privateAxios, publicAxios } from "@/config/configAxios";
import { ResponseGetAllModel, UserModel } from "@/models";
import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  LoginDTO,
  RegisterDTO,
} from "@/types/dtos";
import { UserParams } from "@/types/params";
import { MSG_SUCCESS } from "@/utils/constants";

class UserApi {
  nameApiAuth: string;
  nameApiUser: string;
  constructor() {
    this.nameApiAuth = "auth";
    this.nameApiUser = "user";
  }
  getListFromJson(json: any): UserModel[] {
    return json.map((item: any) => new UserModel(item));
  }

  login(dto: LoginDTO): Promise<{ user: UserModel; accessToken: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().post(
          `${this.nameApiAuth}/login`,
          dto
        ) as Promise<{
          data: { user: UserModel; accessToken: string };
          message: string;
        }>);

        if (message === MSG_SUCCESS) {
          resolve(data);
        }
      } catch (error) {
        console.log("UserApi.login error", error);
      }
      reject({ message: "Đăng nhập không thành công" });
    });
  }

  register(
    dto: RegisterDTO
  ): Promise<{ user: UserModel; accessToken: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().post(
          `${this.nameApiAuth}/register`,
          dto
        ) as Promise<{
          data: { user: UserModel; accessToken: string };
          message: string;
        }>);

        if (message === MSG_SUCCESS) {
          resolve(data);
        }
      } catch (error) {
        console.log("UserApi.register error", error);
      }
      reject({ message: "Đăng ký không thành công" });
    });
  }

  changePassword(dto: ChangePasswordDTO): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().patch(
          `${this.nameApiAuth}/change-password`,
          dto
        ) as Promise<{
          message: string;
        }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("UserApi.changePassword error", error);
      }
      resolve(false);
    });
  }

  logout(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = await (privateAxios().delete(
          `${this.nameApiAuth}/logout`
        ) as Promise<{
          message: string;
        }>);

        resolve(message === MSG_SUCCESS);
      } catch (error) {
        console.log("UserApi.logout error", error);
      }
      resolve(false);
    });
  }

  getProfile(): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApiAuth}/profile`
        ) as Promise<{
          data: UserModel;
          message: string;
        }>);
        if (message === MSG_SUCCESS) resolve(data);
      } catch (error) {
        console.log("UserApi.getProfile error", error);
      }
      resolve(new UserModel());
    });
  }

  changeProfile(dto: ChangeProfileDTO): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().patch(
          `${this.nameApiAuth}/change-profile`,
          dto
        ) as Promise<{
          data: UserModel;
          message: string;
        }>);
        if (message === MSG_SUCCESS) resolve(data);
      } catch (error) {
        console.log("UserApi.changeProfile error", error);
      }
      reject({ message: "Đổi thông tim thất bại" });
    });
  }

  refreshToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (publicAxios().patch(
          `${this.nameApiAuth}/refresh`
        ) as Promise<{ data: { accessToken: string }; message: string }>);
        resolve(message === MSG_SUCCESS ? data.accessToken : "");
      } catch (error) {
        console.log("UserApi.refreshToken error", error);
        resolve("");
      }
    });
  }

  getOrders() {}

  getAll(params: UserParams): Promise<ResponseGetAllModel<UserModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(this.nameApiUser, {
          params,
        }) as Promise<{
          data: { items: any; count: number };
          message: string;
        }>);
        resolve(
          message === MSG_SUCCESS
            ? new ResponseGetAllModel(
                this.getListFromJson(data.items),
                data.count
              )
            : new ResponseGetAllModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  softDeleteSingle() {}

  softDeleteMultiple() {}
}

export default UserApi;
