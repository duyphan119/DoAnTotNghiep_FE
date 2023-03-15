import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type OrderDiscountParams = Partial<{
  minValue: number;
  value: number;
  start: string;
  end: string;
  code: string;
}> &
  SortParams &
  PaginationParams;

export default OrderDiscountParams;
