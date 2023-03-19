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
    q: string;
    min_price: number;
    max_price: number;
    v_ids: string;
  }>;

export default ProductParams;
