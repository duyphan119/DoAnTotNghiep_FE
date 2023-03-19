import DateJson from "./DateJson";
import ProductJson from "./ProductJson";
import VariantValueJson from "./VariantValueJson";

type ProductVariantJson = {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: ProductJson;
  name: string;
  variantValues: VariantValueJson[];
} & DateJson;

export default ProductVariantJson;
