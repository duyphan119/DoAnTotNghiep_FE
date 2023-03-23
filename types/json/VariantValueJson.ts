import DateJson from "./DateJson";
import VariantJson from "./VariantJson";

type VariantValueJson = {
  id: number;
  value: string;
  variantId: number;
  variant: VariantJson;
  code: string;
} & DateJson;

export default VariantValueJson;
