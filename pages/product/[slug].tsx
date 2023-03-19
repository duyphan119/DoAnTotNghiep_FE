import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { ProductApi } from "@/api";
import { ProductCard, ProductInfo } from "@/components";
import { DefaultLayout } from "@/layouts";
import { ProductModel, ResponseGetAllModel } from "@/models";
import { productDetailActions } from "@/redux/slice/productDetailSlice";
import { useAppDispatch } from "@/redux/store";
import styles from "@/styles/_ProductDetail.module.scss";
import { ProductJson } from "@/types/json";

type Props = {
  productJson: ProductJson;
};

const RECOMMEND_LIMIT = 20;

const ProductDetail = ({ productJson }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const product = new ProductModel(productJson);
  const [recommendedProductData, setRecommendedProductData] = useState<
    ResponseGetAllModel<ProductModel>
  >(new ResponseGetAllModel());

  useEffect(() => {
    appDispatch(productDetailActions.setProduct(product));
  }, [productJson]);

  useEffect(() => {
    const recommendProducts = async () => {
      try {
        const pApi = new ProductApi();

        const res = await pApi.recommend({
          slug: `${router.query.slug}`,
          limit: RECOMMEND_LIMIT,
          sortBy: "star",
          sortType: "desc",
        });
        setRecommendedProductData(res);
      } catch (error) {}
    };

    recommendProducts();
  }, [router.query]);

  return product.id > 0 ? (
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
          {recommendedProductData.count > 0 ? (
            <Fragment>
              <h1 className={styles.h1}>Gợi ý cho bạn</h1>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {recommendedProductData.items.map((item) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      md={4}
                      lg={3}
                      key={item.id}
                      sx={{
                        flexBasis: {
                          lg: "20%",
                        },
                      }}
                    >
                      <ProductCard product={item} />
                    </Grid>
                  );
                })}
              </Grid>
            </Fragment>
          ) : null}
        </Container>
      </>
    </DefaultLayout>
  ) : (
    <Fragment></Fragment>
  );
};
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const pApi = new ProductApi();
  const productJson = await pApi.getBySlugJson(slug);
  if (productJson)
    return {
      props: { productJson },
    };
  return { notFound: true };
}

export default ProductDetail;
