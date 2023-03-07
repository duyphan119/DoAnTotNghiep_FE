import { VariantValueModel } from "../../models";

type CreateProductVariantDTO = {
  name: string;
  price: number;
  inventory: number;
  variantValues: VariantValueModel[];
  productId: number;
};

export default CreateProductVariantDTO;
