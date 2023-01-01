import { privateAxios, publicAxios } from "../config/configAxios";
import { GroupProduct, QueryParams } from "../utils/types";

export type GroupProductQueryParams = {
  slug?: string;
  name?: string;
} & QueryParams;

export type CreateGroupProductDTO = {
  name: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
};

export const getAllGroupProducts = (
  params?: GroupProductQueryParams
): Promise<any> => publicAxios().get("group-product", { params });

export const getGroupProductById = (id: number): Promise<any> =>
  publicAxios().get("group-product/" + id);

export const createGroupProduct = (dto: CreateGroupProductDTO): Promise<any> =>
  privateAxios().post("group-product", dto);

export const updateGroupProduct = (
  id: number,
  dto: Partial<GroupProduct>
): Promise<any> => privateAxios().patch("group-product/" + id, dto);

export const softDeleteGroupProduct = (id: number): Promise<any> =>
  privateAxios().delete("group-product/soft/" + id);

export const restoreGroupProduct = (id: number): Promise<any> =>
  privateAxios().delete("group-product/restore/" + id);

export const deleteGroupProduct = (id: number): Promise<any> =>
  privateAxios().delete("group-product/" + id);
