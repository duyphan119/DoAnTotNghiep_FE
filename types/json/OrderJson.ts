import OrderDiscountJson from "./OrderDiscountJson";
import OrderItemJson from "./OrderItemJson";
import UserJson from "./UserJson";

type OrderJson = {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  status: "Đang xử lý" | "Đang giao hàng" | "Đã hủy" | "Đã giao" | "Giỏ hàng";
  shippingPrice: number;
  paymentMethod:
    | "Thanh toán khi nhận hàng (COD)"
    | "Thanh toán qua MOMO (MOMO)";
  note: string;
  point: number;
  isOrdered: boolean;
  allowCannceled: boolean;
  isPaid: boolean;
  orderDate: string;
  userId: number;
  discountId: number;
  user: UserJson;
  items: OrderItemJson[];
  discount: OrderDiscountJson;
};

export default OrderJson;
