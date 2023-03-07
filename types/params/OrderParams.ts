import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type OrderParams = {
  start?: string;
  end?: string;
  address?: string;
  fullName?: string;
  phone?: string;
  items?: boolean;
} & PaginationParams &
  SortParams;

export default OrderParams;
