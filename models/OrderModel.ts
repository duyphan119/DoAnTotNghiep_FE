import AddressModel from "./AddressModel";
import OrderDiscountModel from "./OrderDiscountModel";
import OrderItemModel from "./OrderItemModel";
import UserModel from "./UserModel";

class OrderModel extends AddressModel {
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
  user: UserModel;
  items: OrderItemModel[];
  discount: OrderDiscountModel;
  code: string;
  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.fullName = obj?.fullName ?? "";
    this.phone = obj?.phone ?? "";
    this.province = obj?.province ?? "";
    this.district = obj?.district ?? "";
    this.ward = obj?.ward ?? "";
    this.address = obj?.address ?? "";
    this.status = obj?.status ?? "Giỏ hàng";
    this.shippingPrice = obj?.shippingPrice ?? 0;
    this.paymentMethod = obj?.paymentMethod ?? "COD";
    this.note = obj?.note ?? "";
    this.point = obj?.point ?? 0;
    this.isOrdered = obj?.isOrdered ?? false;
    this.allowCannceled = obj?.allowCannceled ?? false;
    this.isPaid = obj?.isPaid ?? false;
    this.orderDate = obj?.orderDate ?? new Date().toISOString();
    this.userId = obj?.userId ?? 0;
    this.discountId = obj?.discountId ?? 0;
    this.user = new UserModel(obj?.user);
    this.items = obj?.items?.map((item: any) => new OrderItemModel(item)) ?? [];
    this.discount = new OrderDiscountModel(obj?.discount);
    this.code = obj?.code ?? "";
  }

  getTotalPrice() {
    const total = this.items.reduce(
      (preValue, current) => preValue + current.price * current.quantity,
      0
    );
    return total - this.discount.value - this.point * 1000;
  }

  getCount() {
    const count = this.items.reduce(
      (preValue, current) => preValue + current.quantity,
      0
    );
    return count;
  }
}

export default OrderModel;
