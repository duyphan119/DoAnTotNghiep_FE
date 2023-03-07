import DateModel from "./DateModel";
import OrderModel from "./OrderModel";
import ProductVariantModel from "./ProductVariantModel";

class OrderItemModel extends DateModel {
  id: number;
  orderId: number;
  productVariantId: number;
  quantity: number;
  price: number;
  productVariant: ProductVariantModel;
  order: OrderModel;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.orderId = obj?.orderId ?? 0;
    this.productVariantId = obj?.productVariantId ?? 0;
    this.quantity = obj?.quantity ?? 0;
    this.price = obj?.price ?? 0;
    this.productVariant = new ProductVariantModel(obj?.productVariant);
    this.order = new OrderModel(obj?.order);
  }

  getThumbnail() {
    let pv = this.productVariant;
    let p = this.productVariant?.product;
    if (pv) {
      let p = pv.product;
      if (p) {
        let imgs = p.images;
        let vvs = pv.variantValues;
        if (imgs && vvs) {
          let img = imgs.find(
            (pvi) => vvs.findIndex((vv) => vv.id === pvi.variantValueId) !== -1
          );
          if (img) {
            return img.path;
          }
        }
      }
    }
    return p ? p.thumbnail : "";
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}

export default OrderItemModel;
