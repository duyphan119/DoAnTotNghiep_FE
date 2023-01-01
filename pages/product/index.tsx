import { Grid, Pagination, Breadcrumbs } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getAllProducts } from "../../apis/product";
import { ProductCard } from "../../components";
import { ProductsLayout } from "../../layouts";
import { CODE_OK, MSG_SUCCESS } from "../../utils/constants";
import { Filter, Product, ResponseItems } from "../../utils/types";
import Link from "next/link";

type Props = {
  productData: ResponseItems<Product>;
  onFilter?: any;
};
const LIMIT = 24;
const AllProducts = (props: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const [filter, setFilter] = React.useState<Filter>({
    ...router.query,
    p: p ? +p : 1,
  });

  const handleChange = (p: number) => {
    setFilter((prev) => ({ ...prev, p }));
  };

  const handleFilter = (f: Filter) => {
    console.log("HandleFILTER:::::::;", f);
    setFilter({ ...f, p: f.p && f.p > 1 ? 1 : f.p || 1 });
  };

  React.useEffect(() => {
    const paramsObj: any = {};
    Object.keys(filter).forEach((key: string) => {
      if (key !== "group_product_slug")
        paramsObj[key] =
          router.query[key] && filter[key as keyof Filter] === router.query[key]
            ? router.query[key]
            : filter[key as keyof Filter];
    });

    if (paramsObj.p && paramsObj.p <= 1) {
      delete paramsObj.p;
    }

    const searchParams: string = new URLSearchParams(paramsObj).toString();
    if (Object.keys(filter).length > 0) {
      if (filter.group_product_slug)
        if (Object.keys(paramsObj).length > 0)
          router.push(
            `${window.location.origin}/product/group-product/${filter.group_product_slug}?${searchParams}`
          );
        else
          router.push(
            `${window.location.origin}/product/group-product/${filter.group_product_slug}`
          );
      else {
        if (Object.keys(paramsObj).length > 0)
          router.push(`${window.location.origin}/product?${searchParams}`);
        else router.push(`${window.location.origin}/product`);
      }
    } else {
      router.push(`${window.location.origin}/product`);
    }
  }, [filter]);
  return (
    <>
      <ProductsLayout
        onFilter={handleFilter}
        totalProducts={props.productData.count}
        query={router.query}
        breadcrumbs={{
          links: [
            {
              href: "/",
              label: "Trang chủ",
            },
          ],
          current: "Tất cả sản phẩm",
        }}
      >
        <>
          <Head>
            <title>Tất cả sản phẩm</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Grid container columnSpacing={2} rowSpacing={2}>
            {props.productData.items.map((product: Product) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(props.productData.count / LIMIT)}
                sx={{ ul: { justifyContent: "center" } }}
                variant="outlined"
                shape="rounded"
                showLastButton
                showFirstButton
                page={filter.p || 1}
                onChange={(e, page) => handleChange(page)}
              />
            </Grid>
          </Grid>
        </>
      </ProductsLayout>
    </>
  );
};
export async function getServerSideProps(context: any) {
  const {
    group_product_slug,
    p,
    sortBy,
    sortType,
    v_ids,
    min_price,
    max_price,
  } = context.query;
  const { message, data } = await getAllProducts({
    limit: LIMIT,
    product_variants: true,
    ...(p ? { p } : {}),
    ...(group_product_slug ? { group_product_slug } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(sortType ? { sortType } : {}),
    ...(v_ids ? { v_ids } : {}),
    ...(min_price ? { min_price } : {}),
    ...(max_price ? { max_price } : {}),
  });
  return message === MSG_SUCCESS
    ? {
        props: { productData: data },
      }
    : {
        notFound: true,
      };
}
export default AllProducts;
