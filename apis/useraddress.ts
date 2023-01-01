import { privateAxios } from "../config/configAxios";
import { QueryParams, UserAddress } from "../utils/types";
export type UserAddressQueryParams = QueryParams &
  Partial<{
    province: string;
    district: string;
    ward: string;
    address: string;
  }>;

export type CreateUserAddressDTO = {
  province: string;
  district: string;
  ward: string;
  address: string;
};

export const getMyUserAddresses = (
  params?: UserAddressQueryParams
): Promise<any> => privateAxios().get("user-address/user", { params });

export const createUserAddress = (dto: CreateUserAddressDTO): Promise<any> =>
  privateAxios().post("user-address", dto);

export const updateUserAddress = (
  id: number,
  dto: Partial<UserAddress>
): Promise<any> => privateAxios().patch("user-address/" + id, dto);

export const deleteUserAddress = (id: number): Promise<any> =>
  privateAxios().delete("user-address/" + id);
