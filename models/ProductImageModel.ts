import DateModel from "./DateModel";

class ProductImageModel extends DateModel {
  id: number;
  productId: number;
  variantValueId: number | null;
  path: string;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.productId = obj?.productId ?? 0;
    this.variantValueId = obj?.variantValueId ?? null;
    this.path = obj?.path ?? "";
  }
}

export default ProductImageModel;
