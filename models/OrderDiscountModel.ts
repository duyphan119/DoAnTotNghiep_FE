import DateModel from "./DateModel";

class OrderDiscountModel extends DateModel {
  id: number;
  code: string;
  start: string;
  end: string;
  minPrice: number;
  value: number;
  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.code = obj?.code ?? "";
    this.start = obj?.start ?? "";
    this.end = obj?.end ?? "";
    this.minPrice = obj?.minPrice ?? 0;
    this.value = obj?.value ?? 0;
  }
}

export default OrderDiscountModel;
