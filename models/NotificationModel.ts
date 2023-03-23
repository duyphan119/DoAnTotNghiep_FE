import { NotificationJson } from "@/types/json";
import DateModel from "./DateModel";
import NotificationTypeModel from "./NotificationTypeModel";
import UserModel from "./UserModel";

class NotificationModel extends DateModel {
  id: number;
  content: string;
  userId: number;
  notificationTypeId: number;
  user: UserModel;
  notificationType: NotificationTypeModel;
  readAt: string;
  readBy: number;

  constructor(obj?: NotificationJson) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.content = obj?.content ?? "";
    this.notificationTypeId = obj?.notificationTypeId ?? 0;
    this.userId = obj?.userId ?? 0;
    this.user = new UserModel(obj?.user);
    this.notificationType = new NotificationTypeModel(obj?.notificationType);
    this.readAt = obj?.readAt ?? "";
    this.readBy = obj?.readBy ?? 0;
  }
}

export default NotificationModel;
