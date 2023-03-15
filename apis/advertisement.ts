import { privateAxios, publicAxios } from "@/config/configAxios";
import { Advertisement, QueryParams } from "../utils/types";

export type AdvertisementQueryParams = QueryParams &
  Partial<{
    title: string;
    page: string;
  }>;

export type CreateAdvertisementDTO = {
  title: string;
  href: string;
  path: string;
  page: string;
};

export const getAllAdvertisements = (
  params?: AdvertisementQueryParams
): Promise<any> => publicAxios().get("advertisement", { params });

export const getAdvertisementById = (id: number): Promise<any> =>
  publicAxios().get("advertisement/" + id);

export const createAdvertisement = (
  dto: CreateAdvertisementDTO
): Promise<any> => privateAxios().post("advertisement", dto);

export const updateAdvertisement = (
  id: number,
  dto: Partial<Advertisement>
): Promise<any> => privateAxios().patch("advertisement/" + id, dto);

export const softDeleteAdvertisement = (id: number): Promise<any> =>
  privateAxios().delete("advertisement/soft/" + id);

export const restoreAdvertisement = (id: number): Promise<any> =>
  privateAxios().delete("advertisement/restore/" + id);

export const deleteAdvertisement = (id: number): Promise<any> =>
  privateAxios().delete("advertisement/" + id);
