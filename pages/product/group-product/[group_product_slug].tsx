import { GroupProductApi, ProductApi } from "@/api";
import { FilterProducts } from "@/components";
import { DefaultLayout } from "@/layouts";
import { getProfileProps } from "@/lib";
import {
  GroupProductModel,
  ProductModel,
  ResponseGetAllModel,
  UserModel,
} from "@/models";
import { GroupProductJson, ProductJson, UserJson } from "@/types/json";
import { publicRoutes } from "@/utils/routes";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { useMemo } from "react";

type Props = {
  productData: { items: ProductJson[]; count: number };
  relatedGroupProductData: { items: GroupProductJson[]; count: number };
  profile: UserJson | null;
};
const pApi = new ProductApi();
const gpApi = new GroupProductApi();
const LIMIT = 24;
const Products = ({
  productData: data1,
  relatedGroupProductData: data2,
  profile,
}: Props) => {
  const productData: ResponseGetAllModel<ProductModel> =
    new ResponseGetAllModel(pApi.getListFromJson(data1.items), data1.count);
  const relatedGroupProductData: ResponseGetAllModel<GroupProductModel> =
    new ResponseGetAllModel(gpApi.getListFromJson(data2.items), data2.count);
  const router = useRouter();

  const { currentBreadcrumb, title } = useMemo(() => {
    const slug = router.query.group_product_slug;
    let groupProduct = relatedGroupProductData.items.find(
      (gp: GroupProductModel) => gp.slug === slug
    );
    if (groupProduct) {
      return {
        currentBreadcrumb: groupProduct.getFullName(),
        title: groupProduct.description,
      };
    }

    groupProduct = relatedGroupProductData.items.find((gp: GroupProductModel) =>
      gp.slug.includes("" + slug)
    );

    return groupProduct
      ? {
          currentBreadcrumb: groupProduct.getSuffixName(`${slug}`),
          title: groupProduct.description,
        }
      : {
          currentBreadcrumb: "",
          title: "Sản phẩm",
        };
  }, [router.query.group_product_slug, relatedGroupProductData]);

  return (
    <DefaultLayout profile={new UserModel(profile)}>
      <Head>
        <title>{title}</title>
      </Head>
      <FilterProducts
        totalProducts={productData.count}
        breadcrumbs={{
          links: [
            {
              href: publicRoutes.home,
              label: "Trang chủ",
            },
            {
              href: publicRoutes.products(),
              label: "Sản phẩm",
            },
          ],
          current: currentBreadcrumb,
        }}
        groupProductData={relatedGroupProductData}
        pathName={`/product/group-product/${router.query.group_product_slug}`}
        productData={productData}
        totalPages={productData.getTotalPages(LIMIT)}
      />
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const {
      group_product_slug,
      p,
      sortBy,
      sortType,
      v_ids,
      min_price,
      max_price,
    } = context.query;
    const [productData, relatedGroupProductData] = await Promise.all([
      pApi.getAllJson({
        group_product_slug: `${group_product_slug}`,
        limit: LIMIT,
        product_variants: true,
        ...(p ? { p: +`${p}` } : {}),
        ...(sortBy ? { sortBy: `${sortBy}` } : {}),
        ...(sortType
          ? { sortType: `${sortType}` === "DESC" ? "DESC" : "ASC" }
          : {}),
        ...(v_ids ? { v_ids: `${v_ids}` } : {}),
        ...(min_price ? { min_price: +`${min_price}` } : {}),
        ...(max_price ? { max_price: +`${max_price}` } : {}),
      }),

      gpApi.getAllJson({
        relatedSlug: `${group_product_slug}`,
        sortBy: "slug",
        sortType: "ASC",
      }),
    ]);
    const { props } = await getProfileProps(context);
    return {
      props: { ...props, productData, relatedGroupProductData },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Products;
