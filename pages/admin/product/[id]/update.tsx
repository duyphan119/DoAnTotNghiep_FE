import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { DashboardPaper, ProductForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { groupProductActions } from "@/redux/slice/groupProductSlice";
import { productActions, productSelector } from "@/redux/slice/productSlice";
import { useAppDispatch } from "@/redux/store";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current: product } = useSelector(productSelector);

  useEffect(() => {
    if (router.query.id)
      appDispatch(productActions.fetchGetById(+router.query.id));
  }, [router.query.id]);

  useEffect(() => {
    appDispatch(
      groupProductActions.fetchGetAll({
        sortType: "ASC",
        sortBy: "id",
      })
    );
  }, []);

  return (
    <AdminLayout pageTitle="Sản phẩm" profile={new UserModel(profile)}>
      <>
        <Head>
          <title>Cập nhật sản phẩm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DashboardPaper title="Thông tin sản phẩm">
          {product ? <ProductForm /> : "Không tìm thấy sản phẩm phù hợp"}
        </DashboardPaper>
      </>
    </AdminLayout>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
