import { AdvertisementApi, BlogApi, GroupProductApi, ProductApi } from "@/api";
import { groupProductSelector } from "@/redux/slice/groupProductSlice";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { ImageFill, ProductCard } from "@/components";
import { DefaultLayout } from "@/layouts";
import {
  AdvertisementModel,
  BlogModel,
  GroupProductHeaderModel,
  GroupProductModel,
  ProductModel,
  ResponseGetAllModel,
} from "@/models";
import styles from "@/styles/_Home.module.scss";
import {
  AdvertisementJson,
  BlogJson,
  GroupProductJson,
  ProductJson,
} from "@/types/json";
import { EMPTY_ITEMS } from "@/utils/constants";
import helper from "@/utils/helpers";
import { publicRoutes } from "@/utils/routes";

type GroupProductsProps = {
  items: GroupProductModel[];
};

const GroupProducts = ({ items }: GroupProductsProps) => {
  const theme = useTheme();
  const { groupProductHeaders } = useSelector(groupProductSelector);
  const [header, setHeader] = useState<GroupProductHeaderModel>();

  const headers = useMemo(() => {
    return groupProductHeaders
      .filter((item) => item.items.length > 0)
      .map((item) => ({
        ...item,
        items: item.items.filter((subItem) => subItem.thumbnail !== ""),
      }));
  }, [groupProductHeaders]);

  useEffect(() => {
    if (headers.length > 0) {
      setHeader(headers[0]);
    }
  }, [headers]);

  return (
    <Container maxWidth="lg">
      <Box
        className="flex-center"
        sx={{
          gap: "24px",
          mb: 2,
        }}
      >
        {headers.map((item) => {
          const isActive = header && item.name === header.name;
          return (
            <Box
              sx={{
                borderBottom: `2px solid ${isActive ? "var(--blue)" : "#000"}`,
                color: `${isActive ? "var(--blue)" : "#000"}`,
                fontWeight: `${isActive ? "500" : "normal"}`,
                minWidth: "15%",
                textAlign: "center",
                py: 1,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              key={item.name}
              onClick={() => setHeader(item)}
            >
              {item.name}
            </Box>
          );
        })}
      </Box>
      {header ? (
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {header.items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Link href={publicRoutes.products(item.slug)}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        transition: "all linear 0.1s ",
                        span: {
                          color: "var(--blue)",
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "20px",
                        background: "#00aaff85",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    >
                      <Image
                        src={item.thumbnail}
                        alt=""
                        height={64}
                        width={56}
                        priority={true}
                      />
                    </div>
                    <span style={{ textTransform: "uppercase" }}>
                      {item.name}
                    </span>
                  </Box>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}

      {/* <Grid container>
        {items.map((gp) => {
          return (
            <Grid item xs={6} md={4} lg={3} xl={2} key={gp.id}>
              <Link
                as="image"
                href={publicRoutes.products(gp.slug)}
                className={styles.groupProductLink}
              >
                {gp.getFullName()}
              </Link>
            </Grid>
          );
        })}
      </Grid> */}
    </Container>
  );
};

type ProductsProps = {
  products: ProductModel[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={3} rowSpacing={3}>
        {products.map((product) => {
          return (
            <Grid item xs={6} sm={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
        {products.length > 0 ? (
          <Grid item xs={12} className={styles.viewAllWrapper}>
            <Link href={publicRoutes.products()} className={styles.viewAll}>
              Xem tất cả sản phẩm
            </Link>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};

type BannersProps = Partial<{
  banners: AdvertisementModel[];
}>;

const Banners = ({ banners }: BannersProps) => {
  return banners ? (
    <Box
      sx={{
        ".swiper": {
          width: "100vw",
        },
      }}
    >
      <Swiper slidesPerView={1}>
        {banners.map((adv: AdvertisementModel) => {
          return (
            <SwiperSlide key={adv.id}>
              <Link href={adv.href} rel="preloaded" as="image">
                <ImageFill src={adv.path} alt="banner" height="560px" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  ) : (
    <></>
  );
};

type BlogProps = {
  blogs: BlogModel[];
};

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={2} rowSpacing={2}>
        {blogs.map((blog) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className={styles.blogThumbnail}
                as="image"
              >
                <ImageFill src={blog.thumbnail} alt="" height="280px" />
              </Link>
              <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
                {blog.title}
              </Link>
              <div className={styles.blogCreatedAt}>
                {helper.formatDateTime(blog.createdAt)}
              </div>
            </Grid>
          );
        })}
        {blogs.length > 0 ? (
          <Grid item xs={12} className={styles.viewAllWrapper}>
            <Link href={publicRoutes.blogs} className={styles.viewAll}>
              Xem tất cả bài viết
            </Link>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};

type Props = {
  productData: { items: ProductJson[]; count: number };
  blogData: { items: BlogJson[]; count: number };
  advertisements: AdvertisementJson[];
  groupProducts: GroupProductJson[];
};
export default function Home({
  productData,
  blogData,
  advertisements,
  groupProducts,
}: Props) {
  let _productData = new ResponseGetAllModel(
    productData.items.map((item: ProductJson) => new ProductModel(item)),
    productData.count
  );
  let _blogData = new ResponseGetAllModel(
    blogData.items.map((item: BlogJson) => new BlogModel(item)),
    blogData.count
  );
  let _advertisements = advertisements.map(
    (item: AdvertisementJson) => new AdvertisementModel(item)
  );
  let _groupProducts = groupProducts.map(
    (item: GroupProductJson) => new GroupProductModel(item)
  );

  return (
    <DefaultLayout contentStyle={{ marginBlock: 0, marginBottom: 16 }}>
      <>
        <Head>
          <title>Trang chủ</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Banners banners={_advertisements} />
          <h1 className={styles.h1}>Danh mục nổi bật</h1>
          <GroupProducts items={_groupProducts} />
          <h1 className={styles.h1}>Sản phẩm mới</h1>
          <Products products={_productData.items} />
          <h1 className={styles.h1}>Bài viết</h1>
          <Blogs blogs={_blogData.items} />
        </main>
      </>
    </DefaultLayout>
  );
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let productData: { items: ProductJson[]; count: number } = EMPTY_ITEMS;
  let blogData: { items: BlogJson[]; count: number } = EMPTY_ITEMS;
  let advData: { items: AdvertisementJson[]; count: number } = EMPTY_ITEMS;
  let groupProducts: GroupProductJson[] = [];
  const gpApi = new GroupProductApi();
  const pApi = new ProductApi();
  const bApi = new BlogApi();
  const advApi = new AdvertisementApi();
  try {
    const [res1, res2, res3, res4] = await Promise.allSettled([
      pApi.getAllJson({
        limit: 24,
        product_variants: true,
        images: true,
      }),
      bApi.getAllJson({
        limit: 3,
      }),
      advApi.getAllJson({ page: "Trang chủ", sortType: "asc" }),
      gpApi.getAllJson({ limit: 12 }),
    ]);

    if (res1.status === "fulfilled") {
      productData = res1.value;
    }
    if (res2.status === "fulfilled") {
      blogData = res2.value;
    }
    if (res3.status === "fulfilled") {
      advData = res3.value;
    }
    if (res4.status === "fulfilled") {
      groupProducts = res4.value.items;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      productData,
      blogData,
      advertisements: advData.items,
      groupProducts: groupProducts,
    },
  };
};
