import { NotificationTypeJson } from "@/types/json";
import DateModel from "./DateModel";

class NotificationTypeModel extends DateModel {
  id: number;
  name: string;
  icon: string;

  constructor(obj?: NotificationTypeJson) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.icon = obj?.icon ?? "";
  }
}

export default NotificationTypeModel;
