import DateModel from "./DateModel";
import ProductModel from "./ProductModel";
import VariantValueModel from "./VariantValueModel";

class ProductVariantModel extends DateModel {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: ProductModel;
  name: string;
  variantValues: VariantValueModel[];

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.inventory = obj?.inventory ?? 0;
    this.price = obj?.price ?? 0;
    this.productId = obj?.productId ?? 0;
    this.product = new ProductModel(obj?.product);
    this.name = obj?.name ?? "";
    this.variantValues =
      obj?.variantValues?.map((item: any) => new VariantValueModel(item)) ?? [];
  }
}

export default ProductVariantModel;
