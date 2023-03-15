import { NextPage } from "next/types";
import Head from "next/head";
import { Fragment } from "react";
import { AdminLayout } from "../../../layouts";
import { DashboardPaper, OrderDiscountForm } from "../../../components";

type Props = {};

const Page: NextPage = (props: Props) => {
  return (
    <AdminLayout pageTitle="Thêm mới giảm giá đơn hàng">
      <Fragment>
        <Head>
          <title>Thêm mới giảm giá đơn hàng</title>
        </Head>
        <DashboardPaper title="Thông tin thêm mới giảm giá đơn hàng">
          <OrderDiscountForm />
        </DashboardPaper>
      </Fragment>
    </AdminLayout>
  );
};

export default Page;
