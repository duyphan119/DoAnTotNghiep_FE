import DateJson from "./DateJson";
import NotificationTypeJson from "./NotificationTypeJson";
import UserJson from "./UserJson";

type NotificationJson = {
  id: number;
  content: string;
  notificationTypeId: number;
  userId: number;
  user?: UserJson;
  notificationType?: NotificationTypeJson;
  readAt: string;
  readBy: number;
} & DateJson;

export default NotificationJson;
