import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { DashboardPaper, ProductForm } from "../../../../components";
import { AdminLayout } from "../../../../layouts";
import { groupProductActions } from "../../../../redux/slice/groupProductSlice";
import {
  productActions,
  productSelector,
} from "../../../../redux/slice/productSlice";
import { useAppDispatch } from "../../../../redux/store";

type Props = {};

const Page = (props: Props) => {
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
        sortType: "asc",
        sortBy: "id",
      })
    );
  }, []);

  return (
    <AdminLayout pageTitle="Sản phẩm">
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

export default Page;
