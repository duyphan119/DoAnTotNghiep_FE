import { Container } from "@mui/material";
import Head from "next/head";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommentProductsClient } from "../../apis/commentproduct";
import { getAllProducts } from "../../apis/product";
import { ProductInfo } from "../../components";
import { DefaultLayout } from "../../layouts";
import { ProductModel } from "../../models";
import { authSelector } from "../../redux/slice/authSlice";
import { productDetailActions } from "../../redux/slice/productDetailSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "../../styles/_ProductDetail.module.scss";
import { MSG_SUCCESS } from "../../utils/constants";
import { CommentProduct, Product, ResponseItems } from "../../utils/types";

type CommentProductData = ResponseItems<CommentProduct> & {
  userComment: CommentProduct | null;
};

type Props = {
  product: ProductModel;
};

const ProductDetailContext = createContext<any>({});

export function useProductDetailContext() {
  return useContext(ProductDetailContext);
}

const ProductDetail = ({ product }: Props) => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(productDetailActions.setProduct(new ProductModel(product)));
  }, [product]);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{product.name}</title>
          <meta
            name="keywords"
            content={product.metaKeywords || product.name}
          />
          <meta
            name="description"
            content={product.metaDescription || product.name}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="lg">
          <div className={styles.body}>
            <ProductInfo />
          </div>
        </Container>
      </>
    </DefaultLayout>
  );
};
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  let product;
  const { message: msg1, data: data1 } = await getAllProducts({
    slug,
    product_variants: true,
    images: true,
  });
  if (msg1 === MSG_SUCCESS) {
    product = JSON.parse(JSON.stringify(data1.items[0]));
  }

  return product
    ? {
        props: { product },
      }
    : {
        notFound: true,
      };
}

export default ProductDetail;
