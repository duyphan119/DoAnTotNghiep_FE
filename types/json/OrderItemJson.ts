import OrderJson from "./OrderJson";
import ProductVariantJson from "./ProductVariantJson";

type OrderItemJson = {
  id: number;
  orderId: number;
  productVariantId: number;
  quantity: number;
  price: number;
  productVariant: ProductVariantJson;
  order: OrderJson;
};

export default OrderItemJson;
