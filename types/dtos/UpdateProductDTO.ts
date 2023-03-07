import { ProductVariantModel } from "../../models";
import CreateProductDTO from "./CreateProductDTO";

type UpdateProductDTO = CreateProductDTO & { id: number } & Partial<{
    newProductVariants: ProductVariantModel[];
    deleteImages: number[];
    updateImages: Array<{
      id: number;
      variantValueId: number | null;
    }>;
    newImages: Array<{
      path: string;
      variantValueId: number | null;
    }>;
  }>;
export default UpdateProductDTO;
