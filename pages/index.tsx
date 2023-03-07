import { Box, Container, Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { AdvertisementApi, BlogApi, GroupProductApi, ProductApi } from "../api";

import { getAllAdvertisements } from "../apis/advertisement";
import { getAllBlogsPublic } from "../apis/blog";
import { getAllGroupProducts } from "../apis/groupProduct";
import { getAllProducts } from "../apis/product";
import { ImageFill, ProductCard } from "../components";
import { DefaultLayout } from "../layouts";
import {
  AdvertisementModel,
  BlogModel,
  GroupProductModel,
  ProductModel,
} from "../models";
import ResponseGetAllModel from "../models/ResponseGetAllModel";
import styles from "../styles/_Home.module.scss";
import { EMPTY_ITEMS } from "../utils/constants";
import helper from "../utils/helpers";
import { publicRoutes } from "../utils/routes";
import { Advertisement } from "../utils/types";

type GroupProductsProps = {
  items: GroupProductModel[];
};

const GroupProducts = ({ items }: GroupProductsProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container>
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
      </Grid>
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
  banners: Advertisement[];
}>;

const Banners = ({ banners }: BannersProps) => {
  return banners ? (
    <Swiper slidesPerView={1}>
      {banners.map((adv: Advertisement) => {
        return (
          <SwiperSlide key={adv.id}>
            <Link href={adv.href} rel="preloaded" as="image">
              <Box
                sx={{ width: "100vw", position: "relative", height: "560px" }}
              >
                <ImageFill src={adv.path} alt="banner" />
                {/* <Image
                  src={adv.path}
                  alt="banner"
                  priority={true}
                  fill={true}
                  sizes="(min-width: 0) 100vw"
                /> */}
              </Box>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
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
                {/* <Image
                  fill={true}
                  sizes="(max-width: 768px) 1vw"
                  src={blog.thumbnail}
                  alt=""
                  priority={true}
                /> */}
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
  productData: ResponseGetAllModel<ProductModel>;
  blogData: ResponseGetAllModel<BlogModel>;
  advertisements: Advertisement[];
  groupProducts: GroupProductModel[];
};
export default function Home({
  productData,
  blogData,
  advertisements,
  groupProducts,
}: Props) {
  let _productData = new ResponseGetAllModel(
    productData.items.map((item: any) => new ProductModel(item)),
    productData.count
  );
  let _blogData = new ResponseGetAllModel(
    blogData.items.map((item: any) => new BlogModel(item)),
    blogData.count
  );
  let _advertisements = advertisements.map(
    (item: any) => new AdvertisementModel(item)
  );
  let _groupProducts = groupProducts.map(
    (item: any) => new GroupProductModel(item)
  );

  return (
    <DefaultLayout>
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
  let productData = new ResponseGetAllModel();
  let blogData = new ResponseGetAllModel();
  let advData = new ResponseGetAllModel();
  let groupProducts: GroupProductModel[] = [];
  const gpApi = new GroupProductApi();
  const pApi = new ProductApi();
  const bApi = new BlogApi();
  const advApi = new AdvertisementApi();
  try {
    const [res1, res2, res3, res4] = await Promise.allSettled([
      pApi.getAll({
        limit: 24,
        product_variants: true,
        images: true,
      }),
      bApi.getAll({
        limit: 3,
      }),
      advApi.getAll({ page: "Trang chủ", sortType: "asc" }),
      gpApi.getAll({ limit: 12 }),
    ]);

    if (res1.status === "fulfilled") {
      productData = JSON.parse(JSON.stringify(res1.value));
    }
    if (res2.status === "fulfilled") {
      blogData = JSON.parse(JSON.stringify(res2.value));
    }
    if (res3.status === "fulfilled") {
      advData = JSON.parse(JSON.stringify(res3.value));
    }
    if (res4.status === "fulfilled") {
      groupProducts = JSON.parse(JSON.stringify(res4.value.items));
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
