import DateModel from "./DateModel";
import VariantValueModel from "./VariantValueModel";

class VariantModel extends DateModel {
  id: number;
  name: string;
  variantValues: VariantValueModel[];

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.variantValues =
      obj?.variantValues?.map((item: any) => new VariantValueModel(item)) ?? [];
  }
}

export default VariantModel;
