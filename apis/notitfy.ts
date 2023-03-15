import { privateAxios } from "@/config/configAxios";
import { PaginationParams } from "../utils/types";

export type NotificationQueryParams = Partial<{
  unread: boolean;
}> &
  PaginationParams;

export type NotificationDTO = {
  message: string;
  href: string;
  type: string;
};

export const getAllNotifications = (
  params?: NotificationQueryParams
): Promise<any> => privateAxios().get("notification", { params });

export const createNotification = (dto: NotificationDTO): Promise<any> =>
  privateAxios().post("notification", dto);

export const deleteNotification = (id: number): Promise<any> =>
  privateAxios().delete(`notification/${id}`);
