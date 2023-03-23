import DateJson from "./DateJson";

type NotificationTypeJson = {
  id: number;
  name: string;
  icon: string;
} & DateJson;

export default NotificationTypeJson;
