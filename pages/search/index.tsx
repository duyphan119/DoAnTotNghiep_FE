import { Container, Grid, Pagination } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { getAllProducts } from "../../apis/product";
import { ProductCard } from "../../components";
import { DefaultLayout } from "../../layouts";
import { MSG_SUCCESS } from "../../utils/constants";
import { Product, ResponseItems } from "../../utils/types";

type Props = {
  productData: ResponseItems<Product>;
};

const Page = ({ productData: propProductData }: Props) => {
  const router = useRouter();
  const { q } = router.query;
  console.log({ q });
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Kết quả tìm kiếm "{q}"</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="lg">
          <h1>Kết quả tìm kiếm "{q || ""}"</h1>
          <Grid container columnSpacing={2} rowSpacing={2}>
            {propProductData.items.map((product: Product) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
            {propProductData.count > 0 ? (
              <Grid item xs={12}>
                <Pagination
                  count={Math.ceil(propProductData.count / 12)}
                  sx={{ ul: { justifyContent: "center" } }}
                  variant="outlined"
                  shape="rounded"
                  showLastButton
                  showFirstButton
                  page={router.query.p ? +router.query.p : 1}
                />
              </Grid>
            ) : null}
          </Grid>
        </Container>
      </>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: any) {
  const { q } = context.query;
  const { message, data } = await getAllProducts({
    q,
    limit: 12,
    product_variants: true,
    images: true,
  });
  return {
    props: {
      productData: message === MSG_SUCCESS ? data : { items: [], count: 0 },
    },
  };
}

export default Page;
