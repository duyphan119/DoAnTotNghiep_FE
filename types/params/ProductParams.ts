import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type ProductParams = SortParams &
  PaginationParams &
  Partial<{
    slug: string;
    name: string;
    group_product_slug: string;
    product_variants: boolean;
    images: boolean;
    group_product: boolean;
  }>;

export default ProductParams;
