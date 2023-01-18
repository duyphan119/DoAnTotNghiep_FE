import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type Props = Partial<{
  children: ReactNode;
}>;

type BreadcrumbLink = {
  label: string;
  href: string;
};

type Breadcrumb = {
  links: BreadcrumbLink[];
  current: string;
};
const ProductsLayoutContext = createContext({} as any);

const ProductsLayoutWrapper = ({ children }: Props) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  return (
    <ProductsLayoutContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </ProductsLayoutContext.Provider>
  );
};
export function useProductsLayoutContext() {
  return useContext(ProductsLayoutContext);
}
export default ProductsLayoutWrapper;
