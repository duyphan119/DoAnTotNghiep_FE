import { NotificationJson } from "@/types/json";
import DateModel from "./DateModel";

class NotificationModel extends DateModel {
  id: number;
  content: string;
  type: "Đánh giá sản phẩm" | "Đặt hàng" | "Phản hồi đánh giá";
  userId: number;

  constructor(obj?: NotificationJson) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.content = obj?.content ?? "";
    this.type = obj?.type ?? "Đặt hàng";
    this.userId = obj?.userId ?? 0;
  }
}

export default NotificationModel;
