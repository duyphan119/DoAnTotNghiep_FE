import DateJson from "./DateJson";
import VariantJson from "./VariantJson";

type VariantValueJson = {
  id: number;
  value: string;
  variantId: number;
  variant: VariantJson;
  code: string;
  hasThumbnail: boolean;
} & DateJson;

export default VariantValueJson;
