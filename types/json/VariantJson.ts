import DateJson from "./DateJson";
import VariantValueJson from "./VariantValueJson";

type VariantJson = {
  id: number;
  name: string;
  variantValues: VariantValueJson[];
} & DateJson;

export default VariantJson;
