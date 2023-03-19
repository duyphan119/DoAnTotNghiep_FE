type NotificationJson = {
  id: number;
  content: string;
  type: "Đánh giá sản phẩm" | "Đặt hàng" | "Phản hồi đánh giá";
  userId: number;
};

export default NotificationJson;
