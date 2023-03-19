import DateJson from "./DateJson";
import GroupProductJson from "./GroupProductJson";
import ProductImageJson from "./ProductImageJson";
import ProductVariantJson from "./ProductVariantJson";

type ProductJson = {
  id: number;
  name: string;
  slug: string;
  inventory: number;
  price: number;
  thumbnail: string;
  description: string;
  detail: string;
  star: number;
  groupProductId: number;
  groupProduct: GroupProductJson;
  productVariants: ProductVariantJson[];
  images: ProductImageJson[];
  minPrice: number;
  maxPrice: number;
  metaKeywords: string;
  metaDescription: string;
} & DateJson;

export default ProductJson;
