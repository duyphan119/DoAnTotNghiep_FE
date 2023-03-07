type CreateProductDTO = {
  name: string;
  slug?: string;
  groupProductId: number;
  thumbnail?: string;
  description?: string;
  detail?: string;
  metaKeywords?: string;
  metaDescription?: string;
  price: number;
  inventory: number;
  productVariants: Array<{
    name: string;
    inventory: number;
    price: number;
  }>;
  images: Array<{
    path: string;
    variantValueId: number | null;
  }>;
};
export default CreateProductDTO;
