import { VariantValueJson } from "@/types/json";
import DateModel from "./DateModel";
import VariantModel from "./VariantModel";

class VariantValueModel extends DateModel {
  id: number;
  value: string;
  variantId: number;
  variant: VariantModel;
  code: string;

  constructor(obj?: Partial<VariantValueJson>) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.value = obj?.value ?? "";
    this.variantId = obj?.variantId ?? 0;
    this.variant = new VariantModel(obj?.variant);
    this.code = obj?.code ?? "";
  }
}

export default VariantValueModel;
