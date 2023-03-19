import { ProductModel } from "@/models";
import { createContext, ReactNode, useContext } from "react";

const ProductInfoContext = createContext({
  product: new ProductModel(),
});

export const useProductInfoContext = () => {
  return useContext(ProductInfoContext);
};

export default ProductInfoContext;
