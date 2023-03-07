import DateModel from "./DateModel";
import VariantModel from "./VariantModel";

class VariantValueModel extends DateModel {
  id: number;
  value: string;
  variantId: number;
  variant: VariantModel;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.value = obj?.value ?? "";
    this.variantId = obj?.variantId ?? 0;
    this.variant = new VariantModel(obj?.variant);
  }
}

export default VariantValueModel;
