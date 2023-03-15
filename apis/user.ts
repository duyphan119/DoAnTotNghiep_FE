import { serverSideAxios } from "@/config/configAxios";
import { QueryParams } from "../utils/types";

type UserQueryParams = Partial<{
  email: string;
  q: string;
  phone: string;
  fullName: string;
}> &
  QueryParams;

export const getAllUsers = (
  accessToken?: string,
  params?: UserQueryParams
): Promise<any> => serverSideAxios(accessToken).get("user", { params });
